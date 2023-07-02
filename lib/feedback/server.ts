import { Feedback, feedbackSchema } from "./schema";

/*
    FEEDBACK IN MEMORY DATABASE
*/
const feedback: Feedback[] = [];

/*
    FEEDBACK CONTROLLER
*/

export const createFeedback = (data: Feedback) => {
  feedback.push(data);
  return data;
};

export const getAllFeedback = () => {
  return feedback;
};

export const getFeedbackByUser = (email: string) => {
  return feedback.filter((item) => item.email === email);
};