# React Native Application with Expo: Harry Potter Minifig Selector

## Overview

This React Native application utilizes Expo to create a fun and interactive experience for Harry Potter fans. The app allows users to select random Harry Potter minifigures using the Rebrickable API. Users can then fill out a form to customize their minifigure, and finally, view a summary modal with their chosen selections.

## Used Stack

- **React Native**: JavaScript framework for building mobile applications.
- **Expo**: Development platform for building mobile apps with React Native.
- **React Navigation**: Routing and navigation library for React Native apps.
- **Formik**: Form library for React and React Native.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Lodash**: JavaScript utility library for manipulating arrays, objects, and strings.
- **React Native Animatable**: Declarative animations library for React Native.
- **React Native Dotenv**: Environment variables for React Native apps.
- **React Native Gesture Handler**: Gesture management library for React Native.
- **React Native Snap Carousel**: Swiper/carousel component for React Native.
- **React Native SVG**: SVG library for React Native.
- **React Native WebView**: React Native component for rendering web content.

### Tools

- **ESLint**: JavaScript linter tool.
- **Prettier**: Opinionated code formatter.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.

### Other

- **Changa One Font**: Google font used in the project.

## Prerequisites

Before running the application, ensure that you have the following software installed:

- **Node:** v18.9.0
- **npm:** v8.19.1
- **Expo:** v0.17.1

## Getting Started

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Creaa/harry-potter-minifig.git
    cd harry-potter-minifig
    ```

2. Install project dependencies:

    ```bash
    npm install
    ```

3. Start the Expo development server:

    ```bash
    npm start
    ```
   
4. Create .env file based on .env.example


5. Follow the instructions in the console to run the app on your preferred platform:

    - **For Android:** Use Android Studio.
    - **For iOS:** Use XCode.
    - **For both platforms:** Download Expo Go on your phone and scan the QR code.

## Usage

1. The app will open with a Harry Potter minifigure displayed.
2. Use the Rebrickable API to select a random minifigure.
3. Fill out the form for shipping details.
4. Submit the form to see a summary modal with your chosen selections.

## Tested on:

- **Iphone X and above**
- **Pixel 4**

## Fixes: 

> react-query has global onError callback that can be used instead of copy-pasting the same console.log (https://tanstack.com/query/v4/docs/reference/QueryCache#global-callbacks)

I used QueryCache to provide default onError handling. 

> Query keys could be extracted somewhere as right now it's easy to make typo and TSC won't see it

Query keys have been extracted to separate file as const.

> Returning empty string in components can easily go wrong (can't render string outside of Text component)

Since it's font loader instead empty string I used loader indicator.  

> There are couple of places with inline functions which should be generally avoided in RN (even more than on web) as it can degrade performance in case of bigger components

Inline functions have been replaced.



