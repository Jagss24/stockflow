type FieldError = {
  field: string;
  message: string;
};

class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: FieldError[],
  ) {
    super(message);
    this.name = "AppError";
  }
}

class ValidationError extends AppError {
  constructor(message: string, errors?: FieldError[]) {
    super(400, message, errors);
    this.name = "ValidationError";
  }
}

class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
    this.name = "ConflictError";
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}

export { AppError, ValidationError, ConflictError, UnauthorizedError };
export type { FieldError };
