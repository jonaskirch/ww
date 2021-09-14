const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client(
  {
    puppeteer: {
      executablePath: "/opt/google/chrome/google-chrome",
      // ignoreDefaultArgs: ['--no-sandbox'],
    }
  }
);

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
  console.log('message',message);
  console.log('body',message.body);
	if (message.body == 'ping') {
		client.sendMessage(message.from, 'pong');
	}
});

client.initialize();

console.log('fim 2');
