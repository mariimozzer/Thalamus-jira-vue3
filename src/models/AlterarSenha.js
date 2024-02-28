export default class ResetarSenha {
    
    constructor(obj){
        obj = obj || {};
        this.current_password = obj.current_password;
        this.new_password = obj.new_password;
        this.new_password_confirmation = obj.new_password_confirmation
    }
}