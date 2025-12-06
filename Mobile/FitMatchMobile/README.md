FitMatch Mobile - Android project
--------------------------------
This is the Mobile-only Android project for FITMATCH.

Features implemented (local / mock):
- Criar perfil esportivo (salvo localmente via Room)
- Buscar times próximos (mocked data)
- Candidatar-se a vagas (simulated; inserts into local history)
- Receber convites / Confirmar presença (simulated)
- Ver histórico de jogos (Room database)
- Firebase Messaging service added (add google-services.json to enable push)

How to open:
1. Unzip FitMatchMobile.zip
2. Open the folder in Android Studio
3. Let Android Studio sync Gradle. If it asks to update Gradle/Kotlin plugin, follow the prompts.
4. (Optional) Add your google-services.json to app/ to enable Firebase messaging features.

Notes:
- Retrofit skeleton present; repository currently uses mock data for offline functionality.
- If you want full backend integration I can modify ApiService and repository to call your Node.js backend.
