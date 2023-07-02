import useSWR from "swr";
import { z } from "zod";

/*
    GENERATE RANDOM EMAIL EVERYTIME FOCUS ON THE PAGE
*/
const names = [
  "Jill",
  "James",
  "Jenny",
  "Jesse",
  "Jasmine",
  "Amanda",
  "Alex",
  "Bryan",
  "Brenda",
  "Cindy",
  "Cody",
  "Hannah",
];
const generateRandomEmail = () => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  return `${randomName}@testmail.com`;
};

export const useGetRandomEmail = () => {
  const { data, error, isLoading } = useSWR(
    `get-random-email`,
    (key) => {
      const email = generateRandomEmail();
      return email;
    },
    {
      revalidateOnFocus: true,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useGetRandomEmail;
