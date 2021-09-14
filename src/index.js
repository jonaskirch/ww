const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client(
  {
    puppeteer: {
      executablePath: "/usr/bin/chromium-browser",
      ignoreDefaultArgs: ['--no-sandbox'],
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
	if(message.body === '!ping') {
		client.sendMessage(message.from, 'pong');
	}
});

client.initialize();

console.log('fim 2');
