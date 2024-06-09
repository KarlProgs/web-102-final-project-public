import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";

const Edit = () => {
  let { id } = useParams();

  const [post, setPost] = useState({
    id: null,
    title: "",
    body: "",
    img: "",
    secretKey: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("h_forum_posts")
        .select()
        .eq("id", id);

      const postData = data[0];

      // set state of posts
      setPost((prev) => {
        return {
          ...prev,
          title: postData.title,
          body: postData.body,
          img: postData.img,
        }
      });
    };

    fetchPost().catch(console.error);
  }, []);


  const updatePost = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("h_forum_posts")
      .select()
      .eq("id", id);

    const secretKey = data[0].secret_key;

    if (error) {
      console.error(error);
    } else if (post.secretKey == secretKey &&
      post.title !== "") {
      await supabase
        .from("h_forum_posts")
        .update({
          title: post.title,
          body: post.body,
          img: post.img,
        })
        .eq("id", id);

      window.location = `/${id}`;
    } else if (post.secretKey !== secretKey) {
      alert("Invalid secret key");
    } else {
      alert("Please set a title!")
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const deletePost = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("h_forum_posts")
      .select()
      .eq("id", id);

    const secretKey = data[0].secret_key;

    if (error) {
      console.error(error);
    } else if (post.secretKey == secretKey) {
      await supabase.from("h_forum_posts").delete().eq("id", id);
      await supabase.from("h_forum_comments").delete().eq("post", id);


      window.location = "/";
    } else {
      alert("invalid secret key!");
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="secretKey">secret key</label>
        <br />
        <input
          autoFocus
          type="text"
          id="secretKey"
          name="secretKey"
          value={post.secretKey}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="title">title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="body">body</label>
        <br />
        <textarea
          id="body"
          name="body"
          wrap="hard"
          maxLength={7500}
          placeholder="This is your post's body text."
          rows="20"
          cols="60"
          value={post.body}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="img">direct image link</label>
        <br />
        <input
          type="url"
          id="img"
          name="img"
          value={post.img}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Submit" onClick={updatePost} />
        <button onClick={deletePost}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default Edit;
