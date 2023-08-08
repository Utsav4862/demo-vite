import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:'https://dummyjson.com/'}),
    endpoints: (builder) => ({
        getAllProducts:builder.query({
            query : () => 'products',
        }),
        getProductBySearch: builder.query({
            query : (product) => `product/search?q=${product}`
        })
    })

})

export const {useGetAllProductsQuery, useGetProductBySearchQuery} = apiSlice

