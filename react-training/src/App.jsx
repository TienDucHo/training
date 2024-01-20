import { useState, useEffect, useContext } from "react";

import NavBar from "./NavBar";

import UserContext from "./UserContext";

function App() {
  const [userName, setUserName] = useState("John");
  const [post, setPost] = useState({});
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function getPost() {
      let randomPost = Math.floor(Math.random() * 10) + 1;
      let response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" +
          randomPost.toString()
      );
      let data = await response.json();
      setPost(data);
    }
    getPost();
    console.log("Refetch");
  }, [refetch]); //array of dependencies

  return (
    <>
      <UserContext.Provider
        value={{ userName: userName, setUserName: setUserName }}
      >
        <NavBar>Hi,</NavBar>
      </UserContext.Provider>
      <h1>Heading 1</h1> <p>{post.body}</p>
      <button onClick={() => setRefetch(!refetch)}>Refetch</button>
      <button
        onClick={() => {
          if (userName === "John") setUserName("Amy");
          else setUserName("John");
        }}
        className="p-4 m-2 rounded-sm bg-slate-600"
      >
        Change User
      </button>
    </>
  );
}

export default App;
