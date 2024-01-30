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


# Background

This is my first React Native project. Having experience with React, I wanted to see how challenging it would be to transition to a React Native project, what similarities there are, what obstacles I might encounter, and what problems I might face.

During the application development, I encountered the most issues with setting up the project and the fact that instead of JSX, native components are used. This required reading documentation and slowly adapting to the new coding style.

Another significant challenge was connecting to the API in the most optimal way. The task involved fetching random figures (minifigs), and I wanted to do it in the most optimal way possible.

The Rebrickable API accepts 2 parameters: page and page_limit. It was essential for me that each figure had an equal chance of being selected randomly, and that the application user received as many figures as requested.

Therefore, I wrote a simple algorithm to calculate at which modulo the situation would occur where we would get an equal number of pagination pages, with the number of figures the user expects. The advantage of this solution is that we make only one connection to the API. The downside is that the figures are selected in sets, not individually.

For example, if a user wants to fetch 5 figures out of 20, the algorithm adjusts the page and page_limit parameters. It divides the 20 figures into 4 pages of 5 each and randomly selects which page to fetch from.

So when selecting figures, there is no possibility for figures from the first and last index positions to appear for selection. However, it's a matter of approach in how we define "random," as the chance of selecting a particular figure remains the same.

In the case where we have a number that does not divide evenly, the algorithm checks at which number of figures we will receive pages with the same number of figures while maintaining the condition that the number of figures must not be less than what the user wants. With a larger amount of data, this could be a disadvantage, but with this specific API, it shouldn't affect performance.

In summary, it was a really interesting task from which I gained a lot of new knowledge about React Native. Much of the code was familiar to me from React projects, but there are still many small, subtle differences between these two tools that slightly extended the development time. I definitely want to continue learning React Native and look forward to new challenges.


## Review:

During the review, attention was drawn to the following issues: 

1. **Global Error Handling with `react-query`**:
   - Utilized the global `onError` callback feature provided by `react-query` through `QueryCache` to handle errors consistently throughout the application. This approach eliminates the need for redundant `console.log` statements. Refer to the [documentation on global callbacks](https://tanstack.com/query/v4/docs/reference/QueryCache#global-callbacks) for more details.

2. **Query Keys Organization**:
   - Extracted query keys to a separate file to enhance code organization, reduce the likelihood of typos, and ensure better compatibility with TypeScript.

3. **Handling Empty Strings in Components**:
   - Replaced instances of returning empty strings in components with loader indicators to avoid potential rendering issues. This adjustment is particularly important in React Native, where rendering strings outside of a `Text` component can lead to errors.

4. **Avoidance of Inline Functions**:
   - Replaced inline functions in several places to adhere to best practices in React Native development. Inline functions, especially in larger components, can impact performance negatively, hence their removal improves code maintainability and performance.

These fixes enhance the readability, maintainability, and performance of the codebase, addressing key concerns identified during the review process.



