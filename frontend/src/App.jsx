import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNote() {
    axios.get("http://localhost:3000/api/note").then((res) => {
      setNotes(res.data.note);
      console.log("hellow word");
    });
  }

  useEffect(() => {
    fetchNote();
  }, []);

  //SubmitHandler

  function handleSubmit(e) {
    e.preventDefault();
    const { title, discription } = e.target.elements;
    console.log(title.value, discription.value);

    axios
      .post("http://localhost:3000/api/note", {
        title: title.value,
        discription: discription.value,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="note-created-form">
        <input type="text" name="title" placeholder="Enter Title" />
        <input type="text" name="discription" placeholder="Enter Discription" />
        <button>Add Note</button>
      </form>

      {/* Created Note */}
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.discription}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
