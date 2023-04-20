import styles from "./Followers.module.scss";
import data from "./data.json";
import Followeruser from "./Followeruser";

const Followers = () => {
  return (
    <div className={styles.container}>
      <h4>Users Following you</h4>
      <div className={styles.content}>
        {data.map((d) => {
          return (
            <Followeruser
              followersCount={d.followersCount}
              profession={d.profession}
              img={d.img}
              name={d.name}
            />
          );
        })}
      </div>
    </div>
  );
}
export default Followers
