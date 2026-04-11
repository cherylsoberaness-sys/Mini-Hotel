function validateEmail (email) {
    if(!email || typeof email !== 'string') return false;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email)
}

function validateTelephone (telephone) {
    //elimina espacios, guiones y paréntesis
    if(!telephone || typeof telephone !== 'string') return false;
    const clean = telephone.replace(/\D/g, '')
    //validar 10 digitos consecutivos
    const regex = /^\d{11,12}$/;
    return regex.test(clean);
}

function validateDni (dni) {

    if(!dni || typeof dni !== 'string') return false;

    const normDni = dni.trim().toUpperCase();
    const regex = /^[0-9]{8}[A-Z]$/;
    return regex.test(normDni);    
}

function validateData (email, dni, telephone) {
    const errors = {};
    if(!validateEmail(email)) {
        errors.email = "Email inválido";
    }
    if(!validateDni(dni)) {
        errors.dni = "Dni inválido";
    }
    if(!validateTelephone(telephone)){
        errors.telephone = "Telefono inválido";
    }

    return {
            isValid: Object.keys(errors).length === 0,
            errors
    };
}

function calculateNights(dateIn, dateOut) {
    const total = (new Date(dateOut) - new Date(dateIn)) / 86400000;
    return total;
}



function generateId () {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `RES-${timestamp}-${random}`;
}



const areSameDay = (d1, d2) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};





export { validateData, generateId, calculateNights, areSameDay };