import axiosInstance from "@/utils/axios";

export const apiGetCompanies = async (params) => {
  return axiosInstance(
    {
        method: 'GET',
        url: '/companies',
        params
    }
  )
};

export const apiGetCompanyDetail = async (id) => {
  return axiosInstance(
    {
        method: 'GET',
        url: `/companies/${id}`
    }
  )
}