import { appApi } from "@/lib/appApi";
import {
  BackendUser,
  BackendWorkExperience,
  BackendEducation,
  BackendCompany,
  BackendSchool,
  BackendFieldOfStudy,
  BackendSkill,
  BackendUserSkill,
  BackendFollow,
  BackendConnection,
  CreateWorkExperiencePayload,
  UpdateWorkExperiencePayload,
  CreateEducationPayload,
  UpdateEducationPayload,
  CreateUserSkillPayload,
  UpdateUserSkillPayload,
} from "../profile/types";

export const profileApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserById: builder.query<BackendUser, string>({
      query: (userId) => `/users/${userId}`,
      providesTags: (_result, _error, userId) => [
        { type: "ProfileUser", id: userId },
      ],
    }),
    updateUserById: builder.mutation<
      BackendUser,
      { userId: string; body: Partial<BackendUser> }
    >({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "ProfileUser", id: arg.userId },
      ],
    }),
    getWorkExperiencesByUser: builder.query<BackendWorkExperience[], string>({
      query: (userId) => `/work-experiences/user/${userId}`,
      providesTags: (_result, _error, userId) => [
        { type: "ProfileExperience", id: userId },
      ],
    }),

    createWorkExperience: builder.mutation<
      BackendWorkExperience,
      CreateWorkExperiencePayload
    >({
      query: (body) => ({
        url: "/work-experiences",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ProfileExperience", id: "LIST" }],
    }),
    deleteWorkExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `/work-experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProfileExperience", id: "LIST" }],
    }),
    updateWorkExperience: builder.mutation<
      BackendWorkExperience,
      { id: string; body: UpdateWorkExperiencePayload }
    >({
      query: ({ id, body }) => ({
        url: `/work-experiences/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "ProfileExperience", id: "LIST" }],
    }),
    

    getEducationsByUser: builder.query<BackendEducation[], string>({
      query: (userId) => `/educations/user/${userId}`,
      providesTags: (_result, _error, userId) => [
        { type: "ProfileEducation", id: userId },
      ],
    }),
    createEducation: builder.mutation<BackendEducation, CreateEducationPayload>(
      {
        query: (body) => ({
          url: "/educations",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: "ProfileEducation", id: "LIST" }],
      },
    ),
    updateEducation: builder.mutation<
      BackendEducation,
      { id: string; body: UpdateEducationPayload }
    >({
      query: ({ id, body }) => ({
        url: `/educations/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "ProfileEducation", id: "LIST" }],
    }),
    deleteEducation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/educations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ProfileEducation", id: "LIST" }],
    }),
    getCompanies: builder.query<BackendCompany[], void>({
      query: () => "/companies",
    }),
    getSchools: builder.query<BackendSchool[], void>({
      query: () => "/schools",
    }),
    getFieldOfStudies: builder.query<BackendFieldOfStudy[], void>({
      query: () => "/field-of-studies",
    }),
    getSkills: builder.query<BackendSkill[], void>({
      query: () => "/skills",
      providesTags: [{ type: "ProfileSkill", id: "SKILL_LIST" }],
    }),
    getUserSkills: builder.query<BackendUserSkill[], string>({
      query: () => `/skills/user`,
      providesTags: (_result, _error, userId) => [
        { type: "ProfileSkill", id: `USER_${userId}` },
      ],
    }),
    createUserSkill: builder.mutation<BackendUserSkill, CreateUserSkillPayload>(
      {
        query: (body) => ({
          url: "/skills/user",
          method: "POST",
          body,
        }),
        invalidatesTags: [{ type: "ProfileSkill", id: "SKILL_LIST" }],
      },
    ),
    updateUserSkill: builder.mutation<
      BackendUserSkill,
      { userId: string; skillId: string; body: UpdateUserSkillPayload }
    >({
      query: ({ skillId, body }) => ({
        url: `/skills/user/${skillId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "ProfileSkill", id: `USER_${arg.userId}` },
      ],
    }),
    deleteUserSkill: builder.mutation<void, { userId: string; skillId: string }>(
      {
        query: ({ skillId }) => ({
          url: `/skills/user/${skillId}`,
          method: "DELETE",
        }),
        invalidatesTags: (_result, _error, arg) => [
          { type: "ProfileSkill", id: `USER_${arg.userId}` },
        ],
      },
    ),
    getMyFollowing: builder.query<BackendFollow[], void>({
      query: () => "/follows/me/following",
      providesTags: [{ type: "ProfileFollow", id: "ME_FOLLOWING" }],
    }),
    getMyFollowers: builder.query<BackendFollow[], void>({
      query: () => "/follows/me/followers",
      providesTags: [{ type: "ProfileFollow", id: "ME_FOLLOWERS" }],
    }),
    getMyConnections: builder.query<BackendConnection[], void>({
      query: () => "/connections/me",
      providesTags: [{ type: "ProfileConnection", id: "ME" }],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useGetWorkExperiencesByUserQuery,
  useCreateWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useGetEducationsByUserQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useGetCompaniesQuery,
  useGetSchoolsQuery,
  useGetFieldOfStudiesQuery,
  useGetSkillsQuery,
  useGetUserSkillsQuery,
  useCreateUserSkillMutation,
  useUpdateUserSkillMutation,
  useDeleteUserSkillMutation,
  useGetMyFollowingQuery,
  useGetMyFollowersQuery,
  useGetMyConnectionsQuery,
} = profileApi;
