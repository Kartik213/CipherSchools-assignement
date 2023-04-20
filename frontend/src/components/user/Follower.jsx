import { Link } from "react-router-dom";
import styles from "./Followers.module.scss";

const Followers = () => {
  return (
    <Link to="/followers">
      <h4 className={styles.followers}>6 Followers</h4>
    </Link>
  );
};

export default Followers;