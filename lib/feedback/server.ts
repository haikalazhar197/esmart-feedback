import { Feedback, feedbackSchema } from "./schema";

/*
  FEEDBACK CHOICES
*/
 const FEEDBACK_CHOICES: {
  label: string;
  feedback: "terrible" | "okay" | "awesome";
  choices: string[];
}[] = [
  {
    label: "😭",
    feedback: "terrible",
    choices: [
      "I don't like it",
      "It's not useful",
      "It's confusing",
      "It's not relevant to me",
      "Other",
    ],
  },
  {
    label: "😕",
    feedback: "okay",
    choices: [
      "I felt bored a few times",
      "I can only understand some parts",
      "I can only do some of the activities",
      "I wish to interact more with my tutor",
      "I wish to interact more with my classmates",
      "Other",
    ],
  },
  {
    label: "😍",
    feedback: "awesome",
    choices: [
      "I did not feel bored at all",
      "I understood almost everything",
      "I can do all the activities",
      "I enjoyed interacting with my tutor",
      "I enjoyed interacting with my classmates",
      "Other",
    ],
  },
];

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

export const getFeedbackChoices = () => {
  return FEEDBACK_CHOICES;
}