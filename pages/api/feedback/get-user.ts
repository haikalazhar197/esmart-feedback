/*
  NEXT
*/
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { z } from "zod";

// import { getFeedbackByUser } from "@/lib/feedback";

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
  const { email } = req.query;

  console.log("The email", email);

  //   const session = await getServerSession(req, res, authOptions);

  //   if (!session) {
  //     return res.status(401).json({ message: "Unauthorized", code: "401" });
  //   }

  try {
    // SLEEP FOR 2 SECOND
    await sleep(2000);

    const emailParams = z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email" })
      .parse(email as string);

    console.log("The emailParams", emailParams);

    // GET FEEDBACK BY USER -- JUST TO ENSURE THE IN MEMORY DATABASE IS WORKING
    // const feedback = getFeedbackByUser(emailParams);

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
