import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState();
  const [submittedTerm, setSubmittedTerm] = useState();
  const [orgInfo, setOrgInfo] = useState(null);

  const searchGithub = async (name, e) => {
    e.preventDefault();
    setSubmittedTerm(name);
  };

  useEffect(() => {
    if (submittedTerm) {
      const response = axios
        .get(`https://api.github.com/orgs/${submittedTerm}/repos`)
        .then(({ data }) => setOrgInfo(data));
    }
  }, [submittedTerm]);

  console.log(orgInfo);

  const render = () => {
    if (!orgInfo && !submittedTerm) {
      return (
        <section className=" h-100 w-100  d-flex flex-column justify-content-center align-items-center">
          <h1 className="fs-5">
            Search for a Github Organisation<br></br>
            Enter the org name below to list their repos
          </h1>
          <form onSubmit={(e) => searchGithub(term, e)}>
            <input onChange={({ target }) => setTerm(target.value)}></input>
          </form>
        </section>
      );
    } else if (orgInfo) {
      return (
        <section className="d-flex flex-column justify-content-center">
          <div
            onClick={() => {
              setOrgInfo(null);
              setSubmittedTerm(null);
            }}
            className="X"
          >
            X
          </div>
          <div className="d-flex w-75 justify-content-center">
            <div className="name">Name</div>
            <div className="url">URL</div>
            <div className="stars">Stars</div>
            <div className="forks">Forks</div>
          </div>
          {orgInfo.map((org) => {
            return (
              <div className="w-75 container d-flex justify-content-evenly">
                <div>{org.name}</div>
                <div>{org.url}</div>
                <div>{org.stargazers_count}</div>
                <div>{org.forks}</div>
              </div>
            );
          })}
        </section>
      );
    }
  };

  return render();
};

export default Search;
