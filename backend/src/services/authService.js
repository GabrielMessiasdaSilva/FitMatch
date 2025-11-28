const { db } = require('../firebase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

class AuthService {
    
    /**
     * Registra um novo usuário (player/team), salva no Firestore e gera o JWT.
     */
    async register(data) {
        const { email, password, nome } = data;
        const role = data.role || data.type; // compatibilidade com frontend que envia 'type'

        // 1. Verifica se usuário existe
        const userSnapshot = await db.collection('usuarios').where('email', '==', email).get();
        if (!userSnapshot.empty) {
            throw new Error('Email já cadastrado.');
        }

        // 2. Hash da senha
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // 3. Cria documento na coleção 'usuarios'
        const usuarioRef = db.collection('usuarios').doc();
        const usuarioData = {
            id: usuarioRef.id,
            nome: nome || '',
            email,
            senhaHash: passwordHash,
            role,
            createdAt: Date.now()
        };

        await usuarioRef.set(usuarioData);

        // 4. Cria documento inicial na coleção específica (jogadores/times) referenciando usuarioId
        if (role === 'player') {
            // Para manter compatibilidade com frontend, usamos o mesmo id do usuário
            const jogadorRef = db.collection('jogadores').doc(usuarioRef.id);
            await jogadorRef.set({
                id: usuarioRef.id,
                usuarioId: usuarioRef.id,
                posicao: '',
                nivel: '',
                idade: 0,
                rating: 0,
                favorites: [],
                neighborhood: ''
            });
        } else if (role === 'team') {
            const timeRef = db.collection('times').doc(usuarioRef.id);
            await timeRef.set({
                id: usuarioRef.id,
                usuarioId: usuarioRef.id,
                nome: '',
                localizacao: '',
                roster: []
            });
        }

        // 5. GERAÇÃO E RETORNO DO TOKEN JWT
        const token = jwt.sign(
            { id: usuarioRef.id, role: role, email: email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            user: {
                id: usuarioRef.id,
                email,
                role,
                type: role // compatibilidade com frontend antigo
            }
        };
    }

    /**
     * Autentica o usuário, verifica a senha e gera o JWT.
     */
    async login(email, password) {
        // 1. Busca usuario
        const userSnapshot = await db.collection('usuarios').where('email', '==', email).get();
        if (userSnapshot.empty) {
            throw new Error('Usuário ou senha inválidos.');
        }

        const userDoc = userSnapshot.docs[0];
        const usuario = userDoc.data();

        // 2. Compara a senha
        const validPass = await bcrypt.compare(password, usuario.senhaHash);
        if (!validPass) {
            throw new Error('Usuário ou senha inválidos.');
        }

        // 3. Gera Token
        const token = jwt.sign(
            { id: usuario.id, role: usuario.role, email: usuario.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 4. Retorna Token e dados básicos do usuário
        return { token, user: { id: usuario.id, role: usuario.role, type: usuario.role, email: usuario.email } };
    }
}

module.exports = new AuthService();