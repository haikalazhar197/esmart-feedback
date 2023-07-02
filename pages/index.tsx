import { Loader } from "@/components/Loader";
import { useGetUser, useSubmitfeedback } from "@/lib/feedback/client";
import keys from "@/lib/keys";
import { Tab } from "@headlessui/react";
import type { NextComponentWithLayoutType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { MoodConfuzed, MoodSad, MoodHappy } from "tabler-icons-react";

/*
  FEEDBACK CHOICES
*/
interface FeedbackChoice {
  label?: string;
  icon?: React.ReactNode;
  feedback: "terrible" | "okay" | "awesome";
  choices: string[];
}

type FeedbackRecord = Record<"terrible" | "okay" | "awesome", FeedbackChoice>;

const feedbackChoices: FeedbackRecord = {
  terrible: {
    label: "Terrible",
    icon: <MoodSad color="red" size={52} />,
    feedback: "terrible",
    choices: [
      "I don't like it",
      "It's not useful",
      "It's confusing",
      "It's not relevant to me",
      "Other",
    ],
  },
  okay: {
    label: "Okay",
    icon: <MoodConfuzed color="blue" size={52} />,
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
  awesome: {
    label: "Awesome!",
    icon: <MoodHappy color="green" size={52} />,
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
};

const Home: NextComponentWithLayoutType = () => {
  const router = useRouter();

  const { data: userEmail, isLoading: userEmailLoading } = useGetUser();

  const { mutate, isLoading, data } = useSubmitfeedback({
    onSuccess: (data) => {
      router.push("/submitted");
    },
  });

  const [selected, setSelected] = useState<keyof FeedbackRecord>();

  if (userEmailLoading) {
    return (
      <>
        <Head>
          <title>eSmart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className=" container flex w-full flex-1 flex-col items-center justify-center space-y-11 px-20 text-center">
          <Loader color="black" />
        </main>
      </>
    );
  }

  if (!userEmail)
    return (
      <>
        <Head>
          <title>eSmart | No data</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className=" container flex w-full flex-1 flex-col items-center justify-center space-y-11 px-20 text-center">
          <p className="text-3xl font-semibold text-gray-600">No Data!</p>
        </main>
      </>
    );

  return (
    <>
      <Head>
        <title>eSmart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" container flex w-full flex-1 flex-col items-center justify-start md:px-20 px-5 text-center">
        <div className="py-12 space-y-5">
          <h1 className="text-4xl font-bold">
            How was your experience with eSmart?
          </h1>
          <p className="max-w-4xl text-xl font-semibold text-gray-600">
            Your feedback will help us improve our services.
          </p>
        </div>

        <section className=" mx-auto">
          {/* FEEDBACK CHOICE */}
          <div className="flex justify-center gap-3 p-1">
            {keys(feedbackChoices).map((feedback) => (
              <button
                onClick={() => setSelected(feedback)}
                key={feedback}
                className={`flex flex-col items-center justify-center gap-2 py-2 px-5 md:px-10 rounded-md hover:bg-gray-100 ${
                  feedback === selected && "bg-gray-100 shadow"
                }`}
              >
                {feedbackChoices[feedback].icon}
                <p className="text-sm font-medium leading-5">
                  {feedbackChoices[feedback].label}
                </p>
              </button>
            ))}
          </div>

          {/* REASONS */}
          {selected && (
            <div className="mt-6 ">
              <h2 className="text-xl font-semibold text-gray-600">
                Can you tell us why?
              </h2>
              <div className="relative rounded-md shadow-md border border-gray-100 mt-2">
                {/* LOADING INDICATOR */}
                {isLoading && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
                    <Loader color="gray" />
                  </div>
                )}

                <ul className="flex flex-col gap-1 p-3 ">
                  {feedbackChoices[selected]?.choices.map((choice, i) => (
                    <li key={i}>
                      <button
                        disabled={isLoading}
                        onClick={() => {
                          mutate({
                            email: userEmail,
                            feedback: selected,
                            comment: choice,
                          });
                        }}
                        className=" w-full rounded-md p-3 hover:bg-gray-100 text-left"
                      >
                        <h3 className="text-sm font-medium leading-5">
                          {choice}
                        </h3>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="flex w-full items-center justify-center border-t py-4 mt-6">
        <p className="text-sm text-gray-500">© 2023 eSmart Solutions Sdn Bhd</p>
      </footer>
    </>
  );
};

export default Home;
