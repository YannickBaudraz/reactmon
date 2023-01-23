# Reaction - Documentation

## Overview

The ReactMon project is a progressive web application that allows users to explore the world of
Pokémon. This project was developed as a part of a course on Advanced Web Animations, and it
showcases the use of various web animation techniques to enhance the user experience.

The application provides an interactive and engaging way for users to learn about different Pokémon,
including their abilities, types, forms, and cards from the Pokémon Trading Card Game. It also
allows users to browse through different Pokémon cards, and provides a detailed view of each card,
with animations that make the experience more immersive.

The application is built using React, a popular JavaScript library for building user interfaces. It
also utilizes various other libraries such as 'anime.js', 'PrimeReact', 'react-query' and
'framer-motion', to implement the animations and other features.

The project makes use of the Cloudflare Workers, which acts as a proxy server between the frontend
and the backend, this allows the application to securely handle sensitive data such as API keys.

## Technical Stack

### Package Management

`Pnpm` is used as the package manager for this project. It is a fast and disk space efficient
package
manager that is an alternative to npm or yarn. It uses a hardlink strategy for package installation
that allows for faster installations and greater disk space savings. This makes it a great choice
for projects where package installations take a long time and disk space is at a premium.

### Development Build Tool and Runtime

`Vite` is used as the development build tool and runtime for this project. It is a lightweight
development server that is built on top of the native ES modules feature in modern browsers. This
makes it fast and lightweight, as it does not require a complex build process like webpack or
parcel. It also has built-in support for TypeScript, and plugins for certain technologies such as
PWAs, TypeScript, React, and more.

### Programming Language

`TypeScript` is used as the programming language in this project. It is a strongly typed superset of
JavaScript that allows for better tooling at any scale. This makes it an ideal choice for projects
where type safety is important, and we want to ensure that the codebase is maintainable and easy to
understand. The use of TypeScript also allows for better development experience with features such
as code completion, type checking and more.

### UI Library

`React` is used as the UI library in this project. It is a JavaScript library for building user
interfaces that allows for building reusable UI components that can be easily composed together.
The ability of React to handle state changes and render updates efficiently makes it an ideal choice
for building dynamic web applications.

### Animation Libraries

`Anime.js` and `Framer Motion` are used as the animation libraries in this project. Anime.js is a
lightweight JavaScript animation library that allows for creating complex animations and using a
timeline to animate multiple elements in a sequence. Framer Motion is a animation library for React
that makes it easy to add animations to React components. Both libraries provide the flexibility and
power needed to create smooth, engaging animations in the project.

### UI Component Library

`PrimeReact` is used as the UI component library in this project. It is a collection of rich UI
components for React that are designed to be easy to use and customize. The library provides a wide
range of components such as cards, buttons, inputs, and more, that can be easily integrated into the
project. The use of a UI component library helps to keep the codebase consistent and maintainable
and to speeds up the development process.

### Data Fetching and Caching

`React-query` is used for data fetching and caching in this project. It is a set of hooks for
fetching and caching asynchronous data in React. It provides a simple and powerful way to handle
data in a React application, and allows for easy caching and real-time updates.

### Routing

`React-router` is used as the routing library in this project. It is a routing library for React
that allows for declarative routing in a React application. It provides a simple and powerful way to
handle routing and navigation in a React application.

### APIs

`PokeAPI`, `Pokémon TCG API` and `a Pokémon sprites repository` are used as the APIs in this
project. PokeAPI is an API for Pokémon data, Pokémon TCG API is an API for Pokémon TCG data, and
Pokémon sprites repository is a repository containing sprites for all Pokémon. These APIs provide
the data needed to build the application.

### Cloudflare Workers

The Pokémon TCG API requires an API key to be passed in the headers of the requests. Since this
would not be secure to pass in the frontend, I used a Cloudflare Worker to act as a proxy server.
This way, the API key is only stored on the worker, and not exposed in the frontend. This allows me
to securely fetch data from the API and display it on the website.

### Performance Audit

To ensure that the website is performant and accessible, I used Lighthouse to run performance audits
on the website. Lighthouse is an open-source, automated tool for improving the quality of web pages.
It checks for things such as performance, accessibility, and best practices. By using Lighthouse, I
was able to identify areas of improvement and optimize the website to load quickly and efficiently.

### Deployment

For deploying the website, I used Vercel. Vercel is a cloud platform for deploying front-end web
apps easily and quickly. It can be used with GitHub to automatically deploy the app when pushing to
code to the repository. With Vercel, I was able to easily deploy the website and make it accessible
to users. Additionally, Vercel provides a built-in CDN, which helps to deliver the website quickly
to users all over the world.

## Features

### Features

- SPA (Single Page Application) with routing and navigation
- PWA (Progressive Web App) support with offline capability
- Responsive design for different screen sizes
- Search and filter Pokémon by name or ID
- View detailed information about a Pokémon including its types, abilities, and forms
- View a Pokémon's official artwork and sprites
- View Pokémon TCG cards featuring the selected Pokémon
- Animations and interactions throughout the app to enhance the user experience
- Error handling and notifications in case of API errors
- Performance optimized and PWA with Lighthouse
- Deployed on Vercel for easy access and fast load times
- Data caching and fetching
