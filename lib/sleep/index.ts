// FUNCTION TO SPLEEP
const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export default sleep;
