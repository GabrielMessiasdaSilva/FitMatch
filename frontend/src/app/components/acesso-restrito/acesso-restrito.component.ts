import { Component } from '@angular/core';

@Component({
  selector: 'app-acesso-restrito',
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div class="max-w-md w-full bg-gray-950 rounded-2xl shadow-2xl border-2 border-rose-500/40 p-10 flex flex-col items-center gap-6 animate-fade-in">
        <svg class="w-16 h-16 mb-2" fill="none" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#F43F5E"/><path d="M32 18a10 10 0 0 1 10 10v2a10 10 0 0 1-20 0v-2a10 10 0 0 1 10-10z" fill="#23232b"/><path d="M22 40c0-3.314 4.477-6 10-6s10 2.686 10 6v2H22v-2z" fill="#23232b"/></svg>
        <h2 class="text-2xl font-extrabold text-rose-400 text-center">Acesso Restrito</h2>
        <p class="text-gray-300 text-center">Você não tem permissão para acessar esta funcionalidade.</p>
        <a routerLink="/dashboard" class="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-gray-900 font-bold shadow hover:scale-105 transition">Voltar ao Dashboard</a>
      </div>
    </div>
  `,
  styles: [`.animate-fade-in { animation: fadeIn 0.7s ease; } @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }`]
})
export class AcessoRestritoComponent {}
