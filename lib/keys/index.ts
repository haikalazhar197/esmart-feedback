// RETURN ARRAY OF KEYS FOR AN OBJECT WITH ITS TYPE
const keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

export default keys;