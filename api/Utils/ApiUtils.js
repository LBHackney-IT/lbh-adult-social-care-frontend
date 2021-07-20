export async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) return response.data;
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
  let errorMessage = '';
  if (error.response) {
    // Request made and server responded
    errorMessage = error.response.data.message;
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    throw errorMessage;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = error.request.toString();
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    errorMessage = error.message.toString();
    // eslint-disable-next-line no-console
    // console.error(`API call failed. ${error}`);
  }
  throw errorMessage;
}
