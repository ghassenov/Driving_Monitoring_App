# Driver Monitoring - Sensor Data Collection App

A React Native mobile application for collecting and analyzing driver behavior through sensor data, connected to a FastAPI backend for real-time processing and event detection.

---
## Overview

This application collects sensor data from the device's accelerometer, gyroscope, and magnetometer to monitor driving patterns and detect potentially unsafe behaviors. The data is sent to a FastAPI backend for analysis and event classification.

---
## Features

### Sensor Data Collection
- **Accelerometer** - Measures vehicle acceleration and movement patterns
- **Gyroscope** - Tracks rotation and orientation changes
- **Magnetometer** - Detects heading and directional changes
- **Real-time streaming** - Continuous sensor data collection during trips

### Trip Management
- Start and stop driving sessions
- Real-time data transmission to backend
- Trip history and session management

### Driver Behavior Analysis
- Driving event detection (hard braking, sharp turns, etc.)
- Behavior scoring based on sensor patterns
- Safety alerts and recommendations

---
## Tech Stack

- **Frontend**: React Native
- **State Management**: React Context API
- **Navigation**: React Navigation
- **HTTP Client**: Axios
- **Authentication**: JWT tokens
- **Storage**: AsyncStorage
- **Sensors**: React Native Sensors API

---
## Quick Start

### Prerequisites
- Node.js 17+
- npm or yarn
- React Native CLI
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
```bash
git clone "https://github.com/ghassenov/Driving_Monitoring_App.git"
cd driver-monitoring-app
```
2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a .env file in the root directory containing an api base of the emulator
```bash
API_BASE=http://10.0.X.X:8000
```

4. **Start the application**
```bash
# Start Metro bundler
npx react-native start

# Run on Android (in a new terminal)
npx react-native run-android
```


