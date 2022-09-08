import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000",
    }),
    tagTypes: ["videos", "video", "relatedVideo"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            providesTags: ["videos"],
        }),
        getVideo: builder.query({
            query: (id) => `/videos/${id}`,
            providesTags: (result, error, arg) => [{ type: "video", id: arg }],
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
            providesTags: (result, error, arg) => [
                { type: "relatedVideo", id: arg.id },
            ],
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["videos"],
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "videos",
                { type: "video", id: arg.id },
                { type: "relatedVideo", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useGetRelatedVideoQuery,
    useAddVideoMutation,
    useEditVideoMutation,
} = apiSlice;
