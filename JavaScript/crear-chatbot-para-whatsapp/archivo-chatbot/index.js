const qrcode = require('qrcode-terminal');

//Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Si la conexión es exitosa muestra el mensaje de conexión exitosa
client.on('ready', () => {
    console.log('¡¡Conexión exitosa!!');
});


//Escucha los mensajes y el bot responde lo que le hayamos puesto
client.on('message', message => {
    console.log('Mensaje recibido:', message.body);
    if (message.body === 'Hola') {
        client.sendMessage(message.from, 'Hola soy un bot, mi creador esta ocupado ahora mismo. En breves se comunicará con usted para resolver sus dudas.');
    }
});
/*
Finalmente, esta línea inicia la sesión de WhatsApp Web. Una vez que se 
ejecuta esta línea, el bot comenzará a escuchar y responder a los 
mensajes recibidos en la cuenta de WhatsApp asociada.
*/
client.initialize();