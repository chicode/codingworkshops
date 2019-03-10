# codingworkshops

## Project Structure
```
│
└─install
    Files used for installing on the server

└─public
    Global public files, like index.html and favicon

└─scripts
    Dev scripts, pretty useless

└─src
    └──codingworkshops
        Vue code for all the codingworkshops UI (pages, CodeAcademy-like instruction slides).

    └──components
       Global Vue components

    └──nico
        Vue code for the nico editor. This includes code for all the tabs (code editor and image editors), and also Python compilation, transformation, and running.

    └──styles
        Global styles

    main.js
        Main entry point

    rest.js
        Custom REST API request "framework". See below.

    endpoints.js
        Endpoint definitions for rest.js

    globals.js
        Debugging globals so you can write 'c' instead of 'console'

    store.js
        Global Vuex store. Vuex is really cool because it lets you have 'modules' which have local state but can be accessed from outside. This is how all state in this project is stored. This file combines the modules from codingworkshops and nico.

    generateSet.js
        Convenience function for automatically generating setters for Vuex.

    directives.js
        Global Vue directives.

    auth.js
        Authentication "framework". Adds a "$auth" property to Vue components and Vuex so that it's easier to login/logout.
```

## Rest.js
Making requests to the server produces a lot of boilerplate-y code, so this is really just a mixin that removes some of the boilerplate that's needed for page components that need information from the server, like the list of workshops. A component can specify the endpoint it needs in a `rest` key, and then the information is automatically put in `$rest` and loading is tracked in `$rest.loading`. `endpoints.js` contains a mapping of endpoint keys that are used in components to actual endpoints.

## JS style
Please use eslint. In general, use lodash/pipe operators everywhere you can (they significantly improve the quality of your code. I strongly recommend learning lodash.)

## CSS
The CSS in this project follows a slightly abnormal convention: for all simple styles, like margins and font colors, use inline [bootstrap classes](https://getbootstrap.com/docs/4.3/utilities/). This leads to more maintainable html because you don't have to create CSS classes for every little style.

The same applies for flexbox. Use `d-flex` when you just want elements side-by-side, or Bootstrap's `row` when you need those elements to be responsive.

When you notice that you're writing >6 inline classes for a certain element, you should probably separate them into a scoped Vue component style tag. When you notice that there's a lot of repeating styles that have to do with the theme, you should separate those into the `styles` folder and declare a global class. That goes `index.scss`.

The `.styl` stylus files that are still floating around are from before I started using bootstrap, and still exist because I was too lazy to rewrite the Nico styles. TODO this.
