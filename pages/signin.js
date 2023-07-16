import React from "react";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import { Form, Formik } from "formik";

export default function signin() {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="">
          <h1>j'ai déjà un compte</h1>
          <p>lorem lorem lorem lorem upsum</p>
          <Formik>
            {(form) => (
              <Form>
                <input type="text" />
                <input type="text" />
              </Form>
            )}
          </Formik>
        </div>
        <div className="">
          <h1>je crée un compte</h1>
          <p>lorem lorem lorem lorem upsum</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
