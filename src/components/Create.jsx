import { useState } from "react";
import { supabase } from "../client";

import { Link } from "react-router-dom";

const Create = () => {
  const [post, setPost] = useState({
    user: "",
    title: "",
    body: "",
    img: "",
    id: null,
    secretKey: null,
  });

  const createPost = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("h_forum_posts")
      .insert({
        user: post.user,
        title: post.title,
        body: post.body,
        img: post.img,
      })
      .select();

    const secretKey = data[0].secret_key;
    const id = data[0].id;

    if (error) {
      console.error(error);
    } else if (post.user    !== "" &&
               post.title   !== "") {
      setPost((prev) => {
        return {
          ...prev,
          id: id,
          secretKey: secretKey,
        };
      });
    } else {
      alert("Please set a user and title!");
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

  return (
    <div>
      <form>
        <label htmlFor="user">username</label>
        <br />
        <input
          autoFocus
          type="text"
          id="user"
          name="user"
          value={post.user}
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
          maxLength={7500}
          placeholder="This is your post's body text."
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
        <input type="submit" value="Submit" onClick={createPost} />
        {( post.secretKey && post.id ) && (
          <>
            <p>Posted!</p>
            <p>Your secret key is: {post.secretKey}</p>
            <p>
              View your post at:
            <Link to={`/${post.id}`}>
               &ensp;{post.title}.
            </Link>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default Create;
