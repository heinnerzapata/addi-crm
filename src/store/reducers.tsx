import { combineReducers } from "redux";

import crmReducer from "./crm/reducer";

const reducers = combineReducers({
  crmReducer,
});

export default reducers;
