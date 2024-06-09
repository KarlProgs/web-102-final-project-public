import { useState, useEffect } from "react";
import { supabase } from "src/client";
import { DateTime } from "luxon";

import InfoPostCard from "src/components/InfoPostCard";

const PostCardInfo = ({ id }) => {

  const [post, setPost] = useState(null);

  const [upvotes, setUpvotes] = useState(null);

  const handleClick = async () => {
    setUpvotes(upvotes + 1);

    await supabase
      .from("h_forum_posts")
      .update({
        upvotes: upvotes + 1,
      })
    .eq("id", id);
  }

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("h_forum_posts").select().eq("id", id);

      // set state of posts
      setPost(data[0]);

      setUpvotes(data[0].upvotes);
    };

    fetchPost().catch(console.error);
  }, []);

  return (
    <div>
      {post !== null ? (
        <InfoPostCard
          key={id}
          id={id}
          time={DateTime.fromISO(post.created_at).toRelative()}
          img={post.img}
          user={post.user}
          title={post.title}
          body={post.body}
          handleClick={handleClick}
          upvotes={upvotes}
        />
      ) : (
        <h2>{"ERROR: Invalid Post Id"}</h2>
      )}
    </div>
  );
};

export default PostCardInfo;
