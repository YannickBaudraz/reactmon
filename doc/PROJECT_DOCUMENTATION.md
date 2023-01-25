# ReactMon - Documentation

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

## Challenges

### Animate the SVG

#### The Challenge

The biggest challenge I faced while working on this project was animating the SVG. I wanted to
animate the SVG in a way that would make it look like the Pokémon was drawn when the page loaded.

The problem was that the SVG from the PokeAPI was an url to an SVG file, so if I pass it to the
`<img>` tag, it would not be animated because to animate an SVG the way I wanted I need to animate
the individual paths in the SVG.

#### How I solved it

To solve it, I parsed the SVG file from the URL to an SVG document, return info about this document,
and then render it into a `<svg>` tag.

##### Parsing the SVG

```ts
export interface Svg {
  width?: string;
  height?: string;
  viewBox?: string;
  g: { transform?: string };
  paths: { definition: string; id: string; fill?: string }[];
}

export async function getSvgFromUrl(url: string): Promise<Svg> {
  const response = await axios.get<string>(url);
  const svgString = response.data;

  const svgDoc = new DOMParser().parseFromString(svgString, 'image/svg+xml');

  const svg = svgDoc.querySelector('svg');
  const g = svgDoc.querySelector('g');
  const pathElements = svgDoc.querySelectorAll('path');

  return {
    width: svg?.getAttribute('width')?.replace('px', ''),
    height: svg?.getAttribute('height')?.replace('px', ''),
    viewBox: svg?.getAttribute('viewBox') || undefined,
    g: {transform: g?.getAttribute('transform') ?? undefined},
    paths: Array.from(pathElements).map((path, index) => {
      const paths = path.getAttribute('d') || '';
      const fill = path.getAttribute('fill') || '';
      const id = `${index}-${paths}`;
      return {definition: paths, fill, id};
    })
  };
}
```

This is a function that takes a URL as an input and returns an object of the Svg type.

It uses the axios library to make a GET request to the provided URL and get the SVG data
in the response.

Then, the function uses the DOMParser class to parse the SVG data as an XML document, and it uses
the querySelector and querySelectorAll methods to select svg, g and path elements from the document.

The function then creates an object containing the width, height, viewBox, g and paths of the svg,
and it returns this object.

##### SVG rendering

```tsx
export default function AnimatedSvg({svgUrl, containerSize, onLookingComplete}: AnimatedSvgProps) {
  const [svg, setSvg] = useState<Svg | undefined>(undefined);
  const [currentSvgUrl, setCurrentSvgUrl] = useState<string | undefined>(undefined);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isLookingComplete, setIsLookingComplete] = useState(false);

  useEffect(() => {
    if (svgUrl !== currentSvgUrl) {
      setSvg(undefined);
      setIsLookingComplete(false);
      getSvgFromUrl(svgUrl).then(setSvg);
      setCurrentSvgUrl(svgUrl);
    }
  }, [svgUrl]);

  useEffect(() => {
    if (svgRef.current && svg && !isLookingComplete) {
      animate(svgRef.current.querySelectorAll('path'));
    }
  }, [svg, isLookingComplete]);

  if (!svg) return null;

  const viewBox = svg.viewBox?.split(' ').map(Number) ?? [0, 0, 0, 0];

  return (
      <svg
          ref={svgRef}
          width={containerSize.width * .75}
          height={containerSize.height}
          viewBox={`${viewBox[0]} ${viewBox[1]} ${svg.width} ${svg.height}`
          }
          key={svgUrl}
      >
        <g fill="none"
           strokeWidth="0.5"
           transform={svg.g?.transform}
        >
          {
            svg.paths.map(path => (
                <path
                    key={path.id}
                    d={path.definition}
                    data-fill={Color(path.fill
                    ).desaturate(.5).hex()
                    }
                />
            ))
          }
        </g>
      < /svg>
  )
      ;
}
```

This code is responsible for displaying an SVG on the screen. It starts by defining some state
variables that will be used to track the SVG's data, the current URL of the SVG. It also define
a reference to the actual SVG element that is displayed on the screen.

It then uses two React useEffect hooks :

1. To listen for changes to the SVG URL. When the URL changes, it sets the SVG's data to
   undefined, resets the animation state, and retrieves the new SVG's data from the provided URL.
2. To listen for changes to the SVG's data and the animation state. When is not null (indicating
   that the component has rendered and the ref has been set), the SVG's data is retrieved and the
   animation doesn't look complete, it animates the SVG.

Once the new SVG's data is retrieved, it is rendered on the screen. The code sets the size and
viewbox of the SVG element, and maps through the SVG's paths to create individual path elements and
sets their fill color.

##### SVG animation

```ts
function animate(paths: NodeListOf<SVGPathElement>) {
  const totalDuration = 3500;

  const strokeFromTo: AnimeParams['stroke'] = [
    'none',
    (el: any) => el.getAttribute('data-fill')
  ];

  const fillFromTo: AnimeParams['fill'] = [
    {value: Color('white').alpha(0).toString(), duration: 0},
    {value: (el: any) => el.getAttribute('data-fill'), delay: totalDuration * .2}
  ];

  const delayBetweenEachPaths: AnimeParams['delay'] = anime.stagger(5, {
    grid: [paths.length, 10],
    from: 'center'
  });

  const onUpdate = (anim: anime.AnimeInstance) => {
    setIsLookingComplete(prevIsComplete => {
      const isElasticEasingLookFinished = anim.progress >= 50;
      if (isElasticEasingLookFinished && !prevIsComplete) {
        onLookingComplete?.();
        return true;
      }
      return prevIsComplete;
    });
  };

  anime({
    targets: paths,
    duration: totalDuration,
    stroke: strokeFromTo,
    strokeDashoffset: [anime.setDashoffset, 0],
    fill: fillFromTo,
    delay: delayBetweenEachPaths,
    easing: 'easeOutElastic(1, .5)',
    update: onUpdate
  });
}
```

This function animates multiple SVG path elements. It takes an array of SVG path elements as an
input and uses the anime library to animate them.

The animation has a total duration of 3500 milliseconds.

The stroke of the path element starts as "none" and will change to the value of the data-fill
attribute of the element - which is the color of the path.

The fill of the path element starts as a transparent white color and will start changing to the
value of the data-fill attribute of the element after 700 milliseconds.

Each path element in the animation has a delay between them that is calculated by the
anime.stagger() function. The stagger function takes a delay value and an object as inputs. The
delay value is the amount of time between each path element, and the object is used to configure the
stagger function. The grid property of the object is used to stagger the elements in a grid. The
first value of the grid is the number of elements to stagger, and the second value is the number of
columns in the grid. The 'from' property of the object is used to configure the stagger function to
stagger the elements from the center of the grid. (For this part, I made some experimentation to
find the best values for the grid and from properties)

When the animation updates, it also updates the state of the variable 'isLookingComplete' if
the animation progress is greater than or equal to 50% and the previous value of the variable is
false. It's used to indicate that the animation has reached the point where it's look like it's
complete for human eyes. This is useful for the parent component to know when the animation is
complete and start animating other elements.

The animation uses the anime function of anime.js, and the easeOutElastic easing type is used to
make the animation bouncing at the end and make a reflecting effect with the colors.

## Conclusion

In this project, I aimed to build a Progressive Web App that showcases advanced web animations using
the popular Pokémon franchise as a theme. I used the React library to build the app, and leveraged
the power of animations to create engaging and interactive user experiences.

One of the key areas of focus in this project was having a caching system for the http requests.
I used the react-query library to handle data fetching and caching, which allowed me to greatly
improve the app's performance and reduce the amount of unnecessary network requests.

Furthermore, I learned how to optimize performance for images. This was achieved with different
strategies, such as with lazy loading and using placeholder images to only load 1 image when the
page loads and then load the rest of the images when the user scrolls to them with a framer motion
method. Or by using smaller images when they are visible in a grid and display the full image when
the user clicks on them.

I also learned how to build responsive layout with the mobile-first approach. At the beginning of
the project, the application way only designed for desktop, and when at the end of the project, I
wanted to add different layouts I had to restart some parts from scratch, because it's easier to
build add elements to some space as the layout grow than to remove elements from a layout that is
already full.

Overall, this project allowed me to learn and experiment with advanced web animations and
performance optimization techniques. I am very satisfied with the final result and I am confident
that my skills in these areas have greatly improved.

## Future improvements

In the future, I would like to:

- Improve the performance of the search bar feature
- Add more information about each Pokémon, such as:
    - Evolutions
    - Attacks
    - Animations for their evolutions.
- Using more React feature to build a more scalable application
