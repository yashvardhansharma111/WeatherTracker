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



# Weather Tracker App — Installation Guide

This guide will walk you through installing and using the Weather Tracker app on your Android device—even if you're not tech-savvy!

---

##  Android: Install & Run the App Using APK

###  Requirements:
- An Android smartphone
- Internet access (to download the app)
- Just a few minutes to install

---

###  Steps to Install

1. **Download the APK**

   Visit the following link on your phone’s browser to download the app:
   
   **Download link:**  
https://expo.dev/accounts/yashvardhansharma001/projects/WeatherTracker/builds/7caa0764-cf54-4672-a8fa-de0a37e84751

2. **Install the app**
   
   After downloading, open the APK file and follow the prompt to install.
   
   - If it’s your first time installing from outside the Play Store, you may need to enable "Install Unknown Apps" for your browser or file manager.
   
3. **Open & Enjoy**

   Once installed, you can open the Weather Tracker app directly from your device.
   - No Expo Go required—this is a standalone app!

---

##  iOS & Alternative Option: Use Expo Go Instead

If you're on iPhone or prefer not to install the APK, you can still run the app via Expo Go:

###  Steps via Expo Go

1. **Install Expo Go App**
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iPhone: https://apps.apple.com/app/expo-go/id982107779

2. **Open Expo Go and enter the app link**

   Navigate to the "**Projects**" or "**Explore**" section and enter:
https://expo.dev/@yashvardhansharma001/WeatherTracker

3. **App loads instantly**

Your app will open in seconds—no installation, no hassle.

---
