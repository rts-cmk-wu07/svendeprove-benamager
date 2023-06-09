import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string().required('Brugernavn er påkrævet'),
  password: Yup.string().required('Adgangskode er påkrævet'),
  firstname: Yup.string().required('Fornavn er påkrævet'),
  lastname: Yup.string().required('Efternavn er påkrævet'),
  age: Yup.number()
    .required('Alder er påkrævet')
    .min(10, 'Du skal være mindst 10 år gammel')
    .max(100, 'Du kan ikke være ældre end 100 år'),
});
