const nombre = document.querySelector(".input__nombre");
const precio = document.querySelector(".input__precio");
const imagen = document.querySelector(".input__imagen");

precio.addEventListener('input', function(event) {
    const input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');

    if (value.length > 0) {
        value = parseInt(value, 10);
        if (value > 999999) {
            value = 999999;
        }
        input.value = '$ ' + value.toLocaleString();
    } else {
        input.value = '';
    }
});

// boton recargar pagina

document.addEventListener('DOMContentLoaded', () => {
    const limpiarButton = document.querySelector('.btn__limpiar');

    limpiarButton.addEventListener('click', (event) => {
        event.preventDefault();
        location.reload(); 
    });


});