export const isEmail = (v) => /\S+@\S+\.\S+/.test(v);
export const minLen = (v, n) => v && v.length >= n;
