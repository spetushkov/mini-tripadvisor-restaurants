export class FormItemMessage {
  static isString = (): string => {
    return `Should be a string`;
  };

  static isNotEmpty = (): string => {
    return `Should not be empty`;
  };

  static isEmail = (): string => {
    return `Should be an email`;
  };

  static passwordMinLength = (constraint1: string): string => {
    return `Should be at least ${constraint1} characters long`;
  };
}
