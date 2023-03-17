import splashImage from "../assets/images/splash-image.jpg"
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { RotatingLines } from "react-loader-spinner"
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../utils/registerValidationSchema"
import useRegister from "../hooks/useRegister";

export default function Register() {
  useDocumentTitle({ title: "Opret bruger" })

  const { handleRegister, loading, error } = useRegister()

  return (
    <div className="grid h-[100dvh] overflow-hidden">
      <img src={splashImage} alt="Image of guy dancing made with splash paint." className="grid-area-1 h-full object-cover" />
      <div className="bg-[#5E2E5350] grid-area-1 w-full h-full scale-[172%] rotate-45"></div>
      <div className="self-center grid-area-1 mx-5 z-10 flex flex-col">
        <h1 className="text-[48px] text-white mb-1 flex gap-3">Opret bruger
          {loading &&
            <RotatingLines
              strokeColor="#E1A1E9"
              strokeWidth="5"
              animationDuration="0.75"
              width="34"
              visible={true}
            />}
        </h1>
        <Formik
          initialValues={{
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            age: "",
            role: "default"
          }}
          validationSchema={registerValidationSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          <Form className="flex flex-col text-base">
            <div className="flex gap-3">
              <div className="w-full mb-3">
                <Field
                  name="firstname"
                  className="bg-white text-black w-full h-[50px] pl-4 outline-none"
                  placeholder="Fornavn"
                />
                <ErrorMessage name="firstname" component="span" className="text-red-500 font-medium tracking-wide" />
              </div>
              <div className="w-full mb-3">
                <Field
                  name="lastname"
                  className="bg-white text-black w-full h-[50px] pl-4 outline-none"
                  placeholder="Efternavn"
                />
                <ErrorMessage name="lastname" component="span" className="text-red-500 font-medium tracking-wide" />
              </div>
            </div>
            <div className="w-full mb-3">
              <Field
                name="username"
                className="bg-white text-black w-full h-[50px] pl-4 outline-none"
                placeholder="Brugernavn"
              />
              <ErrorMessage name="username" component="span" className="text-red-500 font-medium tracking-wide" />
            </div>
            <div className="w-full mb-3">
              <Field
                name="password"
                type="password"
                className="bg-white text-black w-full h-[50px] pl-4 outline-none"
                placeholder="Adgangskode"
              />
              <ErrorMessage name="password" component="span" className="text-red-500 font-medium tracking-wide" />
            </div>
            <div className="w-full mb-3">
              <Field
                name="age"
                className="bg-white text-black w-full h-[50px] pl-4 outline-none"
                placeholder="Alder"
              />
              <ErrorMessage name="age" component="span" className="text-red-500 font-medium tracking-wide" />
            </div>
            <div className="mb-7 self-end text-white w-full">
              <label>
                <Field type="checkbox" name="rememberMe" />
                <span className="ml-3">Husk mig</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary mx-auto max-w-[90%] text-white p-4 text-center rounded-2xl text-base w-full outline-none flex items-center justify-center gap-3">
              <span>Opret nu</span>
              {loading && <RotatingLines
                strokeColor="#EAEAEA"
                strokeWidth="5"
                animationDuration="0.75"
                width="25"
                visible={true}
              />}
            </button>
          </Form>
        </Formik>
        {error && <span className="text-red-500 font-medium tracking-wide text-center mt-2">{error}</span>}
        <Link to="/login" className="ml-auto text-base text-blue-700 py-3">Login istedet?</Link>
      </div>
    </div>
  );
}