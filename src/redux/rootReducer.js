import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/redux/authRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
