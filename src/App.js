import React, {useEffect, useState} from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState( [] );

  useEffect( () => {
    api.get('/repositories').then( response =>
      setRepositories( response.data )
    );
  }, [] );

  async function handleAddRepository() {
    // TODO
     const response = await api.post('/repositories', {
      title: 'Prog Web',
      url: 'ufopa.edu.br',
      techs: ['Python', 'Node.JS', 'ReactJS'],
    })

    setRepositories( [...repositories, response.data ] );

  }

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
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map( repository => (
          <li key = {repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <button onClick={handleListRepositories}>Listar</button>
    </div>
  );
}

export default App;