export function conflict(error: Error) {
  return {
    status: 409,
    message: error.message,
  };
}

export function unauthorized(error: Error) {
  return {
    status: 401,
    message: error.message,
  };
}
