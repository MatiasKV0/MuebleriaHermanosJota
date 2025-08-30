document.addEventListener('DOMContentLoaded', function() {
    // obtencion de doms
    const form = document.getElementById('contactForm');
    const nombreInput = document.getElementById('NombreUsuario');
    const emailInput = document.getElementById('EmailUsuario');
    const mensajeInput = document.getElementById('MensajeUsuario');
    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const mensajeError = document.getElementById('mensajeError');
    const successMessage = document.getElementById('successMessage');

    // validacion de expresiones
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

    // validacion
    function validarNombre() {
        const valor = nombreInput.value.trim();
        
        if (valor === '') {
            mostrarError(nombreInput, nombreError, 'El nombre es obligatorio');
            return false;
        }
        
        if (!nombreRegex.test(valor)) {
            mostrarError(nombreInput, nombreError, 'El nombre debe tener entre 2 y 50 caracteres y solo puede contener letras y espacios');
            return false;
        }
        
        limpiarError(nombreInput, nombreError);
        return true;
    }

    function validarEmail() {
        const valor = emailInput.value.trim();
        
        if (valor === '') {
            mostrarError(emailInput, emailError, 'El email es obligatorio');
            return false;
        }
        
        if (!emailRegex.test(valor)) {
            mostrarError(emailInput, emailError, 'Por favor, ingresa un email válido');
            return false;
        }
        
        limpiarError(emailInput, emailError);
        return true;
    }

    function validarMensaje() {
        const valor = mensajeInput.value.trim();
        
        if (valor === '') {
            mostrarError(mensajeInput, mensajeError, 'El mensaje es obligatorio');
            return false;
        }
        
        if (valor.length < 5) {
            mostrarError(mensajeInput, mensajeError, 'El mensaje debe tener al menos 5 caracteres');
            return false;
        }
        
        if (valor.length > 200) {
            mostrarError(mensajeInput, mensajeError, 'El mensaje no puede exceder los 200 caracteres');
            return false;
        }
        
        limpiarError(mensajeInput, mensajeError);
        return true;
    }

    // funcion errores
    function mostrarError(input, errorElement, mensaje) {
        errorElement.textContent = mensaje;
        input.classList.add('input-error');
    }

    function limpiarError(input, errorElement) {
        errorElement.textContent = '';
        input.classList.remove('input-error');
    }

    // mensaje de exito
    function mostrarMensajeExito() {
        successMessage.style.display = 'block';
        
        // duracion del mensaje exito
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }

    // Event para validación en tiempo real
    nombreInput.addEventListener('blur', validarNombre);
    emailInput.addEventListener('blur', validarEmail);
    mensajeInput.addEventListener('blur', validarMensaje);

    nombreInput.addEventListener('input', function() {
        if (nombreInput.classList.contains('input-error')) {
            validarNombre();
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailInput.classList.contains('input-error')) {
            validarEmail();
        }
    });

    mensajeInput.addEventListener('input', function() {
        if (mensajeInput.classList.contains('input-error')) {
            validarMensaje();
        }
    });

    // envio del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const esNombreValido = validarNombre();
        const esEmailValido = validarEmail();
        const esMensajeValido = validarMensaje();
        
        if (esNombreValido && esEmailValido && esMensajeValido) {
            //simulacion de envio con exito hasta q este el server
            
            mostrarMensajeExito();
            
            form.reset();
            
            // Limpiar cualquier error visible
            limpiarError(nombreInput, nombreError);
            limpiarError(emailInput, emailError);
            limpiarError(mensajeInput, mensajeError);
        }
    });
});