import { useRouter } from "next/router";
import useSWR from "swr";
import { z } from "zod";

export const useGetUser = () => {
  const router = useRouter();
  const { email } = router.query;

  const { data, error, isLoading } = useSWR(
    `get-user-email-${email}`,
    async (url) => {
      if (!z.string().email().safeParse(email)) return null;

      const data = await fetch(`/api/feedback/get-user?email=${email}`).then(
        (res) => res.json()
      );

      const { email: userEmail } = z
        .object({
          email: z.string().email(),
        })
        .parse(data);

      console.log(" user ", userEmail);
      return userEmail;
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetUser;
