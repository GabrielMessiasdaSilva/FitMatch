import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex flex-col items-center text-slate-100">
      <div class="w-full px-6 py-16 text-center max-w-4xl mx-auto">
        <h1 class="text-5xl font-extrabold mb-6 text-amber-400 drop-shadow-lg">FITMATCH</h1>
        <h2 class="text-2xl font-bold mb-4 text-amber-300">O Tinder do Futebol: conecte jogadores e times!</h2>
        <p class="text-lg mb-8 text-slate-300">Encontre o time ideal para jogar, ou recrute atletas para sua equipe. Filtre por posição, bairro, esporte e muito mais. Faça matches, envie convites e monte seu elenco dos sonhos!</p>
        <button routerLink="/register" class="px-8 py-4 rounded-full bg-amber-400 text-slate-900 font-extrabold text-xl shadow-lg hover:bg-amber-300 transition">Quero começar agora!</button>
      </div>
      <section class="w-full py-16 bg-slate-900 border-t border-slate-800">
        <div class="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <span class="material-icons text-4xl mb-2 text-amber-400">search</span>
            <h3 class="font-bold text-xl mb-2 text-amber-300">Encontre jogadores e times</h3>
            <p class="text-slate-300">Use filtros avançados para achar o perfil ideal para seu time ou sua carreira.</p>
          </div>
          <div class="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <span class="material-icons text-4xl mb-2 text-amber-400">favorite</span>
            <h3 class="font-bold text-xl mb-2 text-amber-300">Dê match e convide</h3>
            <p class="text-slate-300">Envie convites, aceite ou recuse propostas e monte seu elenco dos sonhos.</p>
          </div>
          <div class="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
            <span class="material-icons text-4xl mb-2 text-amber-400">sports_soccer</span>
            <h3 class="font-bold text-xl mb-2 text-amber-300">Monte seu time</h3>
            <p class="text-slate-300">Gerencie seu time, jogadores, partidas e muito mais em um só lugar.</p>
          </div>
        </div>
      </section>
      <section class="w-full py-16 bg-slate-800 border-t border-slate-700">
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
      <section class="w-full py-16 bg-slate-900 border-t border-slate-800">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-extrabold text-amber-400 mb-6">Depoimentos</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
              <p class="text-slate-300 italic">"Achei meu time dos sonhos pelo FitMatch! Recomendo para todos os boleiros."</p>
              <div class="mt-4 text-amber-300 font-bold">— João, Jogador</div>
            </div>
            <div class="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
              <p class="text-slate-300 italic">"Conseguimos montar o elenco perfeito e organizar partidas com facilidade."</p>
              <div class="mt-4 text-amber-300 font-bold">— Time Fênix</div>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full py-16 bg-slate-800 border-t border-slate-700">
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
      <section class="w-full py-16 bg-slate-900 border-t border-slate-800">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <h2 class="text-3xl font-extrabold text-amber-400 mb-6">Pronto para jogar?</h2>
          <button routerLink="/register" class="px-10 py-5 rounded-full bg-amber-400 text-slate-900 font-extrabold text-2xl shadow-lg hover:bg-amber-300 transition">Cadastre-se agora</button>
        </div>
      </section>
      <footer class="w-full py-8 bg-slate-800 border-t border-slate-700 text-center text-slate-400 text-sm">
        Projeto acadêmico — FATEC Zona Leste — 2025
      </footer>
    </div>
  `
})
export class LandingComponent {}
