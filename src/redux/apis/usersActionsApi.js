import { userApi } from "../userApi";
import { logOut, setCredentials } from "../userSlice";

export const usersActionsApi = userApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(userApi.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getUserData: builder.query({
      query: () => ({ url: "/users" }),
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "UserData", id: "LIST" },
            ...result.ids.map((id) => ({ type: "UserData", id })),
          ];
        } else return [{ type: "UserData", id: "LIST" }];
      },
    }),
    updateUserWeight: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/register",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (initialUserData) => ({
        url: `/users`,
        method: "DELETE",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useGetUserDataQuery,
  useUpdateUserWeightMutation,
  useAddNewUserMutation,
  useDeleteUserMutation,
} = usersActionsApi;
