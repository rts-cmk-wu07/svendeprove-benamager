import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Brugernavn er påkrævet"),
  password: Yup.string()
    .required("Adgangskode er påkrævet"),
});