const BASE_URL = process.env.NEXT_PUBLIC_AWS_ENDPOINT;
const AWS_KEY = process.env.NEXT_PUBLIC_AWS_KEY;
const AUTH_HEADER = { "x-api-key": AWS_KEY };

export { BASE_URL, AUTH_HEADER };
