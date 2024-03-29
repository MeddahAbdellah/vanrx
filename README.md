# Vanrx

vanrx is an ultra-lightweight Redux addon for VanJS, designed to enhance your VanJS applications with a simple yet powerful state management solution. Try it [stackblitz](https://stackblitz.com/edit/vitejs-vite-uk2xjn?file=main.js)

## Features

- **Zero dependencies**: Works out of the box with VanJS.
- **Simplicity**: Easy to integrate and use within your VanJS projects.
- **Lightweight**: Adds minimal overhead to your application.

## Installation

To use vanrx in your project, simply include it alongside VanJS.

```bash
npm install vanrx
```

## Usage

vanrx is designed to be simple and easy to use. To get started, simply create a state, give a name, an initial state, and then you can create as many reducers as you want.

```js
import van from "vanjs-core";
import vanrx from "vanrx";

const [createReducer, dispatch, createSelector] = vanrx("Counter", {
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
    van.tags.button({ onclick: () => dispatch("increment", 1) }, "Increment")
  );
}

van.add(document.body, Counter());
```

## Effects

As you might already know, vanrx is a Redux-like state management library, and it also supports effects for async states. You can create effects by using the `createEffect` function.

```js
import van from "vanjs-core";
import vanrx from "vanrx";

const [createReducer, dispatch, createSelector, createEffect] = vanrx(
  "Counter",
  {
    count: 0,
  }
);

createReducer("increment", (state, increment) => {
  return {
    ...state,
    count: state.count + increment,
  };
});

createReducer("decrement", (state, increment) => {
  return {
    ...state,
    count: state.count - increment,
  };
});

createEffect("increment", () => {
  let timerId;
  return {
    effect: (dispatch) => {
      timerId = setTimeout(() => {
        dispatch("decrement", 2);
      }, 2000);
    },
    dispose: () => {
      clearTimeout(timerId);
    },
  };
});

const count = createSelector((state) => state.count);

function Counter() {
  return van.tags.div(
    () => count.val,
    van.tags.button({ onclick: () => dispatch("increment", 1) }, "Increment")
  );
}

van.add(document.body, Counter());
```

## License

vanrx is open source software. It is free to use and modify under the terms of the MIT license.
