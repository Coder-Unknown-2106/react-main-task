import { api } from "../app/service/api"
const productApi = api.injectEndpoints({
    endpoints: builder => ({
        getProduct: builder.query({
            query: () => ({ url: "products" })
        })
    })
})

export const { useGetProductQuery } = productApi