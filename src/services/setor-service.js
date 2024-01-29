import api from './api';

function obterTodos(){
    return new Promise((resolve, reject) => {
        return api.get('/setor')
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function obterPorId(id){
    return new Promise((resolve, reject) => {
        return api.get(`/setor/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function cadastrar(setor){
    return new Promise((resolve, reject) => {
        return api.post(`/setor`, setor)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function atualizar(setor){
    return new Promise((resolve, reject) => {
        return api.put(`/setor/${setor.id}`, setor)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

function deletar(id){
    return new Promise((resolve, reject) => {
        return api.delete(`/setor/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

export default {
    obterTodos,
    obterPorId,
    cadastrar,
    atualizar,
    deletar
}
