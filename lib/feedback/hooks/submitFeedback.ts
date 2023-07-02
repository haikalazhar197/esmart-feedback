import { useState } from "react";

import { Feedback, feedbackSchema } from "../schema";

interface FeedbackMutationOptions {
  onSuccess?: (data: Feedback) => void;
}
const useSubmitfeedback = (options?: FeedbackMutationOptions) => {
  const [isLoading, setIsLoading] = useState(false);

  const [results, setResults] = useState<Feedback | null>(null);

  const [isError, setIsError] = useState(false);

  const _submitFeedback = async (data: Feedback) => {
    setIsLoading(true);
    setIsError(false);
    setResults(null);
    try {
      const response = await fetch("/api/feedback/submit", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      const results = feedbackSchema.parse(response.feedback);

      options?.onSuccess?.(results);

      setResults(results);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate: _submitFeedback,
    isLoading,
    isError,
    data: results,
  };
};

export default useSubmitfeedback;
