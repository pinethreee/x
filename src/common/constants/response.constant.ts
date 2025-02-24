export const ResponseMessage = {
  SUCCESS: 'Success',
  NOT_FOUND: 'Not Found',
  UNAUTHORIZED: 'Unauthorized',
  BAD_REQUEST: 'Bad Request',
  UNKNOWN_ERROR: 'Unknown error',
} as const;

export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
} as const;
