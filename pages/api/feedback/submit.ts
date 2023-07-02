/*
  NEXT
*/
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

/*
    FEEDBACK
*/
import { Feedback, feedbackSchema } from "@/lib/feedback/schema";
import { createFeedback } from "@/lib/feedback/server";

/*
  AUTH
*/
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

// FUNCTION TO SPLEEP
const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const data = req.body;

  //   const session = await getServerSession(req, res, authOptions);

  //   if (!session) {
  //     return res.status(401).json({ message: "Unauthorized", code: "401" });
  //   }

  try {
    // SLEEP FOR 2 SECOND
    await sleep(2000);

    const feedback = feedbackSchema.parse(data);

    // CREATE FEEDBACK
    const newFeedback = createFeedback(feedback);

    // RETURN FEEDBACK
    return res.status(200).json({ feedback: newFeedback });
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
