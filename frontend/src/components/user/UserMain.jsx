import { Link } from "react-router-dom";
import User from "./User";
import Followers from "./Follower";

import styles from "./User.module.scss";

const UserMain = () => {
  return (
    <div className={styles.imgcontainer}>
      <div className={styles.maincontainer}>
        <User />
        <Followers />
      </div>
    </div>
  );
}
export default UserMain