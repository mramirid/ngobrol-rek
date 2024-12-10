export default class UnimplementedError extends Error {
  constructor(message = "It is unimplemented") {
    super(message);
  }
}
