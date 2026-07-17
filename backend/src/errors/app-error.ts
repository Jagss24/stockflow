class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
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
