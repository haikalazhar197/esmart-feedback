/*
  NEXT
*/
import type { NextComponentWithLayoutType } from "next";
import Head from "next/head";

/*
COMPONENTS
*/
import { Check, CircleCheck } from "tabler-icons-react";

const Home: NextComponentWithLayoutType = () => {
  return (
    <>
      <Head>
        <title>eSmart | Feeedback submitted</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" container flex w-full flex-1 flex-col items-center justify-start md:px-20 px-5 text-center">
        <div className="py-12 space-y-5">
          <h1 className="text-4xl font-bold">Feedback Submitted</h1>
          <p className="max-w-4xl text-xl font-semibold text-gray-600">
            Thank you for your feedback.
          </p>
        </div>

        <div className="flex items-center justify-center w-full py-10">
          <CircleCheck color="#16a34a" size={100} strokeWidth={1.5} />
        </div>
      </main>

      <footer className="flex w-full items-center justify-center border-t py-4 mt-6">
        <p className="text-sm text-gray-500">© 2023 eSmart Solutions Sdn Bhd</p>
      </footer>
    </>
  );
};

export default Home;
