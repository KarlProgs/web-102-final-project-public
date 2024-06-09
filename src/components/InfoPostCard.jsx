import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
// import Comments from "src/components/Comments";

const Comments = lazy(() => import("src/components/Comments"));

import styles from "/src/components/css/InfoPostCard.module.css";

const InfoPostCard = ({ id, time, img, user, title, body, handleClick, upvotes }) => {
  return (
    <>
      <section className={styles.card}>
        <Link className={styles["post-content"]} to={`/${id}`}>
          <div className={styles.info}>
            <p className={styles.time}>{`Posted ${time}`}</p>
            <p className={styles.user}>{user}</p>
            <h3 className={styles.title}>{title}</h3>
          </div>
        </Link>
        <p className={styles.body}>{body}</p>
        {img && (
          <div className={styles["post-img"]}>
            <img src={img} />
          </div>
        )}
        <div className={styles["upvotes-and-edit"]}>
          <button className={styles.button} onClick={handleClick}>Upvote!</button>
          <p className={styles.upvotes}>{`${upvotes} upvotes`}</p>
          <Link to={`/${id}/edit`}>
            <button className={styles.button} alt="edit button">
              Edit Post
            </button>
          </Link>
        </div>
      </section >
      <Suspense>
        <Comments postId={id} />
      </Suspense>
    </>
  );
};

export default InfoPostCard;
