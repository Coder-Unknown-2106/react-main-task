import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// set BaseUrl using RTK Query
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: () => ({})
})
