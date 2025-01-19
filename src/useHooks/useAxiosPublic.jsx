import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-12-two.vercel.app",
  // baseURL: "http://localhost:5050",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
