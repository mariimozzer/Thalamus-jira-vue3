export default class Projeto {
    
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.dtInicio = obj.dtInicio;
        this.gerente = obj.gerente;
        this.setor = obj.setor;
    }
}