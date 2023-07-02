import { useRouter } from "next/router";
import useSWR from "swr";
import { z } from "zod";

export const useGetUser = () => {
  const router = useRouter();
  const { email } = router.query;

  const { data, error, isLoading } = useSWR(
    `/api/feedback/get-user?email=${email}`,
    async (url) => {
      const data = await fetch(url).then((res) => res.json());

      console.log(" user ", data);
      return data;
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetUser;
