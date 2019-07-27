const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.run = async (client, message, args) => {


    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.sned(`***__ERROR__***\nYou do not have permission to use this command, ${message.author.toString()}`);
        return;
    }


    if (message.member.hasPermission('ADMINISTRATOR')) {

        message.guild.createChannel('modinator-logs')
            .then(() => {
                client.channels.find('name', 'modinator-logs').send('Thank you for adding me to your server! But before you go off, we need to lay down a rule. Or maybe 2.\n\n`1.)` **DO __NOT__ RENAME THIS CHANNEL!!!** _(and if you do, the bot will no longer be able to log things and mess up EVERY SERVER!)_\n\nAnd yeah, that\'s about it.\nThanks for actually looking.')
                    .then(msg => {
                        msg.pin();
                });
        });
    
    const doneEmbed = new Discord.RichEmbed()
        .setAuthor('Success!', client.user.displayAvatarURL)
        .setDescription('The Modinator Logs channel has been created and is ready for use!')
        .setColor('#386e36')

    message.reply('it was a success!')
        .then(msg => {
            msg.delete(5000);
        });

    message.channel.send(doneEmbed)
        .then(msg => {
            msg.delete(5000);
        });
    }
    

}


module.exports.help = {
    name: 'setup'
}