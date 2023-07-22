import React, { useState } from "react";
import Link from "next/link";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getProviders, signIn } from "next-auth/react";

// const initalValues = {
//   login_email: "",
//   login_password: "",
// };

export default function signin({ providers }) {
  console.log(providers);
  // const [user, setUser] = useState(initalValues);
  // const { login_email, login_password } = user;
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email adress is required")
      .email("please enter a valid email"),
    password: Yup.string().required("Please enter a password"),
  });

  const createValidation = Yup.object({
    newEmail: Yup.string()
      .required("Email address is required")
      .email("Entrez une adresse email valide"),
    newPassword: Yup.string()
      .required(
        `Entrez un mot de passe de 6 caractères minimum avec une Majuscule et un caractère ! " # $ % & ' ( ) * +`
      )
      .min(6, "mot de passe de 6 caractères minimum")
      .max(36, "mot de passe de 36 caractères minimum")
      .matches(
        /^(?=.*[A-Z])(?=.*[! " # $ % & ' ( ) * +]).{6,}$/,
        "Le mot de passe n'est pas valide"
      ),
    confirmPassword: Yup.string()
      .required("Confirmez votre mot de passe")
      .oneOf(
        [Yup.ref("newPassword")],
        "Les mots de passe ne correspondent pas"
      ),
    firstName: Yup.string()
      .required("Quel est votre prénom ?")
      .min(2, "Votre prénom doit avoir entre 2 et 20 caractères")
      .max(20, "Votre prénom doit avoir entre 2 et 20 caractères")
      .matches(/^[a-zA-ZÀ-ÿ '-]{2,20}$/, "Votre prénom n'est pas valide"),
    lastName: Yup.string()
      .required("Quel est votre nom ?")
      .min(2, "Votre nom doit avoir entre 2 et 20 caractères")
      .max(20, "Votre nom doit avoir entre 2 et 20 caractères")
      .matches(/^[a-zA-ZÀ-ÿ '-]{2,20}$/, "Votre nom n'est pas valide"),
    phone: Yup.string()
      .required("numéro de téléphone requis")
      .matches(
        /^(?:\+33|0)\d{9}$/,
        "Votre numéro de téléphone n'est pas valide"
      ),
    address: Yup.string().required("Entrez votre adresse de livraison"),
    postalCode: Yup.string()
      .required("Code postal requis")
      .matches(/^(?!(0[1-9]|95))[0-9]{5}$/, "Code postal non valide"),
    city: Yup.string().required("Entrez votre ville"),
  });

  return (
    <div>
      <Header />
      <div className={`${styles.login}`}>
        <div className={`${styles.login__container}`}>
          <div className={`${styles.login__header}`}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={`${styles.login__form}`}>
            <h1>J&#39;ai déjà un compte</h1>
            <p className=" text-[#9b9796]">
              Si vous êtes un utilisateur enregistré, veuillez saisir votre
              adresse e-mail et votre mot de passe.
            </p>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidation}
              validate={(values) => {
                console.log("Email:", values.email);
                console.log("Password:", values.password);
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Adresse e-mail"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    className={`${styles.login__inputtwo} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-baseline font-normal text-lg line-h leading-4`}
                  />
                  <div className="flex justify-between">
                    <div className={`${styles.forgot}`}>
                      <Link href="/forget">Mot de passe oublié ?</Link>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className={`${styles.login__required}`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${styles.login__buttonco}`}
                  >
                    ME CONNECTER
                  </button>
                </Form>
              )}
            </Formik>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              {providers.map((elt) => (
                <div key={elt.name} className="mt-4">
                  <button
                    className={`${styles.login__buttonsocial}`}
                    onClick={() => signIn(elt.id)}
                  >
                    <img
                      src={`../../icons/${elt.name}.png`}
                      alt={elt.name}
                      className="w-6 h-6 mx-2"
                    />
                    <span className="text-gray-800 border-y-8">
                      Continue with {elt.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`${styles.login__container}`}>
          <div className={`${styles.login__form}`}>
            <h1>Je créé mon compte</h1>
            <p className=" text-[#9b9796] text-sm">
              Créer un compte pour faciliter le click and collect sur le site de
              Colombo Food City
            </p>

            <Formik
              initialValues={{
                newEmail: "",
                newPassword: "",
                confirmPassword: "",
                firstName: "",
                lastName: "",
                phone: "",
                address: "",
                postalCode: "",
                city: "",
              }}
              validationSchema={createValidation}
              validate={(values) => {
                console.log("Email:", values.email);
                console.log("Password:", values.password);
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <Field
                    name="lastName"
                    type="text"
                    placeholder="Nom"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="firstName"
                    type="text"
                    placeholder="Prénom"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="address"
                    type="text"
                    placeholder="Adresse"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="address"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="postalCode"
                    type="text"
                    placeholder="Code postal et ville"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="postalCode"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="city"
                    type="text"
                    placeholder="Ville"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="city"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="phone"
                    type="phone"
                    placeholder="Entrez votre numéro de téléphone"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="newEmail"
                    type="email"
                    placeholder="Adresse e-mail"
                    className={`${styles.login__inputone} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage
                    name="newEmail"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="Mot de passe"
                    className={`${styles.login__inputtwo} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-baseline font-normal text-lg line-h leading-4`}
                  />

                  <ErrorMessage
                    name="newPassword"
                    component="span"
                    className={`${styles.login__required}`}
                  />

                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmation mot de passe"
                    className={`${styles.login__inputtwo} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-baseline font-normal text-lg line-h leading-4`}
                  />

                  <ErrorMessage
                    name="confirmPassword"
                    component="span"
                    className={`${styles.login__required}`}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${styles.login__buttonco}`}
                  >
                    CRÉER MON COMPTE
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const providers=Object.values(await getProviders());
//   return {
//     props: { providers },
//   }
// }

export function getServerSideProps(context) {
  return getProviders()
    .then((providers) => {
      const providersArray = Object.values(providers);
      return {
        props: { providers: providersArray },
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        props: { providers: [] },
      };
    });
}
