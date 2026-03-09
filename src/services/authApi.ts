import { appApi } from "./appApi";
import {
  LoginRequest,
  LoginResponse,
  FirebaseLoginRequest,
} from "@/types/auth";

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
