import { PropagateLoader } from "react-spinners";
import styles from "./styles.module.scss"
export default function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <PropagateLoader color="#fde047" loading={loading} />
    </div>
  );
}