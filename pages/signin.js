import React, { useState } from "react";
import Link from "next/link";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import styles from "../styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'

// const initalValues = {
//   login_email: "",
//   login_password: "",
// };

export default function signin() {
  // const [user, setUser] = useState(initalValues);
  // const { login_email, login_password } = user;
  console.log("Email:", values.email);
  const loginValidation = Yup.object({
    email: Yup.string()
    .required("Email adress is required")
    .email('please enter a valid email'),
    password: Yup.string()
    .required("Please enter a password")
  })


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
            <h1>j&#39;ai déjà un compte</h1>
            <p>Get access to one of the best Eshopping services.</p>

            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
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
                <Form className="flex flex-col">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Adresse e-mail"
                    className={`${styles.login__input} border-b-2 border-gray-300 p-2 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-center font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage name="email" component="div" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    className={`${styles.login__input} border-b-2 border-gray-300 p-2 bg-none focus:outline-none w-full grid grid-cols-[15%,85%] items-baseline font-normal text-lg line-h leading-4`}
                  />
                  <ErrorMessage name="password" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
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
