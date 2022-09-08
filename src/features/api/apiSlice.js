import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
        }),
        getVideo: builder.query({
            query: (id) => `/videos/${id}`,
        }),
        getRelatedVideo: builder.query({
            query: ({ id, title }) => {
                const query =
                    title
                        .split(" ")
                        .map((v) => `title_like=${v}`)
                        .join("&") + `&id_ne=${id}`;
                return `/videos?${query}`;
            },
        }),
    }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideoQuery } =
    apiSlice;
