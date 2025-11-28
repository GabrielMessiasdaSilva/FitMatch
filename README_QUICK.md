# 🎯 FITMATCH - Documentação Rápida

## 🚀 Iniciação Rápida

### Requisitos
- Node.js 16+
- npm ou yarn
- Firebase Admin SDK configurado (já está no projeto)

### Instalação

1. **Backend**
```bash
cd backend
npm install  # Se necessário
npm start
```
Servidor rodará em: `http://localhost:3000`

2. **Frontend**
```bash
cd frontend
npm install  # Se necessário
npm start
```
Aplicação rodará em: `http://localhost:4200`

---

## 👥 Tipos de Usuário

### 🎮 Jogador
**Capacidades:**
- Editar perfil (nome, posição, nível, idade, bairro)
- Navegar e aceitar vagas de times
- Acompanhar candidaturas
- Ver histórico de jogos

**Rotas Principais:**
- `/profile` - Visualizar perfil
- `/profile/edit` - Editar perfil
- `/vacancies` - Ver vagas disponíveis
- `/matches` - Ver candidaturas

### 🏆 Time
**Capacidades:**
- Editar informações do time
- Publicar vagas para jogadores
- Gerenciar elenco (adicionar/remover/atribuir posição)
- Ver candidatos e gerenciar candidaturas
- Definir limite máximo de jogadores

**Rotas Principais:**
- `/dashboard` - Visão geral
- `/edit-team` - Editar time
- `/publish-vacancy` - Publicar vaga
- `/manage-roster` - Gerenciar elenco
- `/matches` - Ver candidaturas

---

## 🔑 Fluxo de Dados

```
Jogador Aceita Vaga
    ↓
Backend cria Candidatura
    ↓
Time vê candidato em "Candidaturas Recebidas"
    ↓
Time aceita candidato
    ↓
Jogador entra no elenco do time
```

---

## 📊 Endpoints Principais

### Autenticação
```
POST   /api/auth/register      - Registrar novo usuário
POST   /api/auth/login         - Fazer login
```

### Jogadores
```
GET    /api/players            - Listar todos os jogadores
GET    /api/players/:id        - Detalhes do jogador
PUT    /api/players/:id        - Atualizar perfil
```

### Times
```
GET    /api/teams              - Listar todos os times
GET    /api/teams/:id          - Detalhes do time
GET    /api/teams/:id/stats    - Time com contagem de jogadores
PUT    /api/teams/:id          - Atualizar informações
PATCH  /api/teams/:id/roster   - Gerenciar elenco
```

### Vagas
```
POST   /api/vagas              - Criar vaga
GET    /api/vagas              - Listar vagas
POST   /api/vagas/:id/aceitar  - Aceitar vaga
```

### Candidaturas (Matches)
```
GET    /api/matches            - Listar candidaturas
PATCH  /api/matches/:id        - Atualizar status
```

---

## 🎨 Paleta de Cores

- **Primária**: `#FFD600` (Amber)
- **Texto**: `#e2e2e2` (Cinza claro)
- **Fundo**: `#000000` a `#272529` (Gradiente escuro)
- **Sucesso**: `#22c55e` (Verde)
- **Erro**: `#ef4444` (Vermelho)

---

## 📱 Componentes Principais

### Frontend
- `LoginComponent` - Tela de login
- `RegisterComponent` - Tela de registro
- `SidebarComponent` - Navegação
- `EditPlayerProfileComponent` - Edição de perfil do jogador
- `EditTeamComponent` - Edição do time
- `PublishVacancyComponent` - Publicar vaga
- `ListVacanciesComponent` - Listar vagas
- `ManageRosterComponent` - Gerenciar elenco
- `MatchesComponent` - Ver candidaturas

### Backend
- `authService` - Lógica de autenticação
- `playersService` - Lógica de jogadores
- `teamsService` - Lógica de times (com contagem)
- `vagasService` - Lógica de vagas
- `matchesService` - Lógica de candidaturas
- `jogosService` - Lógica de jogos
- `avaliacoesService` - Lógica de avaliações

---

## 🔐 Segurança

- JWT com expiração de 24h
- Middleware de autenticação obrigatório
- Senhas com hash bcrypt (salt=10)
- Controle de acesso por role
- CORS configurado

**Nota**: A chave JWT está em `backend/src/config.js`. Em produção, use variáveis de ambiente!

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Execute em ambos os diretórios
npm install
```

### Erro: "Port 3000 already in use"
```bash
# Mude a porta em backend/src/server.js
const PORT = 3001;
```

### Erro: "CORS error"
- Verifique se o backend está rodando
- Verifique a URL em `frontend/src/app/services/*.service.ts`

### Erro: "Firebase not initialized"
- Verifique o arquivo `backend/src/firebase.js`
- Certifique-se de ter as credenciais do Firebase

---

## 📞 Suporte

Qualquer dúvida, verifique os arquivos de serviço em:
- Backend: `backend/src/services/`
- Frontend: `frontend/src/app/services/`

---

**Status**: ✅ Totalmente Funcional

Desenvolvido com ❤️ para FitMatch
