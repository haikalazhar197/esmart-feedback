/*
  NEXT
*/
import type { NextComponentWithLayoutType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

/*
  REACT
*/
import { Fragment, useRef, useState } from "react";

/*
  COMPONENTS
*/
import { Loader } from "@/components/Loader";
import { MoodConfuzed, MoodSad, MoodHappy } from "tabler-icons-react";

/*
  LIB
*/
import keys from "@/lib/keys";
import { useGetUser, useSubmitfeedback } from "@/lib/feedback/client";
import { Dialog, Transition } from "@headlessui/react";

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

  const focusRef = useRef<HTMLHeadingElement | null>(null);

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
        <section className=" mx-auto">
          <Transition appear show={true} as={Fragment}>
            <Dialog
              initialFocus={focusRef}
              as="div"
              className="relative z-10"
              onClose={() => console.log("CLosing modal")}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-start justify-center px-4 py-20 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                      <div className="mt-2">
                        <div className=" space-y-5">
                          <h1 className="text-4xl font-bold" ref={focusRef}>
                            How was your experience with eSmart?
                          </h1>
                          <p className="max-w-4xl text-xl font-semibold text-gray-600">
                            Your feedback will help us improve our services.
                          </p>
                        </div>

                        {/* FEEDBACK CHOICE */}
                        <div className="flex justify-center gap-3 p-1 mt-4">
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
                                {feedbackChoices[selected]?.choices.map(
                                  (choice, i) => (
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
                                        className=" w-full rounded-md p-3 hover:bg-gray-100 text-left focus:outline-none focus:ring-0"
                                      >
                                        <h3 className="text-sm font-medium leading-5">
                                          {choice}
                                        </h3>
                                      </button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </section>
      </main>

      <footer className="flex w-full items-center justify-center border-t py-4 mt-6">
        <p className="text-sm text-gray-500">© 2023 eSmart Solutions Sdn Bhd</p>
      </footer>
    </>
  );
};

export default Home;
