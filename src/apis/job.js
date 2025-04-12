import axiosInstance from "@/utils/axios";

export const apiGetJobs = async (params) => 
  axiosInstance(
    {
        method: 'GET',
        url: '/jobs',
        params
    }
  )

export const apiGetJob = async (id) => 
  axiosInstance(
    {
        method: 'GET',
        url: `/jobs/${id}`,
    }
  )