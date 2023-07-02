import { Feedback, feedbackSchema } from "./schema";

/*
    FEEDBACK IN MEMORY DATABASE
*/
const feedback: Feedback[] = [];

/*
    FEEDBACK CONTROLLER
*/

export const createFeedback = (data: Feedback) => {
  const newFeedback = feedbackSchema.parse(data);
  feedback.push(newFeedback);
  return newFeedback;
};

export const getAllFeedback = () => {
  return feedback;
};

export const getFeedbackByUser = (email: string) => {
  return feedback.filter((item) => item.email === email);
};