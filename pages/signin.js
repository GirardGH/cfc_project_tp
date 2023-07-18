import React from 'react';
import Link from 'next/link';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import styles from '../styles/signin.module.scss'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function signin() {
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
              <p>
                Get access to one of the best Eshopping services.
              </p>
              <Formik>
                {
                  (form)=> (
                    <Form>
                      <Field name="myField" type="text"/>
                    </Form>
                  )
                }
              </Formik>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
