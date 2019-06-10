const regexLetters = /^[a-zA-Zñáéíóú]+$/;
const regexLettersWithBlanks = /^[a-zA-Zñáéíóú ]+$/;
const regexNumbers = /^[0-9]+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

class ValidationService {

    /**********************************
     * Verifica si el email es valido *
     **********************************/
    static checkValidEmail(value) {
        let valid = regexEmail.test(value);
        return valid;
    }

    /******************************************************
     * Verifica si el valor introducido tiene solo letras *
     ******************************************************/
    static checkOnlyLetters(value) {
        let valid = regexLetters.test(value);
        return valid
    }

    /*******************************************************
     * Verifica si el valor introducido tiene solo numeros *
     *******************************************************/
    static checkOnlyNumbers(value) {
        let valid = regexNumbers.test(value);
        return valid;
    }

    static checkOnlyLettersWithBlanks(value) {
        let valid = regexLettersWithBlanks.test(value);
        return valid;
    }

    static checkRole(value){
        if(value === 'admin' || value === 'empleado'){
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = ValidationService;