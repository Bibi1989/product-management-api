import { UserInterface, LoginInterface } from "../interfaces/userInterface";

export const validateUserRegister = (value: UserInterface) => {
  const { first_name, last_name, email, phone, password } = value;
  const error: UserInterface | any = {};
  if (!first_name) {
    error.first_name = "First nane field is empty";
  }
  if (!last_name) {
    error.last_name = "Last name field is empty";
  }
  if (!email) {
    error.email = "Email field is empty";
  }
  if (!phone) {
    error.phone = "Phone Number field is empty";
  }
  if (!password) {
    error.password = "Password field is empty";
  }

  return { value, error };
};

export const validateUserLogin = (value: LoginInterface) => {
  const { email, password } = value;
  const error: UserInterface | any = {};
  if (!email) {
    error.email = "Email field is empty";
  }
  if (!password) {
    error.password = "Password field is empty";
  }

  return { value, error };
};
