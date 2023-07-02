import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getAllFeedback } from "./lib/feedback/server";


export function middleware(request: NextRequest) {
  // INITIALIZE FEEDBACK
  const feedback = getAllFeedback();

  return NextResponse.next();
}
