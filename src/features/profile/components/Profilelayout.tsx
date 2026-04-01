"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useCreateEducationMutation,
  useCreateWorkExperienceMutation,
  useGetCompaniesQuery,
  useGetEducationsByUserQuery,
  useGetFieldOfStudiesQuery,
  useGetMyConnectionsQuery,
  useGetMyFollowersQuery,
  useGetSchoolsQuery,
  useGetUserByIdQuery,
  useGetWorkExperiencesByUserQuery,
} from "../profileApi";
import {
  ProfileEducationView,
  ProfileExperienceView,
  ProfileUserView,
  Tab,
  randomSoftColorFromString,
  toMonthYear,
} from "../types";
import { ExperienceFormData } from "./models/AddExperienceModal/types";
import { EducationFormData } from "./models/AddEducationModal/types";
import ProfileHero from "./ProfileHero";
import ProfileTabBar from "./ProfileTabBar";
import OverviewTab from "./tabs/OverviewTab";
import ProfileSkillsTab from "./tabs/ProfileSkillsTab";
import ActivityTab from "./tabs/ActivityTab";
import NetworkTab from "./tabs/NetworkTab";

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const params = useParams<{ userId: string }>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const routeUserId = typeof params.userId === "string" ? params.userId : "";
  const targetUserId = routeUserId || authUser?.id || "";
  const isOwner = Boolean(authUser?.id && authUser.id === targetUserId);

  const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(
    targetUserId,
    {
      skip: !targetUserId,
    },
  );

  const { data: workExperiences = [], refetch: refetchExperiences } =
    useGetWorkExperiencesByUserQuery(targetUserId, {
      skip: !targetUserId,
    });

  const { data: educations = [], refetch: refetchEducations } =
    useGetEducationsByUserQuery(targetUserId, {
      skip: !targetUserId,
    });

  const { data: companies = [] } = useGetCompaniesQuery();
  const { data: schools = [] } = useGetSchoolsQuery();
  const { data: fieldOfStudies = [] } = useGetFieldOfStudiesQuery();

  const { data: myFollowers = [] } = useGetMyFollowersQuery(undefined, {
    skip: !isOwner,
  });

  const { data: myConnections = [] } = useGetMyConnectionsQuery(undefined, {
    skip: !isOwner,
  });

  const [createWorkExperience, { isLoading: isCreatingExperience }] =
    useCreateWorkExperienceMutation();
  const [createEducation, { isLoading: isCreatingEducation }] =
    useCreateEducationMutation();

  const profileUser: ProfileUserView = useMemo(() => {
    const fullName = userData?.fullName || authUser?.fullName || "Người dùng";
    return {
      id: targetUserId,
      fullName,
      username: userData?.username || authUser?.email?.split("@")[0] || "user",
      avatarUrl: userData?.avatarUrl || authUser?.avatarUrl || "",
      headline:
        userData?.headline ||
        "Sinh viên tại University of Information Technology – VNU-HCM",
      location: userData?.location || "TP.HCM",
      bio:
        userData?.summary ||
        userData?.profileText ||
        "Chưa có phần giới thiệu. Hãy cập nhật hồ sơ để tăng khả năng kết nối.",
      isOwner,
      connections: myConnections.length,
      followers: myFollowers.length,
      openToWork: isOwner,
    };
  }, [
    authUser,
    isOwner,
    myConnections.length,
    myFollowers.length,
    targetUserId,
    userData,
  ]);

  const experienceViews: ProfileExperienceView[] = useMemo(
    () =>
      workExperiences.map((item) => {
        const company = item.company?.name || item.companyName || "Company";
        return {
          id: item.id,
          title: item.jobTitle || "Chưa cập nhật",
          company,
          companyLogo: company.slice(0, 1).toUpperCase(),
          companyColor: randomSoftColorFromString(company),
          type: "Toan thoi gian",
          startDate: toMonthYear(item.startDate),
          endDate: item.endDate ? toMonthYear(item.endDate) : "Hiện tại",
          duration: "",
          location: "",
          description: item.description || "",
          skills: [],
        };
      }),
    [workExperiences],
  );

  const educationViews: ProfileEducationView[] = useMemo(
    () =>
      educations.map((item) => {
        const school = item.school?.name || item.schoolName || "School";
        return {
          id: item.id,
          school,
          schoolLogo: school.slice(0, 3).toUpperCase(),
          schoolColor: randomSoftColorFromString(school),
          degree: item.degree || "",
          major: item.fieldOfStudy?.name || "",
          startYear: item.startYear ? String(item.startYear) : "",
          endYear: item.endYear ? String(item.endYear) : "",
          gpa: "",
          activities: "",
        };
      }),
    [educations],
  );

  const handleCreateExperience = async (form: ExperienceFormData) => {
    if (!isOwner) {
      return;
    }

    if (!form.startMonth || !form.startYear) {
      return;
    }

    const startDate = `${form.startYear}-${String(Number(form.startMonth)).padStart(2, "0")}-01`;
    const hasEndDate = !form.isCurrent && form.endMonth && form.endYear;
    const endDate = hasEndDate
      ? `${form.endYear}-${String(Number(form.endMonth)).padStart(2, "0")}-01`
      : undefined;

    await createWorkExperience({
      companyId: form.companyId,
      companyName: form.company,
      jobTitle: form.title,
      startDate,
      endDate,
      description: form.description,
    }).unwrap();

    await refetchExperiences();
  };

  const handleCreateEducation = async (form: EducationFormData) => {
    if (!isOwner) {
      return;
    }

    await createEducation({
      schoolId: form.schoolId,
      schoolName: form.schoolName,
      degree: form.degree,
      fieldOfStudyId: form.fieldOfStudyId,
      startYear: form.startYear ? Number(form.startYear) : undefined,
      endYear: form.endYear ? Number(form.endYear) : undefined,
    }).unwrap();

    await refetchEducations();
  };

  return (
    <>
      {/* Google Font — DM Sans + DM Serif Display */}
      {/* <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');
        body, * { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style> */}

      <div className="min-h-screen bg-[#F0F2F5]">
        <div className="max-w-[1080px] mx-auto px-4 py-5 flex flex-col gap-1">
          <ProfileHero
            onTabChange={setActiveTab}
            user={profileUser}
            isLoading={isLoadingUser}
          />
          <ProfileTabBar active={activeTab} onChange={setActiveTab} />

          {activeTab === "overview" && (
            <OverviewTab
              onTabChange={setActiveTab}
              user={profileUser}
              experiences={experienceViews}
              educations={educationViews}
              companies={companies}
              schools={schools}
              fieldOfStudies={fieldOfStudies}
              onCreateExperience={handleCreateExperience}
              isCreatingExperience={isCreatingExperience}
              onCreateEducation={handleCreateEducation}
              isCreatingEducation={isCreatingEducation}
            />
          )}
          {activeTab === "profile" && (
            <ProfileSkillsTab
              user={profileUser}
              experiences={experienceViews}
              educations={educationViews}
              companies={companies}
              schools={schools}
              fieldOfStudies={fieldOfStudies}
              onCreateExperience={handleCreateExperience}
              isCreatingExperience={isCreatingExperience}
              onCreateEducation={handleCreateEducation}
              isCreatingEducation={isCreatingEducation}
            />
          )}
          {activeTab === "activity" && <ActivityTab />}
          {activeTab === "network" && <NetworkTab />}
        </div>
      </div>
    </>
  );
}
