export default class Menu {
    constructor(obj) {
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.url = obj.URL;
        this.sistema_id = obj.sistema_id;
        this.menu_pai = obj.menu_pai;
        this.filho = [];

        if (Array.isArray(obj.filho)) {
            this.filho = obj.filho.map(filho => {
                const menuFilho = new Menu(filho);
                menuFilho.idFilho = filho.id;
                menuFilho.nomeFilho = filho.nome;

                return menuFilho;
            });
        }
    }
}