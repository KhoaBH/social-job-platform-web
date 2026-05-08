"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { navLinks } from "../../data/mockData";
import { ROUTES } from "@/constants/routes";
import { Search } from "lucide-react";
import { FriendRequest } from "../../types";
import {
  useAcceptRequestMutation,
  useFriendRequestQuery,
  useRejectRequestMutation,
} from "../../dashboardApi";

interface NavbarProps {
  activeNav: number;
  setActiveNav: (i: number) => void;
  initials: (name: string) => string;
}

export default function Navbar({
  activeNav,
  setActiveNav,
  initials,
}: NavbarProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [processingRequestId, setProcessingRequestId] = useState<string | null>(
    null,
  );
  const [displayedRequests, setDisplayedRequests] = useState<FriendRequest[]>(
    [],
  );
  const { data: requests, isLoading, isError } = useFriendRequestQuery();
  const [acceptRequest, { isLoading: isAccepting }] =
    useAcceptRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] =
    useRejectRequestMutation();
  useEffect(() => {
    if (!isLoading && !isError && requests) {
      console.log("Friend requests:", requests);
    } else if (isError) {
      console.error("Failed to fetch friend requests");
    }
  }, [requests, isLoading, isError]);
  useEffect(() => {
    if (!requests) {
      return;
    }

    setDisplayedRequests((currentRequests) => {
      const currentById = new Map(
        currentRequests.map((request) => [request.connectionId, request]),
      );

      const mergedRequests = requests.map((request) => {
        const existingRequest = currentById.get(request.connectionId);

        return existingRequest ?? request;
      });

      const preservedRequests = currentRequests.filter(
        (request) =>
          !requests.some(
            (serverRequest) =>
              serverRequest.connectionId === request.connectionId,
          ),
      );

      return [...mergedRequests, ...preservedRequests];
    });
  }, [requests]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleAcceptRequest = async (requestId: string) => {
    setProcessingRequestId(requestId);
    try {
      await acceptRequest(requestId).unwrap();
      setDisplayedRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.connectionId === requestId
            ? { ...request, status: "ACCEPTED" }
            : request,
        ),
      );
    } catch (error) {
      console.error("Failed to accept request:", error);
    } finally {
      setProcessingRequestId(null);
    }
  };
  const handleRejectRequest = async (requestId: string) => {
    setProcessingRequestId(requestId);
    try {
      await rejectRequest(requestId).unwrap();
      setDisplayedRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.connectionId === requestId
            ? { ...request, status: "REJECTED" }
            : request,
        ),
      );
    } catch (error) {
      console.error("Failed to reject request:", error);
    } finally {
      setProcessingRequestId(null);
    }
  };
  const handleNavClick = (index: number) => {
    setActiveNav(index);
    if (index === 4) {
      setIsNotificationOpen((current) => !current);
      return;
    }

    setIsNotificationOpen(false);
    if (index === 0) {
      router.push(ROUTES.PROTECTED.DASHBOARD);
    } else if (index === 1) {
      router.push(ROUTES.PROTECTED.JOBS);
    }
  };

  const handleFriendRequestAction = () => {
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push(ROUTES.PUBLIC.LOGIN);
  };

  return (
    <nav className="bg-white border-b border-[#E4E4E7] sticky top-0 z-100 h-14 flex items-center px-4">
      <div className="max-w-282 w-full mx-auto flex items-center gap-0">
        {/* Logo */}
        <button
          onClick={() => router.push(ROUTES.PROTECTED.DASHBOARD)}
          className="text-[22px] font-bold text-[#0A66C2] tracking-[-0.5px] mr-3 bg-transparent border-none cursor-pointer"
          aria-label="Go to dashboard"
        >
          jub.
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#EEF3F8] rounded-md px-3 h-8.5 w-55 shrink-0">
          <Search size={16} />
          <input
            className="bg-transparent border-none outline-none font-[inherit] text-[13.5px]
                       text-[#1A1A1A] w-full placeholder:text-[#888]"
            placeholder="Tìm kiếm..."
          />
        </div>

        {/* Nav links */}
        <div className="flex items-center ml-auto gap-1">
          {navLinks.map((nl, i) => {
            const Icon = nl.icon;

            if (i === 4) {
              return (
                <div key={nl.label} ref={notificationRef} className="relative">
                  <button
                    onClick={() => handleNavClick(i)}
                    className={`flex flex-col items-center gap-0.5 px-4 h-14 justify-center
                          text-[11.5px] cursor-pointer border-none border-b-2 bg-transparent
                          font-[inherit] font-medium transition-all duration-150
                          ${
                            activeNav === i || isNotificationOpen
                              ? "text-[#111827] border-[#111827]"
                              : "text-[#4B5563] border-transparent hover:text-[#111827]"
                          }`}
                  >
                    <span className="leading-none text-[18px]">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <span>{nl.label}</span>
                  </button>

                  {isNotificationOpen ? (
                    <div className="absolute right-0 top-[58px] z-50 w-80 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                      <div className="border-b border-[#EEF0F3] px-4 py-3">
                        <p className="text-[13px] font-semibold text-[#111827]">
                          Lời mời kết bạn
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#6B7280]">
                          Các đề xuất kết nối mới của bạn
                        </p>
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {displayedRequests.map((request) => (
                          <div
                            key={request.connectionId}
                            className="border-b border-[#F3F4F6] px-4 py-3 last:border-b-0"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-[12px] font-bold text-white">
                                {initials(request.senderName)}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-semibold text-[#111827]">
                                  {request.senderName}
                                </p>
                                <p className="mt-0.5 text-[12px] text-[#6B7280]">
                                  {request.mutualFriendsCount} bạn chung
                                </p>
                              </div>

                              <div className="ml-auto shrink-0 self-center">
                                {request.status !== "PENDING" ? (
                                  <span className="text-[12px] font-medium text-[#374151]">
                                    {request.status === "ACCEPTED"
                                      ? "Đã kết bạn"
                                      : "Đã từ chối"}
                                  </span>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={handleAcceptRequest.bind(
                                        null,
                                        request.connectionId,
                                      )}
                                      disabled={
                                        processingRequestId ===
                                        request.connectionId
                                      }
                                      className="rounded-full bg-[#10B981] px-3.5 py-1.5 text-[12px] font-semibold text-white transition-all hover:bg-[#059669] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed flex items-center gap-1.5"
                                    >
                                      {processingRequestId ===
                                      request.connectionId ? (
                                        <>
                                          <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                          <span>Đang xử lý...</span>
                                        </>
                                      ) : (
                                        "Đồng ý"
                                      )}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleRejectRequest.bind(
                                        null,
                                        request.connectionId,
                                      )}
                                      disabled={
                                        processingRequestId ===
                                        request.connectionId
                                      }
                                      className="rounded-full border border-[#D1D5DB] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#374151] transition-all hover:bg-[#F9FAFB] hover:border-[#9CA3AF] disabled:bg-[#F3F4F6] disabled:cursor-not-allowed flex items-center gap-1.5"
                                    >
                                      {processingRequestId ===
                                      request.connectionId ? (
                                        <>
                                          <span className="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                                          <span>Đang xử lý...</span>
                                        </>
                                      ) : (
                                        "Từ chối"
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <button
                key={i}
                onClick={() => handleNavClick(i)}
                className={`flex flex-col items-center gap-0.5 px-4 h-14 justify-center
                          text-[11.5px] cursor-pointer border-none border-b-2 bg-transparent
                          font-[inherit] font-medium transition-all duration-150
                          ${
                            activeNav === i
                              ? "text-[#111827] border-[#111827]"
                              : "text-[#4B5563] border-transparent hover:text-[#111827]"
                          }`}
              >
                <span className="leading-none text-[18px]">
                  <Icon size={17} strokeWidth={1.8} />
                </span>
                <span>{nl.label}</span>
              </button>
            );
          })}

          {/* Avatar → profile link */}
          <Link
            href={user?.id ? ROUTES.PROTECTED.PROFILE.VIEW(user.id) : "#"}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-[#0A66C2]
                       cursor-pointer shrink-0 ml-2 no-underline"
          >
            {initials(user?.fullName || "U")}
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="ml-2 px-3.5 py-1.5 text-[12.5px] font-semibold text-[#666]
                       border-[1.5px] border-[#C9CDD2] rounded-2xl bg-transparent
                       cursor-pointer font-[inherit] transition-all duration-150
                       hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
}
