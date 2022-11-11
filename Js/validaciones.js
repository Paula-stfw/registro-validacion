export function validar(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    console.log(input.parentElement);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
      valueMissing: "Este campo no puede estar vacío"  
    },
    email: {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener al menos una letra minúscula, una mayúscula, un número y no puede contener caracteres especiales"        
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es: xx-xxxx-xxxx"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Se deben colocar entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Se requieren 3 caracteres como mínimo"
    },
    provincia: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Se requieren 3 caracteres como mínimo"
    },
}


const validadores = {
    nacimiento : input => validarNacimiento(input)
}

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if (input.validity[error]) {
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }

    })
    return mensaje;

} 

function validarNacimiento(input) {
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad."
    };
    input.setCustomValidity(mensaje);
}

function mayorDeEdad (fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas < fechaActual;
} 

