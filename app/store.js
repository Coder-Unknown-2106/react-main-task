import { configureStore } from '@reduxjs/toolkit'
import { api } from './service/api'
import countReducer from '../bootstrapComponents/countUpdateSlice'
export const store = configureStore({
    // set all reducers
    reducer: {
        [api.reducerPath]: api.reducer,
        counter: countReducer
    },
    middleware: (getDefalutMiddleware) => getDefalutMiddleware().concat(api.middleware)
})