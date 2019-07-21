const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require('fs');
//const token = process.env.token;
const botconfig = require('./botconfig.json');
let cooldown = new Set();
let cdseconds = 5;
const token = process.env.token;

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err);
    const jsfile = files.filter(f => f.split(".").pop() === 'js');
    if (jsfile.length <= 0) {
        return console.log("No commands have been found");
    }

    jsfile.forEach((f) => {
        delete require.cache[require.resolve(`./commands/${f}`)];
        const props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        client.commands.set(props.help.name, props);
    });
});

client.on('ready', () => {
    console.log(`${client.user.username} is online`);
    client.user.setActivity(`to ;help | vBeta`, {type: 'LISTENING'});
});

client.on('destroy', () =>{
    client.login(token);
});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.content === 'what is the date') {
        const date = new Date().toUTCString();
        message.reply(`:GreenCheck:602343210374922281 ${date}`);
    }
    if (message.content === 'ping') {
        message.delete(3000);
        message.channel.send(`Pong!  ${message.author.toString()}`)
            .then(msg => {
                msg.react('🏓');
                msg.delete(3000);
            });
    }
    if(message.content === 'Ping') {
        message.delete(3000);
        message.channel.send(`Pong! ${message.author.toString()}`)
            .then(msg => {
                msg.react('🏓'); 
                msg.delete(3000);
            });

    }
    if(message.content === 'modinator') {
        message.delete(10000);
        message.channel.send('_yes?_ 🤔')
            .then(msg => {
                msg.delete(10000);
            });
    }
    if(message.content === 'Modinator') {
        message.delete(10000);
        message.channel.send('_may i help you?_ 🤔')
            .then(msg => {
                msg.delete(10000);
            });
    }
    if(message.content === 'hi') {
        message.delete(4000);
        message.channel.send('_bye_')
            .then(msg => {
                msg.delete(4000);
            });
    }

    const prefix = botconfig.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    const commandFile = client.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(client, message, args);

});

client.login(token);
