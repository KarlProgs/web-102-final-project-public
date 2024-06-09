import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { supabase } from "src/client";

import ListPostCard from "src/components/ListPostCard";

import styles from "src/components/css/ListPostCardList.module.css";

/**
 * CardList renders a list of posts from the posts table using <ListPostCard>
 *
 * @param   {boolean} edit  Whether or not you'd like an edit button on each <ListPostCard>
 * @returns {Array}         Array of <ListPostCard>s
 */
const ListPostCardList = () => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("newest");

  const [searchItem, setSearchItem] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const fetchPost = async () => {
      let data; // might be better to do setPosts inside if statement?

      if (sort.valueOf() === "newest") {
        console.log("sorting by newest");

        data = await supabase
          .from("h_forum_posts")
          .select()
          .order("created_at", { ascending: false });
      } else if (sort.valueOf() === "popular") {
        console.log("sorting by popular");

        data = await supabase
          .from("h_forum_posts")
          .select()
          .order("upvotes", { ascending: false });
      } else {
        console.error("Invalid sort value!");
      }

      if (data.error) {
        console.error(data.error);
      }

      setPosts(data.data);
      setFilteredPosts(data.data);
    };

    fetchPost().catch(console.error);
  }, [sort]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    if (searchTerm.valueOf() !== "") {
      const filteredItems = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredPosts(filteredItems);
    } else {
      setFilteredPosts(posts);
    }
  }

  const handleClick = (sortBy) => {
    setSort(sortBy);
  }

  if (posts !== null && posts.length > 0) {
    return (
      <main>
        <search className={styles.search}>
          <button onClick={() => {
            handleClick("newest");
          }}>sort by newest</button>
          <button onClick={() => {
            handleClick("popular");
          }}>sort by popular</button>
          <input
            type="text"
            value={searchItem}
            onChange={handleSearch}
            placeholder='Type to search'
          />
        </search>
        {filteredPosts.map((post) => (
          <ListPostCard
            key={post.id}
            id={post.id}
            time={DateTime.fromISO(post.created_at).toRelative()}
            img={post.img}
            user={post.user}
            title={post.title}
            upvotes={post.upvotes}
            edit={false}
          />
        ))}
      </main>
    );
  } else if (posts !== null && !(posts.length > 0)) {
    return <p>No posts!</p>;
  }
};

export default ListPostCardList;
