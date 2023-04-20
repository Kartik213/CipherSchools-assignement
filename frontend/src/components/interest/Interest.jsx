import styles from "./Interest.module.scss";
import React, { useState } from "react";

const Interest = () => {
  const [modal, setModal] = useState(false);
  let interests = [];

  const handleEditClick = () => {
    setModal(!modal);
    interests = [];

    if (modal) {
      document.body.classList.remove("stop-scrolling");
    } else {
      document.body.classList.add("stop-scrolling");
    }
  }
  
  const InterestModal = () => {
    const handleAddInterestClick = (e) => {
      const target = e.target;
      target.style.backgroundColor = "#f3912e";
      const title = target.innerText.toString();
      const newArr = interests.filter((i) => i !== title);
      interests = [...newArr, title];
    }

    return (
      <>
        <div
          onClick={handleEditClick}
          className={styles.modal_background}
        ></div>

        <div className={styles.modal_main_container}>
          <div className={styles.list_container}>
            <ul className={styles.modal_col}>
              <li onClick={handleAddInterestClick}>App Development</li>
              <li onClick={handleAddInterestClick}>Game Development</li>
              <li onClick={handleAddInterestClick}>Programming</li>
              <li onClick={handleAddInterestClick}>Data Science</li>
            </ul>
            <ul className={styles.modal_col}>
              <li onClick={handleAddInterestClick}>Web Development</li>
              <li onClick={handleAddInterestClick}>Data Structures</li>
              <li onClick={handleAddInterestClick}>Machine Learning</li>
              <li onClick={handleAddInterestClick}>Others</li>
            </ul>
          </div>
          <div className={styles.bottom_row}>
            <button onClick={handleEditClick} className={styles.btn}>
              Cancel
            </button>
            <button className={styles.btn}>Save</button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.upper_row}>
        <h4>INTERESTS</h4>
        <button onClick={handleEditClick}>Edit</button>
      </div>
      {modal && <InterestModal />}
    </>
  );
}
export default Interest