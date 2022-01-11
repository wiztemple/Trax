import fetcher from "./fetcher";

export const auth = (mode: "signin" | "signup", body: object) => {
  return fetcher(`/${mode}`, body);
};
