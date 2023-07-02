// RETURN ARRAY OF KEYS FOR AN OBJECT THAT IS TYPESAFE
const keys = <T extends object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

export default keys;