import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import { ICrmState } from "./crm/reducer";

export interface IAppState {
  crmReducer: ICrmState;
}

const middleware = [
  applyMiddleware(thunk),
  ...((window as any).__REDUX_DEVTOOLS_EXTENSION__
    ? [(window as any).__REDUX_DEVTOOLS_EXTENSION__()]
    : []),
];

const store = createStore(reducers, compose(...middleware));
export default store;
