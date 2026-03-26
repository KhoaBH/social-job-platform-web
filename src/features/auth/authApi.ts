import { appApi } from "../../lib/appApi";
import {
  LoginRequest,
  LoginResponse,
  FirebaseLoginRequest,
} from "./auth";

export const authApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    loginWithFirebase: builder.mutation<LoginResponse, FirebaseLoginRequest>({
      query: (body) => ({
        url: "/auth/firebase",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginWithFirebaseMutation } = authApi;
