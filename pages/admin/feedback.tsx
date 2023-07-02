import { Loader } from "@/components/Loader";
import { Table } from "@/components/Table";
import {
  useGetFeedback,
  useGetUser,
  useSubmitfeedback,
} from "@/lib/feedback/client";
import keys from "@/lib/keys";
import { Tab } from "@headlessui/react";
import type { NextComponentWithLayoutType } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Home: NextComponentWithLayoutType = () => {
  const router = useRouter();

  const { data, isLoading } = useGetFeedback();

  if (isLoading) {
    return (
      <main className=" container flex w-full flex-1 flex-col items-center justify-center space-y-11 px-20 text-center">
        <Loader />
      </main>
    );
  }

  if (!data)
    return (
      <main className=" container flex w-full flex-1 flex-col items-center justify-center space-y-11 px-20 text-center">
        <p className="text-3xl font-semibold text-gray-600">No Data!</p>
      </main>
    );

  return (
    <>
      <Head>
        <title>eSmart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center justify-between w-full py-4 px-10 border-b border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-600">eSmart</h1>
        </div>

        <div className="flex justify-end">
          <Link
            href="/?email=emart@testmail.com"
            target="_blank"
            className="text-sm font-medium text-gray-600 hover:text-gray-700 bg-gray-100 p-2 rounded-md"
          >
            Go to Demo
          </Link>
        </div>
      </header>

      <main className=" container flex w-full flex-1 flex-col items-center justify-start md:px-20 px-5 text-center">
        <div className="w-full mx-auto max-w-4xl my-6">
          <Table
            data={data}
            columns={[
              {
                title: "User Email",
                dataIndex: "email",
              },
              {
                title: "Feedback",
                dataIndex: "feedback",
              },
              {
                title: "Comment",
                dataIndex: "comment",
              },
            ]}
          />
        </div>
      </main>

      <footer className="flex w-full items-center justify-center border-t py-4 mt-6">
        <p className="text-sm text-gray-500">© 2023 eSmart Solutions Sdn Bhd</p>
      </footer>
    </>
  );
};

export default Home;
