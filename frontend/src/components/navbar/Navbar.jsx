import styles from "./Navbar.module.scss"
import { BiSearch } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
import { AiOutlineBell } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cipher from "./Cipher";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Link to="/">
        <div className={styles.logocontainer}>
          <img src="/logo.png" />
          <h1 className={styles.logo_text}>CipherSchools</h1>
        </div>
      </Link>
      <div className={styles.rightcontainer}>
        <div className={styles.searchcontainer}>
          <BiSearch size={16} className={styles.searchicon} />
          <input placeholder="Search and Learn" />
          <CgOptions color="#fff" size={18} className={styles.searchicon} />
        </div>
        <div className={styles.bellcontainer}>
          <span>0</span>
          <AiOutlineBell size={22} className={styles.bell_icon} />
        </div>
        <div className={styles.usercontainer}>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
        </div>
        <Cipher />
        <label className={styles.switch}>
          <input type="checkbox" />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
    </nav>
  );
}

export default Navbar
