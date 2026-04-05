"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useSendConnectionRequestMutation } from "@/features/dashboard/dashboardApi";
import {
  useCreateUserSkillMutation,
  useCreateEducationMutation,
  useCreateWorkExperienceMutation,
  useUpdateWorkExperienceMutation,
  useDeleteWorkExperienceMutation,
  useGetCompaniesQuery,
  useGetEducationsByUserQuery,
  useGetFieldOfStudiesQuery,
  useGetMyConnectionsQuery,
  useGetMyFollowersQuery,
  useGetSchoolsQuery,
  useGetSkillsQuery,
  useGetUserSkillsQuery,
  useGetUserByIdQuery,
  useGetWorkExperiencesByUserQuery,
} from "../profileApi";
import {
  CreateUserSkillPayload,
  ConnectionRelationshipState,
  ProfileEducationView,
  ProfileExperienceView,
  ProfileSkillView,
  ProfileUserView,
  SkillOptionView,
  Tab,
} from "../types";
import { normalizeSkillLevel, randomSoftColorFromString, toMonthYear } from "../profile.utils";
import { ExperienceFormData } from "./models/AddExperienceModal/types";
import { EducationFormData } from "./models/AddEducationModal/types";
import AddExperienceModal from "./models/AddExperienceModal";
import ProfileHero from "./ProfileHero";
import ProfileTabBar from "./ProfileTabBar";
import OverviewTab from "./tabs/OverviewTab";
import ProfileSkillsTab from "./tabs/ProfileSkillsTab";
import ActivityTab from "./tabs/ActivityTab";
import NetworkTab from "./tabs/NetworkTab";

export default function ProfileLayout() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [locallySentConnectionIds, setLocallySentConnectionIds] = useState<
    string[]
  >([]);
  const [addExpOpen, setAddExpOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<ProfileExperienceView | null>(null);
  const params = useParams<{ userId: string }>();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const routeUserId = typeof params.userId === "string" ? params.userId : "";
  const targetUserId = routeUserId || authUser?.id || "";
  const isOwner = Boolean(authUser?.id && authUser.id === targetUserId);
  const [sendConnectionRequest, { isLoading: isSendingConnectionRequest }] =
    useSendConnectionRequestMutation();

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
  const { data: skills = [] } = useGetSkillsQuery();
  const { data: userSkills = [], refetch: refetchUserSkills } =
    useGetUserSkillsQuery(targetUserId, {
      skip: !targetUserId,
    });

  const { data: myFollowers = [] } = useGetMyFollowersQuery(undefined, {
    skip: !isOwner,
  });

  const { data: myConnections = [] } = useGetMyConnectionsQuery(undefined, {
    skip: !authUser?.id,
  });

  const [createWorkExperience, { isLoading: isCreatingExperience }] =
    useCreateWorkExperienceMutation();
  const [updateWorkExperience, { isLoading: isUpdatingExperience }] =
    useUpdateWorkExperienceMutation();
  const [deleteWorkExperience, { isLoading: isDeletingExperience }] =
    useDeleteWorkExperienceMutation();
  const [createEducation, { isLoading: isCreatingEducation }] =
    useCreateEducationMutation();
  const [createUserSkill, { isLoading: isCreatingUserSkill }] =
    useCreateUserSkillMutation();

  const currentConnectionState: ConnectionRelationshipState = useMemo(() => {
    if (!authUser?.id || !targetUserId || authUser.id === targetUserId) {
      return "none";
    }

    const outgoingConnection = myConnections.find(
      (connection) =>
        connection.requester?.id === authUser.id &&
        connection.addressee?.id === targetUserId,
    );
    const incomingConnection = myConnections.find(
      (connection) =>
        connection.requester?.id === targetUserId &&
        connection.addressee?.id === authUser.id,
    );

    if (
      outgoingConnection?.status === "ACCEPTED" ||
      incomingConnection?.status === "ACCEPTED"
    ) {
      return "friends";
    }

    if (outgoingConnection?.status === "PENDING") {
      return "pending_sent";
    }

    if (incomingConnection?.status === "PENDING") {
      return "pending_received";
    }

    if (locallySentConnectionIds.includes(targetUserId)) {
      return "pending_sent";
    }

    return "none";
  }, [authUser?.id, locallySentConnectionIds, myConnections, targetUserId]);

  const acceptedConnectionsCount = useMemo(
    () =>
      myConnections.filter((connection) => connection.status === "ACCEPTED")
        .length,
    [myConnections],
  );

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
        "Chưa có phần giới thiệu. Hãy cập nhật hồ sơ để tăng khả năng kết bạn.",
      isOwner,
      connections: isOwner ? acceptedConnectionsCount : 0,
      followers: myFollowers.length,
      openToWork: isOwner,
    };
  }, [
    authUser,
    acceptedConnectionsCount,
    isOwner,
    myFollowers.length,
    targetUserId,
    userData,
  ]);

  const handleSendConnectionRequest = async () => {
    if (!authUser?.id || !targetUserId || isOwner) {
      return;
    }

    if (currentConnectionState !== "none") {
      return;
    }

    try {
      await sendConnectionRequest({ addresseeId: targetUserId }).unwrap();
      setLocallySentConnectionIds((prev) =>
        prev.includes(targetUserId) ? prev : [...prev, targetUserId],
      );
    } catch {
      // Keep silent for now; can be replaced with a toast later.
    }
  };

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

  const availableSkillOptions: SkillOptionView[] = useMemo(
    () =>
      skills
        .filter((skill) => Boolean(skill.id) && Boolean(skill.name))
        .map((skill) => ({
          id: skill.id,
          name: skill.name || "",
          category: skill.category?.name || "Khác",
        })),
    [skills],
  );

  const skillViews: ProfileSkillView[] = useMemo(
    () =>
      userSkills
        .filter((item) => Boolean(item.id) && Boolean(item.skill?.id))
        .map((item) => ({
          id: item.id,
          skillId: item.skill?.id || "",
          name: item.skill?.name || "Kỹ năng",
          category: item.skill?.category?.name || "Khác",
          level: normalizeSkillLevel(item.level),
        })),
    [userSkills],
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

    const payload = {
      companyId: form.companyId,
      companyName: form.company,
      jobTitle: form.title,
      startDate,
      endDate,
      description: form.description,
    };

    // Nếu đang edit, gọi update API, nếu không thì create
    if (editingExperience?.id) {
      await updateWorkExperience({
        id: editingExperience.id,
        body: payload,
      }).unwrap();
    } else {
      await createWorkExperience(payload).unwrap();
    }

    await refetchExperiences();
    setAddExpOpen(false);
    setEditingExperience(null);
  };

  const handleEditExperience = (exp: ProfileExperienceView) => {
    setEditingExperience(exp);
    setAddExpOpen(true);
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

  const handleCreateUserSkill = async (payload: CreateUserSkillPayload) => {
    if (!isOwner) {
      return;
    }

    await createUserSkill(payload).unwrap();
    await refetchUserSkills();
  };

  const handleDeleteExperience = async (id: string) => {
    if (!isOwner) {
      return;
    }

    await deleteWorkExperience(id).unwrap();
    await refetchExperiences();
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
            connectionState={currentConnectionState}
            isSendingConnectionRequest={isSendingConnectionRequest}
            onSendConnectionRequest={
              authUser?.id && !isOwner ? handleSendConnectionRequest : undefined
            }
          />
          <ProfileTabBar active={activeTab} onChange={setActiveTab} />

          {activeTab === "overview" && (
            <OverviewTab
              onTabChange={setActiveTab}
              user={profileUser}
              experiences={experienceViews}
              educations={educationViews}
              skills={skillViews}
              allSkills={availableSkillOptions}
              companies={companies}
              schools={schools}
              fieldOfStudies={fieldOfStudies}
              onCreateExperience={handleCreateExperience}
              isCreatingExperience={isCreatingExperience}
              onCreateEducation={handleCreateEducation}
              isCreatingEducation={isCreatingEducation}
              onCreateUserSkill={handleCreateUserSkill}
              isCreatingUserSkill={isCreatingUserSkill}
              onEditExperience={handleEditExperience}
            />
          )}
          {activeTab === "profile" && (
            <ProfileSkillsTab
              user={profileUser}
              experiences={experienceViews}
              educations={educationViews}
              skills={skillViews}
              allSkills={availableSkillOptions}
              companies={companies}
              schools={schools}
              fieldOfStudies={fieldOfStudies}
              onCreateExperience={handleCreateExperience}
              isCreatingExperience={isCreatingExperience}
              onCreateEducation={handleCreateEducation}
              isCreatingEducation={isCreatingEducation}
              onCreateUserSkill={handleCreateUserSkill}
              isCreatingUserSkill={isCreatingUserSkill}
              onEditExperience={handleEditExperience}
            />
          )}
          {activeTab === "activity" && <ActivityTab />}
          {activeTab === "network" && <NetworkTab />}
        </div>
      </div>

      <AddExperienceModal
        open={addExpOpen}
        onClose={() => {
          setAddExpOpen(false);
          setEditingExperience(null);
        }}
        companies={companies}
        isSaving={isCreatingExperience || isUpdatingExperience}
        isDeleting={isDeletingExperience}
        onSave={handleCreateExperience}
        onDelete={handleDeleteExperience}
        initialData={
          editingExperience
            ? {
                id: editingExperience.id,
                startDate: editingExperience.startDate,
                endDate: editingExperience.endDate,
                jobTitle: editingExperience.title,
                companyName: editingExperience.company,
                description: editingExperience.description,
              }
            : undefined
        }
      />
    </>
  );
}
