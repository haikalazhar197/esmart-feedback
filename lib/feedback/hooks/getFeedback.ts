import useSWR from "swr";

import { feedbacksSchema } from "../schema";

interface FeedbackQuery {
  email?: string | undefined;
}
const useGetFeedback = (options?: FeedbackQuery) => {
  const { data, error, isLoading } = useSWR(
    `/api/admin/feedback?${options?.email ? `email=${options.email}` : ""}`,
    async (url) => {
      const data = await fetch(url).then((res) => res.json());

      console.log(data)

      return feedbacksSchema.parse(data);
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetFeedback;
