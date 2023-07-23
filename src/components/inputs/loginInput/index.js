import styles from "./styles.module.scss";
import { ErrorMessage, useField } from "formik";

export default function LoginInput({ placeholder, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >

      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className={styles.error__container}>
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  );
}