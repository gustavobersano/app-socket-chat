let socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(personas) {
        renderizarUsuario(personas);
    });
});

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {
    renderizarUsuario(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});