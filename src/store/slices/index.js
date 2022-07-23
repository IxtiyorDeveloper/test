import {combineReducers} from "@reduxjs/toolkit"

/** reducers */
import reducer from "./reducer"

/** Main reducer function */
export default combineReducers({reducer})

/** Export selectors and action functions */
export * from "./reducer"
