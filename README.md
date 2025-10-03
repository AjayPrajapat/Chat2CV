# Chat to CV Builder

Chat to CV Builder is an Expo (React Native + TypeScript) application that helps job seekers transform conversational interviews into ATS-friendly resumes. The app guides users through a chat-based intake, imports existing resumes, and produces polished PDF/DOCX exports backed by reusable templates.

## Requirements
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)

## Getting Started
```bash
npm install
npx expo start
```

Then choose `i` (iOS simulator), `a` (Android emulator), or scan the QR code with the Expo Go application.

## Scripts
- `npm run start` – Launch the Expo development server.
- `npm run android` – Build and run on Android device/emulator.
- `npm run ios` – Build and run on iOS simulator.
- `npm run web` – Start the Expo web build.
- `npm run lint` – Run ESLint.
- `npm run test` – Execute Jest tests (scaffold).

## Project Structure
```
src/
  app/
    Auth/
    Onboarding/
    Chat/
    Editor/
    Templates/
    Import/
    Export/
    Settings/
  components/
  navigation/
  store/
  services/
  utils/
  templates/
  i18n/
  types/
```

## Backend Integration
The app includes Axios service stubs pointing to `https://api.chat2cv.app`. Replace the placeholder logic in `src/services` with real backend endpoints when ready.

## Detox (E2E)
A minimal Detox configuration is scaffolded. Install Android/iOS dependencies per Detox documentation before running.

## License
MIT
