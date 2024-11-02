<div align="center">
  <img alt="Logo" src="https://github.com/user-attachments/assets/bee111d2-870d-4a40-b8c0-351f95d29a77" width="100" />
</div>

<h1 align="center">
  TrashLab Chat App
</h1>

<p align="center">
    <img alt="Supports iOS" longdesc="Supports iOS" src="https://img.shields.io/badge/iOS-000.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
    <img alt="Supports Android" longdesc="Supports Android" src="https://img.shields.io/badge/Android-000.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
   <a href="https://expo.dev/client">
      <img alt="Runs with Expo Go" src="https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=expo&labelColor=f3f3f3&logoColor=000" />
    </a> 
</p>

<p align="center">
  Mobile take-home assignement. Watch the video demo below:
</p>

<p align="center">
  <a href="https://drive.google.com/file/d/1J4vB7_lojRnz1bH4IvTyyOaNJ_4LbxGw/view" target="_blank">
    <img src="https://github.com/user-attachments/assets/d9509b29-f24f-41b3-905d-39ef89df5405" alt="Watch the video" width="50%" />
  </a>
</p>

## Author notes

First of all, I'd like to thank you for the opportunity. It took me longer than expected, but I enjoyed the challenge of building this app. It's not complete, but I think it's a good showcase of my skills.

Besides the working app, the code and the documentation, please check the closed Pull Request. They have a comprehensive overview of the work done.

Now, let's talk about the project.

## What is inside?

This project uses the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Expo Router](https://expo.dev/router): file-based router
- [Supabase](https://supabase.com/): BaaS, database, messaging
- [Tanstack Query](https://tanstack.com/query): data fetching, caching, and state management
- [NativeWind v4](https://www.nativewind.dev/): styling utility based on Tailwind CSS
- [gluestack-ui v2](https://gluestack.io/): component library, design system, accessibility
- [Jest](https://jestjs.io/): testing, mocking, and code coverage

## Getting Started

### Install pnpm

**pnpm** requires **Node.js version 18 or above**. If you don’t have this version, please update Node before proceeding.

To install pnpm, run:

```bash
npm install -g pnpm
```

#### **Why pnpm?**

- pnpm offers faster installs, saves disk space, and provides isolated node_modules.
- For other installation methods, refer to the [pnpm installation guide](https://pnpm.io/installation).

## Running Locally

### Install Expo CLI

You can use npm to install the Expo CLI command line utility:

```bash
npm install -g expo-cli
```

Follow [this guide](https://docs.expo.dev/get-started/set-up-your-environment/) if you need help setting up your environment.

### Clone the project and install dependencies

When the environment is ready, open your terminal and type the following commands:

```sh
# clone the project and cd into it
git clone https://github.com/scalfs/trashlab-chat-app; cd ./trashlab-chat-app

# install dependencies
pnpm install
```

### Start the development environment

```sh
pnpm start
```

This will run the Metro bundler and open the Expo Tools in your terminal, providing options to run the app on:

- iOS Simulator
- Android Emulator
- Physical device (using the Expo Go app)

### Running on a Device

1. Install Expo Go, if you haven't already, on your iOS or Android device.
2. Scan the QR code displayed in the Expo Developer Tools to open the app on your device.

Note: Ensure your device and development machine are on the same Wi-Fi network.

After following these steps, you should see your Expo app running on the device or simulator.

## Architecture Overview

The project is structured in layers, inspired by Clean Architecture principles. The focus is on separation of concerns and modularity. While not very usual in React Native projects, it allows for better organization and testability of the code. Here’s a breakdown of each layer:

### Presentation Layer

- Handles UI components and user interaction
- Contains reusable components and hooks
- Manages layout and visual structure

### Application Layer

- Implements use cases
- Orchestrates business logic
- Coordinates between presentation and domain layers

### Domain Layer

- Defines core business models and rules
- Specifies repository interfaces

### Infrastructure Layer

- Implements repository interfaces
- Manages external system interactions
- Handles data persistence

## Project notes

### Known issues

- Need to verify if a chat already exists before creating a new one
- Chat rooms are not updating the displayed time, neither their ordering
- Messages are not automatically updated. We can leverage Supabase's real time subscription to solve that.

### Improvements

- Hide env variables in a secret storage
- Add a CI/CD pipeline for basic flows like testing, linting and deploying.
- Apply optimistic updates and add skeleton elements for chat rooms and messages
- There's not a single animation in the app, besides the native navigation, toaster and loading spinner. There are many opportunities for animated micro interactions in this app.
- Use `tsyringe` for proper dependency injection. But the Dependencies Context should be fine by now

### Backend improvements

- Needs an appropriate authentication
- Needs further work on policies for ensuring that
  - Anyone can create a new conversation
  - Users can only see conversations they're part of
  - Users can only see and add messages to conversations they're part of
  - Users can see other participants in conversations they're part of

### Backend TypeScript support

We can leverage the supabase CLI to update the interfaces whenever there's a update. [[Documentation Link](https://supabase.com/docs/reference/javascript/typescript-support)]
For now, I'm generating it in the dashboard and copying the file to the project.

```bash
supabase gen types typescript --project-id abcdefghijklmnopqrst > database.types.ts
```
