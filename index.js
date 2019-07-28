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
    client.user.setActivity(`you do mod!help | vBeta`, {type: 'WATCHING'});
});

client.on('destroy', () =>{
    client.login(token);
});

client.on('message', message => {

    function emoji (id) {
        return client.emojis.get(id).toString();
    }

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.content === 'what is the date') {
        message.delete(1);
        const date = new Date().toUTCString();
        message.reply(`${date} ${emoji('602343210374922281')}`)
            .then(msg => {
                msg.delete(6000);
            });
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


    const prefix = botconfig.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    const commandFile = client.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(client, message, args);

});

client.on("guildCreate", guild => {
    guild.owner.sendMessage('Thank you for adding me! I\'m sure it will be a pleasure working alongside you and your sevrer\nBut there is jut _one_  tiny little thing I need you to do for me\n\n**1.)** Go to any channel that I have access to\n**2.)** Do the simple command `m!setup`\n\nAnd **__BOOM__** we\'re all good to go\nThank you again!');
});

client.login(token);
