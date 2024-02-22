# Vandux

Vandux is an ultra-lightweight Redux addon for VanJS, designed to enhance your VanJS applications with a simple yet powerful state management solution.

## Features

- **Zero dependencies**: Works out of the box with VanJS.
- **Simplicity**: Easy to integrate and use within your VanJS projects.
- **Lightweight**: Adds minimal overhead to your application.

## Installation

To use Vandux in your project, simply include it alongside VanJS.

```bash
npm install vandux
```

## Usage

Vandux is designed to be simple and easy to use. To get started, simply create a state, give a name, an initial state, and then you can create as many reducers as you want.

```js
import van from "vanjs-core";
import vandux from "vandux";

const [createReducer, dispatch, createSelector] = vandux("Counter", {
  count: 0,
});

createReducer("increment", (state, increment) => {
  return {
    ...state,
    count: state.count + increment,
  };
});

const count = createSelector((state) => state.count);

function Counter() {
  return van.tags.div(
    () => count.val,
    van.tags.button({ onclick: () => dispatch("increment", 1) }, "Increment"),
  );
}

van.add(document.body, Counter())

```

## License

Vandux is open source software. It is free to use and modify under the terms of the MIT license.
