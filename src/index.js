import van from "vanjs-core";
const toXActionFn = (name) => (action) => `[${name}] ${action}`;
export default function vanrx(name, initialState = {}) {
  const state = van.state(initialState);
  const toXAction = toXActionFn(name);
  let actions = {};

  return [
    (action, reduce) => {
      actions = {
        ...actions,
        [toXAction(action)]: [...(actions[toXAction(action)] || []), reduce],
      };
    },
    (action, params) => {
      state.val = (actions[toXAction(action)] || []).reduce(
        (accState, reducer) => reducer(accState, params),
        state.val,
      );
    },
    (selector) => van.derive(() => selector(state.val)),
    name,
  ];
}
