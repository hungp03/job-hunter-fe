import axiosInstance from "@/utils/axios";

export const apiLogin = async (data) => 
  axiosInstance({
    method: "POST",
    url: "/auth/login",
    data,
  });

export const apiGetCurrentUser = async () =>
  axiosInstance({
    method: "GET",
    url: "/auth/account",
  });

export const apiLogout = async () =>
  axiosInstance({
    method: "POST",
    url: "/auth/logout",
    withCredentials: true,
  });

export const apiGetResumeByCurrentUser = async () =>
  axiosInstance({
    method: "GET",
    url: "/resumes/me",
  });