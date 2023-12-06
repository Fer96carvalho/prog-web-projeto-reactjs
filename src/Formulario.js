import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './services/api';
import Swal from 'sweetalert2';

const Formulario = () => {

    const [repositorios, setRepositorios] = useState([]);

    const [formulario, setFormulario] = useState({
        titulo: '',
        url: '',
        tech: '',
        techs: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prevForm) => ({ ...prevForm, [name]: value }));
    };



    const adicionarTech = () => {
        const { tech, techs } = formulario;
        if (tech.length == 0) {
            return Swal.fire({
                title: "Dados incompletos!",
                text: "Adicione uma tech..",
                icon: "info"
            });
        }
        if (tech && !techs.includes(tech)) {
            setFormulario((prevForm) => ({
                ...prevForm,
                techs: [...prevForm.techs, tech],
                tech: '',
            }));
        } else {
            Swal.fire({
                title: "Ops!",
                text: "Tech já adicionada!",
                icon: "info"
            });
        }
    };

    const removerTech = (item) => {

        setFormulario((prevForm) => ({
            ...prevForm,
            techs: prevForm.techs.filter((tech) => tech !== item),
        }))
         return Swal.fire({
            title: "Sucesso!",
            text: "Tech removida!",
            icon: "success"
        })
    };

    const limparFormulario = () => {
        setFormulario({
            titulo: '',
            url: '',
            tech: '',
            techs: [],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((formulario.techs).length == 0) {
            return Swal.fire({
                title: "Dados incompletos!",
                text: "Adicione uma tech..",
                icon: "info"
            });
        }
        try {
            const data = await api.post('/repositories', {
                title: formulario.titulo,
                url: formulario.url,
                techs: formulario.techs
            })

            setRepositorios([...repositorios, data.data]);
            limparFormulario();
            Swal.fire({
                title: "Sucesso!",
                text: "Repositório Adicionado com Sucesso!",
                icon: "success"
            });
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            Swal.fire({
                title: "Ops!",
                text: "Tivemos um problema, tente novamente!",
                icon: "error"
            });
        }


    };

    return (
        <div className="mb-3 d-flex flex-column align-items-center">
            <h3>Adicione um repositório</h3>
            <div className="mb-3">
                <form onSubmit={handleSubmit} className="container mt-4">
                    <label className="form-label mt-2" >Título:</label>
                    <input className="form-control" type="text" name="titulo" value={formulario.titulo} onChange={handleChange} required />

                    <label className="form-label mt-2" >URL:</label>
                    <input className="form-control" type="text" name="url" value={formulario.url} onChange={handleChange} required />

                    <label className="form-label mt-2" >Techs:</label>
                    <div className="d-flex mb-2">
                        <input className="form-control" type="text" name="tech" value={formulario.tech} onChange={handleChange} />
                        <button className='mr-4' type="button" onClick={adicionarTech}>adicionar</button>
                    </div>
                    <p>Techs adicionadas:</p>
                    <ul className="list-group" >
                        {formulario.techs.map((tech, index) => (
                            <li key={index} className="list-group-item" >{tech}<button type="button" onClick={() => removerTech(tech)}>remover</button></li>
                        ))}
                    </ul>
                    <div className='d-flex align-items-center flex-column'>
                        <button className=' mt-4' type="submit">Salvar</button>
                    </div>
                </form>
            </div>

        </div>

    );
};

export default Formulario;
