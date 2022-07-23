import {configureStore} from "@reduxjs/toolkit"
import thunk from 'redux-thunk'

import reducer from "./slices"

export * from "./slices"

export const store = configureStore({
        reducer,
        middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk
        })
})

