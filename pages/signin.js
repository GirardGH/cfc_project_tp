import React from 'react';
import Link from 'next/link';
import Header from '../src/components/header';
import Footer from '../src/components/footer';
import styles from '../styles/signin.module.scss'
import { BiLeftArrowAlt } from 'react-icons/bi'

export default function signin() {
  return (
    <div>
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
            <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
