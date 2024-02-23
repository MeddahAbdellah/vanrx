import van from "vanjs-core";
const toXActionFn = (name) => (action) => `[${name}] ${action}`;
export default function vanrx(name, initialState = {}) {
  const state = van.state(initialState),
    toXAction = toXActionFn(name);
  let actions = {},
    effects = {};
  const dispatch = (action, params) => {
    state.val = (actions[toXAction(action)] || []).reduce(
      (accState, reducer) => reducer(accState, params),
      state.val,
    );
    (effects[toXAction(action)] || []).forEach(({ effect, dispose }) => {
      dispose();
      effect(dispatch);
    });
  };
  return [
    (action, reduce) => {
      actions = {
        ...actions,
        [toXAction(action)]: [...(actions[toXAction(action)] || []), reduce],
      };
    },
    dispatch,
    (selector) => van.derive(() => selector(state.val)),
    (action, effectFn) => {
      const xAction = toXAction(action);
      const { effect, dispose } = effectFn();
      effects = {
        ...effects,
        [xAction]: [...(effects[xAction] || []), { effect, dispose }],
      };
    },
    name,
  ];
}
