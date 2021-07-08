const BASE_URL =
  process.env.NEXT_PUBLIC_AWS_ENDPOINT ||
  "https://zqf7j796y5.execute-api.eu-west-2.amazonaws.com/staging/api";
const AWS_KEY = process.env.NEXT_PUBLIC_AWS_KEY;
const AUTH_HEADER = { "x-api-key": AWS_KEY };

export { BASE_URL, AUTH_HEADER };
