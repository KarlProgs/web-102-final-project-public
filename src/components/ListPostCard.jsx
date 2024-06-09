import { Link } from "react-router-dom";

import styles from "/src/components/css/ListPostCard.module.css";

const ListPostCard = ({ id, time, img, user, title, upvotes }) => {
    return (
      <section className={styles.card}>
        <Link className={styles["post-content"]} to={`/${id}`}>
          <div className={styles.info}>
            <p className={styles.time}>{`Posted ${time}`}</p>
            <p className={styles.user}>{user}</p>
            <p className={styles.title}>{`${title}`}</p>
            <p className={styles.upvotes}>{`${upvotes} upvotes`}</p>
          </div>
          {img && (
            <div className={styles["post-img"]}>
              <img src={img} />
            </div>
          )}
        </Link>
      </section>
    );
};

export default ListPostCard;
