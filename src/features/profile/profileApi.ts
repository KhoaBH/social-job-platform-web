import { appApi } from "@/lib/appApi";

export interface BackendUser {
  id: string;
  email: string;
  username: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  profileText?: string | null;
  headline?: string | null;
  summary?: string | null;
  location?: string | null;
}

export interface BackendCompany {
  id: string;
  name?: string | null;
}

export interface BackendWorkExperience {
  id: string;
  company?: BackendCompany | null;
  companyName?: string | null;
  jobTitle?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  description?: string | null;
}

export interface BackendFieldOfStudy {
  id: string;
  name?: string | null;
}

export interface BackendSchool {
  id: string;
  name?: string | null;
}

export interface BackendEducation {
  id: string;
  school?: BackendSchool | null;
  schoolName?: string | null;
  degree?: string | null;
  fieldOfStudy?: BackendFieldOfStudy | null;
  startYear?: number | null;
  endYear?: number | null;
}

export interface CreateWorkExperiencePayload {
  companyId?: string;
  companyName?: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface BackendFollow {
  id: string;
  follower?: { id: string } | null;
  followee?: { id: string } | null;
}

export interface BackendConnectionUser {
  id: string;
}

export interface BackendConnection {
  id: string;
  requester?: BackendConnectionUser | null;
  addressee?: BackendConnectionUser | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "BLOCKED" | string;
}

export interface BackendSkillCategory {
  id: string;
  name?: string | null;
}

export interface BackendSkill {
  id: string;
  name?: string | null;
  category?: BackendSkillCategory | null;
}

export interface BackendUserSkill {
  id: string;
  level?: number | null;
  skill?: BackendSkill | null;
}

export interface CreateUserSkillPayload {
  skillId: string;
  level: number;
}

export interface CreateEducationPayload {
  schoolId?: string;
  schoolName?: string;
  degree: string;
  fieldOfStudyId: string;
  startYear?: number;
  endYear?: number;
}

export const profileApi = appApi.injectEndpoints({
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
      query: (userId) => `/skills/user/${userId}`,
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
        invalidatesTags: (_result, _error, _arg) => [
          { type: "ProfileSkill", id: "SKILL_LIST" },
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
  useGetEducationsByUserQuery,
  useCreateEducationMutation,
  useGetCompaniesQuery,
  useGetSchoolsQuery,
  useGetFieldOfStudiesQuery,
  useGetSkillsQuery,
  useGetUserSkillsQuery,
  useCreateUserSkillMutation,
  useGetMyFollowingQuery,
  useGetMyFollowersQuery,
  useGetMyConnectionsQuery,
} = profileApi;
