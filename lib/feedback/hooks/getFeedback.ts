import useSWR from "swr";

import { feedbacksSchema } from "../schema";

interface FeedbackQuery {
  email?: string | undefined;
}
const useGetFeedback = (options?: FeedbackQuery) => {
  const { data, error, isLoading } = useSWR(
    `/api/admin/feedback?${options?.email ? `email=${options.email}` : ""}`,
    async (url) => fetch(url).then((res) => feedbacksSchema.parse(res.json()))
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetFeedback;
