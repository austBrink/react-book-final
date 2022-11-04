# (very) Simple Blog (react-book-final)
A minimal blog using react and firebase.

## memos / notes 
The changes and updates that would be used later were dropped without explanation. Like the context with value prop that contained 'onLogin' We used it later but initially we wrote it without knowing.
Obvsiouly as mentioned, the react router is out of date as well as firebase.

Additionally, he's using web version 8 (namespaced) for firebase and I ran into webpack errors using that. I've had to follow firebase docs and change everything to module.

## Scripts

In the top level directory run, `npm run sDev` for a custom [react scripts start](https://blog.logrocket.com/everything-you-need-know-about-react-scripts/). This custom script employs `env-cmd` to force the particular .env defined in package.json scripts. `sDev` starts the development environment using .env.development.local.

_Similarly_, use `npm run bDev` to build the project using the development environment. This bundles the project in servable build files in the `./build` directory.

### A Word on React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

While the initial react-app boiler-plate comes with testing and scripts I've paired things down to whats needed. If you want to learn more about react and it's defaults checkout their official [docs](https://reactjs.org/docs/getting-started.html).
