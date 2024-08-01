export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500
  ) {
    super();
  }
}
