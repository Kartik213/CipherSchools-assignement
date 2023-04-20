import styles from "./Followers.module.scss"
const Followeruser = ({followersCount, name, profession, img}) => {
  return (
    <div className={styles.follower_container}>
      <img src={img} className={styles.userimg} />
      <p className={styles.name}>{name}</p>
      <p className={styles.profession}>{profession}</p>
      <p className={styles.count}>{followersCount} Followers</p>
      <button>Follow</button>
    </div>
  );
}
export default Followeruser
