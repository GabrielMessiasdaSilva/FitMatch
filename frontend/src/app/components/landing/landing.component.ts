import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <!-- Inicio -->
    <div class="min-h-screen flex flex-col items-center text-slate-100" style="background: linear-gradient(115deg, #000000ff 0%, #818181ff 50%, #000000ff 100%);">
      <div class="w-full px-6 py-16 text-center max-w-4xl mx-auto">
        <h1 class="text-5xl font-extrabold mb-6 drop-shadow-lg">
          <span class="text-white">FIT</span><span class="text-amber-400">MATCH</span>
        </h1>
        <h2 class="text-2xl font-bold mb-4 text-amber-300">O Tinder do Futebol: conecte jogadores e times!</h2>
        <p class="text-lg mb-8 text-slate-300">Encontre o time ideal para jogar, ou recrute atletas para sua equipe. Filtre por posição, bairro, esporte e muito mais. Faça matches, envie convites e monte seu elenco dos sonhos!</p>
        <button routerLink="/register" class="px-8 py-4 rounded-full bg-amber-400 text-slate-900 font-extrabold text-xl shadow-lg hover:bg-amber-300 transition hover:scale-105 transform">Quero começar agora!</button>
      </div>

      <!-- Diferencial -->
      <section class="w-full py-16 bg-black/40">
        <div class="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"> 
          <!-- Card 1: Lupa -->
          <div class="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-amber-400/50 transition duration-300">
            <!-- Classe 'animate-shake' adicionada -->
            <span class="material-icons text-4xl mb-2 text-amber-400 animate-shake">search</span>
            <h3 class="font-bold text-xl mb-2 text-amber-300">Encontre jogadores</h3>
            <p class="text-slate-300">Use filtros avançados para achar o perfil ideal para seu time ou sua carreira.</p>
          </div>
          
          <!-- Card 2: Coração -->
          <div class="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-amber-400/50 transition duration-300">
            <!-- Classe 'animate-pulse-heart' adicionada -->
            <span class="material-icons text-4xl mb-2 text-amber-400 animate-pulse-heart">favorite</span>
            <h3 class="font-bold text-xl mb-2 text-amber-300">Dê match e convide</h3>
            <p class="text-slate-300">Envie convites, aceite ou recuse propostas e monte seu elenco dos sonhos.</p>
          </div>
          
          <!-- Card 3: Bola -->
          <div class="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-amber-400/50 transition duration-300">
            <!-- Classe 'animate-bounce-kick' adicionada -->
            <span class="material-icons text-4xl mb-2 text-amber-400 animate-bounce-kick">sports_soccer</span>
            <h3 class="font-bold text-xl mb-2 text-amber-300">Monte seu time</h3>
            <p class="text-slate-300">Gerencie seu time, jogadores, partidas e muito mais em um só lugar.</p>
          </div>
        </div>
      </section>

      <!-- Funcionamento -->
      <section class="w-full py-16">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-extrabold text-amber-400 mb-6">Como funciona?</h2>
          <ol class="text-lg text-slate-300 space-y-4">
            <li><b class="text-amber-300">1.</b> Crie sua conta como jogador ou time.</li>
            <li><b class="text-amber-300">2.</b> Complete seu perfil e publique vagas ou busque jogadores.</li>
            <li><b class="text-amber-300">3.</b> Dê match, envie convites e gerencie seu elenco.</li>
            <li><b class="text-amber-300">4.</b> Após o jogo, monitore desempenho e dê feedback.</li>
          </ol>
        </div>
      </section>

      <!-- Depoimentos -->
      <section class="w-full py-16 bg-black/40">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-extrabold text-amber-400 mb-6">Depoimentos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-amber-400/50 transition duration-300">
              <p class="text-slate-300 italic">"Achei meu time dos sonhos pelo FitMatch! Recomendo para todos os boleiros."</p>
              <div class="mt-4 text-amber-300 font-bold">— João, Jogador</div>
            </div>
            <div class="bg-black/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/5 hover:border-amber-400/50 transition duration-300">
              <p class="text-slate-300 italic">"Conseguimos montar o elenco perfeito e organizar partidas com facilidade."</p>
              <div class="mt-4 text-amber-300 font-bold">— Time Fênix</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Perguntas -->
      <section class="w-full py-16">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-extrabold text-amber-400 mb-6">Perguntas Frequentes</h2>
          <div class="space-y-6 text-left">
            <div>
              <b class="text-amber-300">Como faço para publicar uma vaga?</b>
              <p class="text-slate-300">Após criar sua conta como time, acesse o painel e clique em "Publicar Vaga".</p>
            </div>
            <div>
              <b class="text-amber-300">Posso me candidatar a mais de um time?</b>
              <p class="text-slate-300">Sim! Você pode se candidatar a quantos times quiser e acompanhar suas solicitações.</p>
            </div>
            <div>
              <b class="text-amber-300">O FitMatch é gratuito?</b>
              <p class="text-slate-300">Sim, o uso do FitMatch é totalmente gratuito para jogadores e times.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Jogar -->
      <section class="w-full py-16 bg-black/40">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-extrabold text-amber-400 mb-6">Pronto para jogar?</h2>
          <button routerLink="/register" class="px-10 py-5 rounded-full bg-amber-400 text-slate-900 font-extrabold text-2xl shadow-lg hover:bg-amber-300 transition">Cadastre-se agora</button>
        </div>
      </section>

      
      <footer class="w-full py-8 text-center text-slate-400 text-sm bg-black/40">
        Projeto acadêmico — FATEC Zona Leste — 2025
      </footer>
    </div>
  `

  ,
  styles: [`
    /* --- NOVAS ANIMAÇÕES DOS ÍCONES --- */

    /* 1. Lupa: Agita lentamente (Search Shake) */
    .animate-shake {
      display: inline-block;
      animation: shake 3s ease-in-out infinite;
      transform-origin: center;
    }
    @keyframes shake {
      0%, 100% { transform: rotate(0deg); }
      10% { transform: rotate(-15deg); }
      20% { transform: rotate(10deg); }
      30% { transform: rotate(-10deg); }
      40% { transform: rotate(5deg); }
      50% { transform: rotate(0deg); }
    }

    /* 2. Coração: Pulsar (Heart Pulse) */
    .animate-pulse-heart {
      display: inline-block;
      animation: pulse-heart 1.5s ease-in-out infinite;
    }
    @keyframes pulse-heart {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }

    /* 3. Bola: Pingando de um lado ao outro (Kick Bounce) */
    .animate-bounce-kick {
      display: inline-block;
      animation: kick-bounce 3s infinite alternate ease-in-out;
    }
    @keyframes kick-bounce {
      /* Início (Esquerda) */
      0% { transform: translateX(0) translateY(0) rotate(0deg); }
      
      /* Quique 1 */
      20% { transform: translateX(50px) translateY(-25px) rotate(90deg); }
      40% { transform: translateX(100px) translateY(0) rotate(180deg); }
      
      /* Quique 2 */
      60% { transform: translateX(150px) translateY(-15px) rotate(270deg); }
      80% { transform: translateX(200px) translateY(0) rotate(360deg); }
      
      /* Final (Direita - Fim do Card) */
      100% { transform: translateX(220px) translateY(-5px) rotate(450deg); }
    }
  `]
})
export class LandingComponent {}
