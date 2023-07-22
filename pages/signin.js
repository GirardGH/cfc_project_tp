import React, { useState } from "react";
import Link from "next/link";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getProviders } from "next-auth/react";

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
            <p className=" text-[#9b9796]">Si vous êtes un utilisateur enregistré, veuillez saisir votre adresse e-mail et votre mot de passe.</p>

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
                  <ErrorMessage name="email" component="span" className={`${styles.login__required}`}/>

                  <Field
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    className={`${styles.login__inputtwo} border-b-2 border-gray-300 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-baseline font-normal text-lg line-h leading-4`}
                  />
                  <div className="flex justify-between">
                  <div className={`${styles.forgot}`}>
                    <Link href="/forget" >Mot de passe oublié ?</Link>
                  </div>
                  <ErrorMessage name="password" component="span" className={`${styles.login__required}`} />
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                  
                    ME CONNECTER
                  </button>
                </Form>
              )}
            </Formik>
            <div>
              <span>
                or continue with
              </span>
            </div>

            {providers.map((elt) => (<h1 key={elt.index}>{elt.name}</h1>))}
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