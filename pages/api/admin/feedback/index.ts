/*
  NEXT
*/
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

import { z } from "zod";

/*
    FEEDBACK
*/
import { Feedback, feedbackSchema } from "@/lib/feedback/schema";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackByUser,
} from "@/lib/feedback/server";

/*
  AUTH
*/
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const { email } = req.query;

  //   const session = await getServerSession(req, res, authOptions);

  //   if (!session) {
  //     return res.status(401).json({ message: "Unauthorized", code: "401" });
  //   }

  try {
    if (!email) {
      // GET ALL FEEDBACK
      const feedback = getAllFeedback();

      // RETURN FEEDBACK
      return res.status(200).json({ feedback });
    }

    const emailParams = z
      .string()
      .email({ message: "Invalid email" })
      .parse(email);

    // GET FEEDBACK BY USER
    const feedback = getFeedbackByUser(emailParams);

    // RETURN FEEDBACK
    return res.status(200).json({ feedback });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: String(error), code: "400" });
  }
});

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
