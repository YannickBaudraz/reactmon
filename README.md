# ReactMon - A Pokémon React PWA

Welcome to __ReactMon__, a Progressive Web App (PWA) that allows users to browse a list of Pokémon
and view their details, including their abilities, types, forms, and cards from the Pokémon Trading
Card Game. This project is for a school course about Advanced Web Animations and was built using
React, TypeScript, and various other libraries such as PrimeReact, Framer Motion, and Anime.js.

## Features

- Browse a list of all known Pokémon (except the 9th generation) and view their details
- Search for a specific Pokémon by name or ID
- View detailed information about a specific Pokémon, including their types, height, weight and
  stats
- View a selection of available Pokémon Trading Card Game (TCG) cards for a specific Pokémon
- Responsive design for optimal viewing on any device
- Animations and interactions to enhance the user experience

## Demo

You can view a [live demo](https://reactmon-jet.vercel.app/) of the app deployed
with [Vercel](https://vercel.com/).

## Prerequisites

- [Pnpm](https://pnpm.js.org/)
- [Node.js](https://nodejs.org/)

### Optional

#### Cloudflare Workers

The project, by default, calls the production URL of the proxy server. If you want to use your own
proxy server, you can see instruction in the
repository [README](https://github.com/yannickcpnv/tcg-proxy-server#readme).

After setting up your own proxy server, you can change the URL in a .env.local file, next to the
.env file, with the following content:

```dotenv {.line-numbers}, title="env.local"
VITE_TCG_PROXY_URL=http://127.0.0.1:8787
```

## Installation

1. Clone the repository: `git clone https://github.com/yannickcpnv/reactmon.git`
2. Navigate to the directory: `cd reactmon`
3. Install the dependencies: `pnpm install`

## Usage

To start the development server, run the following command:

```shell
pnpm dev
```

The app will be running on http://localhost:3000 and will automatically reload if you make changes
to the code.

### PWA

To install the app as a PWA, you can use the following steps:

1. Open the app in Chrome
2. Click on the "Install ReactMon" button in the address bar
3. Click on "Add" in the dialog that appears
4. The app will now be installed on your device
5. You can now launch the app from your device's home screen

## Tools and Libraries

### Package Management

- [Pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

### Development Build Tool and Runtime

- [Vite](https://vitejs.dev/) - A development build tool and runtime for web apps

### Programming Language

- [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds
  on JavaScript, giving you better tooling at any scale.

### UI Library

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

### Animation Libraries

- [Anime.js](https://animejs.com/) - A lightweight JavaScript animation library and allowing to
  create complex animations and use a timeline to animate multiple elements in a sequence
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React

### UI Component Library

- [Primereact](https://primefaces.org/primereact/) - A collection of rich UI components for React

### Data Fetching and Caching

- [React-query](https://tanstack.com/query/latest) - Hooks for fetching and caching asynchronous
  data in React

### Routing

- [React-router](https://reactrouter.com/) - Routing library for React

### APIs

- [PokeAPI](https://pokeapi.co/) - An API for Pokémon data
- [Pokémon TCG API](https://pokemontcg.io/) - An API for Pokémon TCG data
- [Pokémon sprites repository](https://github.com/PokeAPI/sprites/) - A repository containing
  sprites for all Pokémon

### Cloudflare Workers

- [Cloudflare Workers](https://workers.cloudflare.com/) - A serverless platform for creating
  applications that live on the edge of the Cloudflare network. Used for proxying the Pokémon TCG
  API calls

### Performance Audit

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - An open-source, automated tool
  for improving the quality of web pages. Used for performance audits

### Deployment

- [Vercel](https://vercel.com/) - A cloud platform for deploying front-end web apps easily and
  quickly. It can be used with GitHub to automatically deploy the app when pushing to code to the
  repository

## Author

- [Yannick-Baudraz](https://github.com/yannickcpnv) - <yannickbaudrazdev@gmail.com>

## License

This project is not licensed, you can use it as you want, but that's all. I'm just doing this by
default, but you can still contact me if you want to do something with it.
