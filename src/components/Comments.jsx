import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import { supabase } from "src/client";

const Comments = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;

    setComment(value);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await supabase
        .from("h_forum_comments")
        .select()
        .eq("post", postId)
        .order("created_at", { ascending: false });

      // set state of posts
      setComments(data);
    };

    fetchComments().catch(console.error);
  }, [])

  const createComment = async () => {
    const { data, error } = await supabase
      .from("h_forum_comments")
      .insert({
        comment: comment,
        post: postId,
      })
      .select();

    console.log(data);

    if (error) {
      console.error(error);
    }
  }

  return (
    <section>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.comment} - {DateTime.fromISO(comment.created_at).toRelative()}</p>
      ))}
      <form>
        <label htmlFor="comment">comment</label>
        <br />
        <textarea
          id="comment"
          name="comment"
          maxLength={7500}
          placeholder="Comment here!"
          rows="5"
          cols="40"
          value={comment}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Submit" onClick={createComment} />
      </form>
    </section>
  );
}

export default Comments;
