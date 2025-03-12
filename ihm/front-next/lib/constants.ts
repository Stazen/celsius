export const BackendUrl =
  process.env.NODE_ENV === "production"
    ? "http://ihm-back:8000/v1"
    : "http://localhost:8000/v1";

export const FrontendUrl =
  process.env.NODE_ENV === "production"
    ? "http://celsius.ovh/"
    : "http://localhost:3000/";
