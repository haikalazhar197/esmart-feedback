/*
  NEXT
*/
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { z } from "zod";

import { getFeedbackChoices } from "@/lib/feedback/server";

/*
  AUTH
*/
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

// FUNCTION TO SPLEEP
const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {


  try {

    // GET THE FEEDBACK CHOICES
    const feedbackChoices = getFeedbackChoices();
  
    return res.status(200).json({ choices: feedbackChoices });
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