# WeatherTracker App

A cross-platform React Native (Expo) app for real-time weather tracking, location management, and user authentication.

---

## 🌦️ Features
- **Weather Data:** Real-time current weather and 7-day forecast from [WeatherAPI.com](https://www.weatherapi.com/).
- **Location Management:** Add, save, switch, set default, and detect locations via GPS.
- **Offline Support:** Caches last weather data for offline use.
- **Authentication:** Secure email/password login & registration with Firebase Auth.
- **Modern UI/UX:** White & sky blue theme, icons, animations, and responsive design.

---

## 🚀 Getting Started

### 1. **Clone the Repository**
```bash
git clone <YOUR_REPO_URL>
cd WeatherTracker
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Install Expo CLI (if needed)**
```bash
npm install -g expo-cli
```

### 4. **Run the App**
```bash
npx expo start
```
- Scan the QR code with [Expo Go](https://expo.dev/go) on your device, or
- Press `a` (Android) / `i` (iOS) to launch an emulator/simulator.

---

## ⚙️ Project Structure
- `app/` — Main screens and navigation (Home, Locations, Login, Register, etc.)
- `components/` — Reusable UI components
- `constants/` — API keys, theme colors, etc.
- `hooks/` — Custom React hooks (auth, weather, locations)
- `scripts/` — Firebase and external service configs
- `assets/` — Images, icons, etc.

---

## 🔑 API Keys & Auth
- **WeatherAPI:** Key is included in `constants/WeatherAPI.ts` (for demo/assessment only)
- **Firebase Auth:** Config included in `scripts/firebase.ts` (for demo/assessment only)
- **No backend needed**

---

## 📲 How to Share the App

1. **Share the Code:**
   - Zip the entire project folder or push it to a GitHub repo.
   - Share the zip file or repo link with your collaborator.

2. **Setup Instructions for Others:**
   - Clone or unzip the project.
   - Run `npm install` to install dependencies.
   - Run `npx expo start` to launch the app.
   - They can scan the QR code with Expo Go or run on an emulator.

3. **(Optional) Publish to Expo:**
   - Run `npx expo publish` to make the app available via a public Expo link.
   - Share the Expo link for easy access on any device with Expo Go.

---

## 🛠️ Tech Stack
- **React Native + Expo**
- **Firebase Auth**
- **WeatherAPI.com**
- **AsyncStorage** (for offline/weather caching)
- **Expo Location** (for GPS)
- **React Navigation**
- **React Native Vector Icons**

---

## 📝 Notes
- For production, never commit API keys. Use environment variables or secure storage.
- This project is frontend-only for demo/assessment.
- For any issues, make sure you have the latest Node.js, npm, and Expo CLI.

---

Happy Weather Tracking! 🌤️



## 📲 How to Install & Use the Weather Tracker App

Anyone can try this app — no coding or installation tools needed!

### ✅ Requirements:
- A smartphone (Android or iPhone)
- Internet connection
- 1–2 minutes of time

---

### 🪜 Steps to Use the App

#### 1. **Install the Expo Go App**

This app is required to open mobile projects made with Expo (like this one):

- 📱 Android (Google Play):
  https://play.google.com/store/apps/details?id=host.exp.exponent

- 📱 iPhone (App Store):
  https://apps.apple.com/app/expo-go/id982107779

#### 2. **Open Expo Go**

- Open the Expo Go app you just installed.
- Tap **"Explore"** or **"Projects"** (depending on your device).

#### 3. **Paste the App Link**

Copy and paste this link inside the Expo Go app:

https://expo.dev/@yashvardhansharma001/weathertracker

#### 4. **Run the App Instantly**

After a few seconds, the Weather Tracker app will load and run on your phone.

No login, no setup, no installation required.

---