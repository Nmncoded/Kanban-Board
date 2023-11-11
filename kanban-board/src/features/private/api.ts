import { api } from './index.ts';

export const privateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query: (data) => {
        return {
          url: `api/boardItems`,
          method: "POST",
          body: data.body,
        };
      },
      invalidatesTags: ['boardData'],
      transformResponse: (response, meta, arg) => {
        return response;
      },
      // transformErrorResponse: (response, meta, arg) => console.log(response,meta,arg),
    }),
    deleteItem: builder.mutation({
      query: (data) => {
        return {
          url: `api/boardItems`,
          method: "DELETE",
          body: data.body,
        };
      },
      invalidatesTags: ['boardData'],
      transformResponse: (response, meta, arg) => {
        return response;
      },
      // transformErrorResponse: (response, meta, arg) => console.log(response,meta,arg),
    }),
    updateItem: builder.mutation({
      query: (data) => {
        return {
          url: `api/boardItems`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: ['boardData'],
      transformResponse: (response, meta, arg) => {
        return response;
      },
      // transformErrorResponse: (response, meta, arg) => console.log(response,meta,arg),
    }),
    getAllBoardData: builder.query({
      query: (data) => {
        return {
          url: `api/getAllBoardData`,
          method: "GET",
        };
      },
      providesTags: ["boardData"],
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response:any, meta, arg) => {
        return response?.data?.length>0 ? response?.data: [];
      },
      // Pick out errors and prevent nested properties in a hook or selector
      // transformErrorResponse: (response, meta, arg) => response.status,
    }),
  }),
  overrideExisting: false,
});


export const {
  useGetAllBoardDataQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
} = privateApi;

// In this example, we define an API object using createApi with an endpoint for fetching posts. We also define a postsSlice with an initial state that includes a posts array, a loading state, and an error state.
// In the extraReducers section of the slice, we use addMatcher to handle the pending, fulfilled, and rejected actions that are dispatched by the getPosts endpoint. These cases update the state of the posts field in the store based on the current state of the fetch operation.
// We also export a useGetPostsQuery hook that can be used in our components to fetch posts data from the API.
// Overall, using createApi and createSlice together can help simplify the process of managing API requests and state in a Redux application. The createApi function generates a set of actions and reducers based on your API definition, while createSlice provides a way to define additional reducers and actions for your Redux store.
