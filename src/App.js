import { React, useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "body") {
      setBody(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title,
      body,
    };

    axios({
      url: "http://104.248.234.175:5000/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        resetUserInputs();
        getPosts();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  const resetUserInputs = () => {
    setTitle("");
    setBody("");
  };

  const getPosts = () => {
    axios({
      url: "http://104.248.234.175:5000/api",
    })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setPosts(data);
      })
      .catch(() => {
        alert("Error retrieving data!");
      });
  };

  console.log(posts);
  const displayPosts = (posts) => {
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <div className="posts" key={index}>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
      </div>
    ));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div id="container">
        <h1 id="title">Post App - Fullstack application(MERN)</h1>
        <h2 id="subtitle">Welcome Here!</h2>
        <form id="form" onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Enter your title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              name="body"
              placeholder="Enter your message"
              value={body}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
        <div className="posts-container">{displayPosts(posts)}</div>
      </div>
    </>
  );
};

export default App;
