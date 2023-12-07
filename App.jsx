import { useState, useEffect, useRef } from "react";
import "./App.css";

/* eslint-disable react/prop-types */
function GhUser({ name }) {
  const [data, setData] = useState();
  const [repos, setRepos] = useState();

  useEffect(() => {
    if (data?.repos_url) {
      fetch(`https://api.github.com/users/${name}/repos`)
        .then((res) => res.json())
        .then(setRepos);
    }
  }, [data, name]);

  useEffect(() => {
    if (name) {
      console.log("NAME", name);

      fetch(`https://api.github.com/users/${name}`)
        .then((res) => res.json())
        .then(setData)
        .catch((e) => console.dir("ERROR", e));
    }
  }, [name]);

  if (!data) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <div>
          GitHub id: {data.id} {data.name && `Name: ${data.name}`}
        </div>
        {data.avatar_url && (
          <img src={data.avatar_url} alt="{data.login}'s face" height="200px" />
        )}
        <ul>
          {repos && repos.map((repo) => <li key={repo.id}>{repo.name}</li>)}
        </ul>
      </>
    );
  }
}

function InputForm({ setName }) {
  const inputField = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setName(inputField.current.value);
      }}
    >
      <div>
        <label>
          User id: <input type="text" name="name" ref={inputField} />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

function App() {
  const [name, setName] = useState();

  return (
    <>
      <div>
        <GhUser name={name} />
      </div>
      <div>
        <InputForm setName={setName} />
      </div>
    </>
  );
}

export default App;
