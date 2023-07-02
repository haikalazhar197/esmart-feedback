import { useGetUser, useSubmitfeedback } from "@/lib/feedback/client";
import type { NextComponentWithLayoutType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextComponentWithLayoutType = () => {

  const router = useRouter();

  const {} = useGetUser();

  const { mutate, isLoading, data } = useSubmitfeedback({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <Head>
        <title>eSmart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" container flex w-full flex-1 flex-col items-center justify-start space-y-11 px-20 pt-44 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#F43F5E] to-[#F97316] bg-clip-text text-transparent">
            eSmart
          </span>
        </h1>
        <p className="max-w-4xl text-2xl font-semibold text-gray-600">
          <span className=" bg-gradient-to-r from-blue-500 to-[#F97316] bg-clip-text font-bold text-transparent">
            eSmart
          </span>{" "}
          is a learning platform that helps you to learn and practice through
          the use of exercises and quizes.
        </p>

        <button
          disabled={isLoading}
          onClick={() => {
            mutate({
              email: "haikalazhar197@gmail.com",
              feedback: "okay",
              comment: "This is okay je",
            });
          }}
          className="flex items-center gap-2 rounded-md bg-[#F43F5E] px-8 py-3 font-semibold text-white"
        >
          {isLoading ? "...loading" : "Give Feedback"}
        </button>
      </main>

      <footer className="flex w-full items-center justify-center border-t py-4">
        <p className="text-sm text-gray-500">© 2023 eSmart Solutions Sdn Bhd</p>
      </footer>
    </>
  );
};

export default Home;
