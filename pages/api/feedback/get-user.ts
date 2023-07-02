/*
  NEXT
*/
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { z } from "zod";

// import { getFeedbackByUser } from "@/lib/feedback";

import sleep from "@/lib/sleep";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  const { email } = req.query;

  try {
    // SLEEP FOR 1 SECOND
    await sleep(1000);

    const emailParams = z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email" })
      .parse(email as string);

    /*
        VALIDATE THE USER EXIST ON THE SYSTEM...
      */

    // RETURN USER EMAIL
    return res.status(200).json({ email: emailParams });
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
