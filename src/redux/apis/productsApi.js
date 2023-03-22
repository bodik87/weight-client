import { userApi } from "../userApi";

export const productsApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    newProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
