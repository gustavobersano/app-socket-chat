

let paramsChatJQ = new URLSearchParams(window.location.search);
let nombre = paramsChatJQ.get('nombre');
let sala = paramsChatJQ.get('sala');

// Referencias de JQuery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');


// Funciones para renderizar usuarios
function renderizarUsuario(personas) {

    console.log(personas);

    let html = '';

    html += '<li>';
    html += `   <a href="javascript:void(0)" class="active"> Chat de <span> ${sala}</span></a>`;
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {
        html += '<li>';
        html += `   <a data-id="'${personas[i].id}'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>`;
        html += '</li>';
    }

    divUsuarios.html(html);

}

function renderizarMensajes(mensaje, yo) {

    let html = '';
    const fecha = new Date(mensaje.fecha);
    const hora = `${fecha.getHours()}:${fecha.getMinutes()}`

    let msgClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        msgClass = 'danger';
    }


    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += `        <h5>${mensaje.nombre}</h5>`;
        html += `        <div class="box bg-light-inverse">${mensaje.mensaje}</div>`;
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += `    <div class="chat-time">${hora}</div>`;
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '        <div class="chat-content">';
        html += `            <h5>${mensaje.nombre}</h5>`;
        html += `        <div class="box bg-light-${msgClass}">${mensaje.mensaje}</div>`;
        html += '    </div>';
        html += `    <div class="chat-time">${hora}</div>`;
        html += '</li>';
    }

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Listeners
divUsuarios.on('click', 'a', function () {

    let id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function (event) {

    event.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function (mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje,true);
        scrollBottom();
    });

});