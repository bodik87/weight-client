import { userApi } from "../userApi";

export const mealsApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    createMeal: builder.mutation({
      query: (data) => ({
        url: "/meals",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateMeal: builder.mutation({
      query: (data) => ({
        url: "/meals",
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteMeal: builder.mutation({
      query: (data) => ({
        url: "/meals",
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
} = mealsApi;
