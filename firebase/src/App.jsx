import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import "./App.css";

import { db } from "./firebase/firebase";
import { useEffect, useState } from "react";

const docRef = doc(db, "test", "ZNuZN7sqyunOdG8etfap");

const collectionRef = collection(db, "test");

const q = query(collectionRef);

function App() {
  const [user, setUser] = useState({ name: "", age: 0 });
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", age: 0 });
  // const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function getMyDoc() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    }

    // async function getAllDocs() {
    //   const collectionSnap = await getDocs(collectionRef);
    //   let docs = [];
    //   collectionSnap.forEach((item) => {
    //     docs.push(item.data());
    //   });
    //   setUsers(docs);
    // }
    onSnapshot(q, (snap) => {
      let docs = [];
      snap.forEach((doc) => {
        docs.push(doc.data());
      });
      setUsers(docs);
    });

    // getAllDocs();
    getMyDoc();
  }, []);

  return (
    <div>
      <div className="text-red-500">Firebase</div>
      <div>
        User: {user.name} <br /> Age: {user.age}
      </div>

      <div>
        {users.map((elem, id) => (
          <div key={id} className="text-blue-500">
            User: {elem.name}. Age: {elem.age}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="userName">Name</label>
        <input
          className="border-2 rounded-md"
          type="text"
          name="userName"
          id="userName"
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
        <label htmlFor="userAge">Age</label>
        <input
          className="border-2 rounded-md"
          type="number"
          name="userAge"
          id="userAge"
          onChange={(e) => {
            setNewUser({ ...newUser, age: parseInt(e.target.value) });
          }}
        />
        <button
          onClick={() => {
            async function setNewUser() {
              await addDoc(collectionRef, newUser);
              // setRefreshing(!refreshing);
              console.log("Done!");
            }
            setNewUser();
          }}
          className="p-2 font-bold border-2 rounded-md active:bg-slate-700 active:text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
