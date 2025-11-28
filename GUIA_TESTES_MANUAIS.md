# 🧪 GUIA DE TESTES MANUAIS - FITMATCH

## 🎯 Pré-requisitos

- ✅ Backend rodando em `http://localhost:3000`
- ✅ Frontend rodando em `http://localhost:4200`
- ✅ Navegador moderno (Chrome, Firefox, Edge)

---

## 📝 Teste 1: Registrar Novo Jogador

**Objetivo**: Criar uma conta de jogador

### Passos
1. Acesse `http://localhost:4200`
2. Clique em "Registrar"
3. Preencha:
   - Email: `jogador1@test.com`
   - Senha: `123456`
   - Tipo: **Jogador**
4. Clique em "Registrar"
5. Será redirecionado para login

### Verificação
- [ ] Registro aceito
- [ ] Email salvo no Firestore (coleção `usuarios`)
- [ ] Pode fazer login

---

## 📝 Teste 2: Editar Perfil do Jogador

**Objetivo**: Editar dados do jogador

### Passos
1. Faça login como jogador
2. Na sidebar, clique em "Editar Perfil"
3. Preencha/atualize:
   - Nome: `João Silva`
   - Posição: `Meio-Campo`
   - Nível: `Intermediário`
   - Idade: `25`
   - Bairro: `Vila Madalena`
4. Clique "Salvar Alterações"

### Verificação
- [ ] Formulário valida nome obrigatório
- [ ] Campo idade aceita números
- [ ] Dados salvos em Firestore (`jogadores` collection)
- [ ] Redirecionado para `/profile`
- [ ] Mensagem "Perfil atualizado com sucesso"

---

## 🏆 Teste 3: Registrar Novo Time

**Objetivo**: Criar uma conta de time

### Passos
1. Acesse `http://localhost:4200`
2. Clique em "Registrar"
3. Preencha:
   - Email: `time1@test.com`
   - Senha: `123456`
   - Tipo: **Time**
4. Clique em "Registrar"
5. Faça login

### Verificação
- [ ] Time registrado
- [ ] Redirecionado para dashboard
- [ ] Sidebar mostra menu de time

---

## 🏆 Teste 4: Editar Informações do Time

**Objetivo**: Editar dados do time

### Passos
1. Faça login como time
2. Na sidebar, clique em "Editar Time"
3. Preencha/atualize:
   - Nome: `FC Unidos`
   - Localização: `São Paulo, SP`
   - Limite de Jogadores: `15`
   - Esporte: `Futebol`
4. Clique "Salvar Alterações"

### Verificação
- [ ] Validação de nome obrigatório
- [ ] Limite entre 5-50
- [ ] Dados salvos em Firestore (`times` collection)
- [ ] Redirecionado para `/dashboard`

---

## 📢 Teste 5: Publicar Vaga

**Objetivo**: Time publica vaga para jogadores

### Passos (como Time)
1. Na sidebar, clique em "Publicar Vaga"
2. Preencha:
   - Data: `15/01/2024`
   - Hora: `19:00`
   - Posição Desejada: `Goleiro`
3. Clique "Publicar Vaga"

### Verificação
- [ ] Vaga criada em Firestore (`vagas` collection)
- [ ] Campo `status` = `'open'`
- [ ] Campo `timeId` preenchido
- [ ] Sucesso mensagem

---

## 🎯 Teste 6: Jogador Navega Vagas

**Objetivo**: Jogador vê vagas disponíveis

### Passos (como Jogador)
1. Na sidebar, clique em "Vagas Disponíveis"
2. Veja lista de vagas
3. Clique em "Aceitar" em uma vaga

### Verificação
- [ ] Vagas com `status='open'` aparecem
- [ ] Mostra informação do time
- [ ] Botão "Aceitar" funciona
- [ ] Sucesso após aceitação

---

## 📋 Teste 7: Jogador Aceita Vaga

**Objetivo**: Criar candidatura ao aceitar vaga

### Passos
1. Como jogador, vá em "Vagas Disponíveis"
2. Clique "Aceitar" em uma vaga
3. Verifique em "Candidaturas"

### Verificação
- [ ] Candidatura criada em Firestore (`candidaturas`)
- [ ] Status = `'pending'`
- [ ] Campos: `vagaId`, `timeId`, `jogadorId`
- [ ] Aparece em "Candidaturas" do jogador

---

## 🏆 Teste 8: Time Gerencia Elenco

**Objetivo**: Time adiciona/remove jogadores e edita posição

### Passos (como Time)
1. Na sidebar, clique em "Gerenciar Elenco"
2. Veja tabela de jogadores (pode estar vazia)
3. Veja seção "Candidatos Pendentes"
4. Clique "Editar" em um candidato
5. Selecione posição (ex: Goleiro)
6. Clique "Salvar"

### Verificação
- [ ] Exibe contagem: "X / Y jogadores"
- [ ] Mostra candidatos pendentes
- [ ] Ao salvar posição:
  - Jogador adicionado ao roster
  - Subcoleção criada com posição
  - Página atualiza

---

## 🎁 Teste 9: Contagem de Jogadores

**Objetivo**: Verificar contagem correta (presente + candidatos)

### Passos
1. Como time, vá em "Gerenciar Elenco"
2. Observe:
   - Elenco Atual: `X / Y`
   - Candidatos Pendentes: `Z`
   - Total: `X + Z`

### Verificação
- [ ] Contagem de presente coincide com roster array
- [ ] Contagem de candidatos coincide com `candidaturas` com `status='pending'`
- [ ] Total está correto
- [ ] Limite respeitado (não deixa adicionar mais que maxJogadores)

---

## 🔄 Teste 10: Time Vê Candidaturas Recebidas

**Objetivo**: Time acompanha candidatos

### Passos (como Time)
1. Na sidebar, clique em "Candidaturas Recebidas"
2. Veja lista de candidatos
3. (Opcional) Aceite ou rejeite

### Verificação
- [ ] Lista mostra candidatos
- [ ] Mostra posição desejada
- [ ] Botões de ação funcionam
- [ ] Status atualizado após ação

---

## 🔐 Teste 11: Autenticação

**Objetivo**: Verificar segurança

### Passos
1. Faça logout
2. Tente acessar `/dashboard` diretamente
3. Tente acessar `/manage-roster` sem autenticação

### Verificação
- [ ] Redirecionado para `/login`
- [ ] Token JWT armazenado em localStorage
- [ ] Interceptor adiciona header `Authorization`
- [ ] Logout remove token

---

## 🎨 Teste 12: Design e Responsividade

**Objetivo**: Verificar UI/UX

### Passos
1. Abra DevTools (F12)
2. Teste em diferentes tamanhos:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)
3. Verifique cores:
   - Primária: `#FFD600` (amarelo)
   - Fundo escuro: gradiente
   - Texto legível

### Verificação
- [ ] Layout responsivo em todos tamanhos
- [ ] Cores corretas
- [ ] Botões acessíveis
- [ ] Sem scroll horizontal em mobile
- [ ] Tipografia clara

---

## ⚠️ Teste 13: Validações

**Objetivo**: Testar validações de formulário

### Passos
1. Em "Editar Perfil":
   - Digite nome com 1 caractere → erro
   - Digite idade = 12 → erro
   - Digite idade = 121 → erro
   
2. Em "Editar Time":
   - Deixe nome vazio → botão desabilitado
   - Digite limite = 0 → erro
   - Digite limite = 100 → erro

### Verificação
- [ ] Mensagens de erro aparecem
- [ ] Botão submit desabilitado com erro
- [ ] Validação em tempo real
- [ ] Feedback visual claro

---

## 🔄 Teste 14: Fluxo Completo

**Objetivo**: Testar fluxo ponta-a-ponta

### Cenário: Time Busca Goleiro, Jogador Aceita, Time Adiciona ao Elenco

#### Passos
1. **Time**: Publica vaga para Goleiro
2. **Jogador**: Vê vaga e aceita
3. **Time**: Vê candidato em "Gerenciar Elenco"
4. **Time**: Clica "Editar" na posição do candidato
5. **Time**: Seleciona "Goleiro" e salva
6. **Time**: Jogador agora aparece no elenco
7. **Time**: Contagem aumenta

### Verificação
- [ ] Fluxo completo funciona
- [ ] Dados consistentes em todos passos
- [ ] Firestore reflete mudanças
- [ ] Frontend sincroniza com backend

---

## 🐛 Teste 15: Tratamento de Erros

**Objetivo**: Verificar tratamento de erros

### Passos
1. Tente registrar com email já existente
2. Tente login com senha errada
3. Tente operação sem internet (offline)
4. Tente enviar formulário com dados inválidos

### Verificação
- [ ] Mensagens de erro claras
- [ ] Interface não congela
- [ ] Usuário sabe o que fazer
- [ ] Sem console errors críticos

---

## 📊 Teste 16: Dados em Firestore

**Objetivo**: Verificar integridade de dados

### Passos (via Firebase Console)
1. Vá em Firestore Console
2. Navegue em `usuarios`
   - Verifique novo usuário
   - Confirme email, role, senhaHash
3. Navegue em `jogadores` ou `times`
   - Confirme `usuarioId` preenchido
4. Navegue em `vagas`
   - Confirme vaga com `status='open'`
5. Navegue em `candidaturas`
   - Confirme candidatura com `status='pending'`
6. Navegue em `times/{teamId}/jogadores`
   - Confirme subcoleção com posição

### Verificação
- [ ] Todos dados salvos corretamente
- [ ] Relacionamentos corretos (usuarioId, teamId, jogadorId)
- [ ] Posições salvas em subcoleção
- [ ] Sem dados duplicados

---

## ✅ Checklist Final

- [ ] Registrar jogador funciona
- [ ] Editar perfil jogador funciona
- [ ] Registrar time funciona
- [ ] Editar time funciona
- [ ] Publicar vaga funciona
- [ ] Aceitar vaga cria candidatura
- [ ] Gerenciar elenco mostra contagem
- [ ] Editar posição atualiza subcoleção
- [ ] Candidatos pendentes aparecem
- [ ] Design em amber/yellow
- [ ] Validações funcionam
- [ ] Fluxo completo sucesso
- [ ] Dados em Firestore corretos
- [ ] Sem erros de console
- [ ] Responsividade OK

---

## 🎉 Resultado

Quando todos os testes passarem, você terá verificado que:

✅ Backend funciona corretamente
✅ Frontend integrado com backend
✅ Banco de dados consistente
✅ UI/UX conforme esperado
✅ Segurança implementada
✅ Fluxo de negócio validado

**FITMATCH está pronto para uso! 🚀**

---

## 📞 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Vaga não aparece | Recarregue página, verifique status='open' |
| Candidatura não criada | Verifique backend logs, tente novamente |
| Posição não salva | Confirme email do jogador, tente outra posição |
| Contagem errada | Atualize página, verifique Firestore |
| Erro de autenticação | Faça logout, limpe localStorage, login novamente |
| Styling quebrado | Verifique Tailwind, recompile frontend |

---

**Bom teste! 🎯**
