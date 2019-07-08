var socket = io();

let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('nombre') || !searchParams.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

let usuario = {
    nombre: searchParams.get('nombre'),
    sala: searchParams.get('sala')
};

socket.on('connect', function () {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, (resp) => {
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
}); */

// Escuchar información
socket.on('crearMensaje', function (mensaje) {
    console.log('Servidor:', mensaje);
});

// Esccuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function (personas) {
    console.log(personas);
});

// Mensaje Privado
socket.on('mensajePrivado', function (mensaje) {
    console.log('Mensaje Privada:', mensaje);
});