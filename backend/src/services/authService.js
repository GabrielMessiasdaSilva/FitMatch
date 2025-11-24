const { db } = require('../firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Assumindo que este caminho está correto para buscar a chave secreta
const { JWT_SECRET } = require('../middlewares/authMiddleware'); 

class AuthService {
    
    /**
     * Registra um novo usuário (player/team), salva no Firestore e gera o JWT.
     */
    async register(data) {
        const { email, password, type } = data;

        // 1. Verifica se usuário existe
        const userSnapshot = await db.collection('users').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            throw new Error('Email já cadastrado.');
        }

        // 2. Hash da senha
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Cria documento na coleção 'users'
        const newUserRef = db.collection('users').doc();
        const userData = {
            id: newUserRef.id,
            type, // "player" ou "team"
            email,
            passwordHash,
            createdAt: Date.now()
        };

        await newUserRef.set(userData);

        // 4. Cria documento inicial na coleção específica (players/teams)
        if (type === 'player') {
            await db.collection('players').doc(newUserRef.id).set({
                id: newUserRef.id,
                name: '',
                email: email,
                favorites: [],
                neighborhood: '',
                position: '',
                sports: [],
                age: 0
            });
        } else if (type === 'team') {
            await db.collection('teams').doc(newUserRef.id).set({
                id: newUserRef.id,
                name: '',
                email: email,
                roster: [],
                neighborhood: '',
                sport: '',
                neededPositions: []
            });
        }

        // 5. GERAÇÃO E RETORNO DO TOKEN JWT (CORREÇÃO APLICADA AQUI)
        const token = jwt.sign(
            { id: newUserRef.id, type: type, email: email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return { 
            token, 
            user: { 
                id: newUserRef.id, 
                email, 
                type 
            } 
        };
    }

    /**
     * Autentica o usuário, verifica a senha e gera o JWT.
     */
    async login(email, password) {
        // 1. Busca usuário
        const userSnapshot = await db.collection('users').where('email', '==', email).get();
        if (userSnapshot.empty) {
            throw new Error('Usuário ou senha inválidos.');
        }

        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();

        // 2. Compara a senha
        const validPass = await bcrypt.compare(password, user.passwordHash);
        if (!validPass) {
            throw new Error('Usuário ou senha inválidos.');
        }

        // 3. Gera Token
        const token = jwt.sign(
            { id: user.id, type: user.type, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 4. Retorna Token e dados básicos do usuário
        return { token, user: { id: user.id, type: user.type, email: user.email } };
    }
}

module.exports = new AuthService();