import React, { useEffect, useState } from "react";
import Formulario from "Formulario";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const {repositorios} = Formulario();

  useEffect(() => {
    api.get('/repositories').then(response =>
      setRepositories(response.data)
    );
  }, []);


  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(
      repositories.filter(
        repository => repository.id != id
      )
    )
  }

  async function handleListRepositories() {
    const response = await api.get("/repositories");

    setRepositories(response.data);

  }

  return (
    <div className="d-flex flex-row justify-content-center w-100">
      <div id="divForm w-50">
        <Formulario />
      </div>
      <div className="d-flex flex-column align-items-center mt-4 w-50">
        <button className="mb-4" onClick={handleListRepositories}>Listar</button>
        <div className="d-flex">
          <ul className="list-group" data-testid="repository-list">
            {repositories.map(repository => (
              <li key={repository.id} className="list-group-item">
                {repository.title}

                <button className="ml-5" onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </div>
  );
}

export default App;
