export async function handleResponse(response) {
  if (response.status === 200) return response.data;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation supplier-returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

// Maybe call error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error(`API call failed. ${error}`);
  throw error;
}
