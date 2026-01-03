# Task Manager App

A comprehensive task management application built with **React Native** and **Expo**. This app allows users to efficiently manage tasks, view statistical insights, and track progress through a responsive and intuitive interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Third-Party Libraries](#third-party-libraries)

## Overview

The Task Manager App is designed to help users stay organized. It features a robust dashboard for visualizing task data, a detailed list view for managing individual items, and a streamlined creation process. The application follows modern design principles and utilizes the latest React Native technologies.

## Features

- **Dashboard**: Visualize task completion status and other metrics with interactive charts.
- **Task Management**:
  - **Create Tasks**: Easily add new tasks via the Task Form.
  - **Task List**: View all tasks in a scrollable list.
  - **Task Details**: Inspect specific details of any task.
- **Responsive Navigation**: Seamless navigation between screens using industry-standard routing solutions.
- **Modern UI/UX**: Styled with Tailwind CSS (NativeWind) for a consistent and polished look.

## Setup and Installation

Follow these steps to get the application running locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (installed and configured)
- npm or yarn

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.
2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the App

Start the development server:

```bash
npx expo start
```

This will launch the Expo development dashboard. From there, you can run the app on:

- **Android**: Press `a` in the terminal or click "Run on Android device/emulator".
- **iOS**: Press `i` in the terminal or click "Run on iOS simulator" (macOS only).
- **Web**: Press `w` in the terminal to run in the browser.

## Third-Party Libraries

The project relies on several key libraries to provide functionality and styling:

- **[Expo](https://expo.dev/)**: The core framework used for building and running the React Native application.
- **[NativeWind](https://www.nativewind.dev/) (Tailwind CSS)**: Used for styling the application, allowing for utility-first CSS classes in React Native.
- **[React Navigation](https://reactnavigation.org/)**: Handles routing and navigation between different screens (Stacks, etc.).
- **[react-native-gifted-charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)**: Utilized in the Dashboard to render visual charts and graphs.
- **[react-native-toast-message](https://github.com/calintamas/react-native-toast-message)**: Used to display in-app notifications and toasts.
- **[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/) & [Reanimated](https://docs.swmansion.com/react-native-reanimated/)**: Provide smooth gesture interactions and animations.
