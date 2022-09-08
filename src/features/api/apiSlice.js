import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
    }),
    tagTypes: ["videos"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            providesTags: ["videos"],
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
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["videos"],
        }),
    }),
});

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useGetRelatedVideoQuery,
    useAddVideoMutation,
} = apiSlice;
