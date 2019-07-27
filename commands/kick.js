const Discord = require('discord.js');
const client = new Discord.Client();


module.exports.run = async (client, message, args) => {
	message.delete(1);

    const issuer = message.member;
    const issuerN = message.member.displayName;
	const kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	const logChannel = client.channels.find('name', 'modinator-logs');
    const reason = args.join(" ").slice(22);

    function emoji (id) {
        return client.emojis.get(id).toString();
    }
    

    if(!issuer.hasPermission('KICK_MEMBERS')) {
        message.channel.send(`***__ERROR__***\nYou do not have permission to use this command, ${message.author.toString()}`)
            .then(msg => {
                msg.delete(5000);
            });
        return;
    }


    if(issuer.hasPermission('KICK_MEMBERS')) {

        if (!kUser) {
            message.channel.send(`***__ERROR__***\nYou must enter a user, ${message.author.toString()}`)
                .then(msg => {
                    msg.delete(5000);
                });
            return;
        }
        if (kUser.hasPermission('ADMINISTRATOR')) {
            message.channel.send(`***__ERROR__***\nYou cannot kick an admin, ${message.author.toString()}`)
                .then(msg => {
                    msg.delete(5000);
                });
            return;
        }
        if(!reason) {
            message.channel.send(`***__ERROR__***\nYou must enter a reason, ${message.author.toString()}`)
                .then(msg => {
                    msg.delete(5000);
                });
            return;
        }

        
        const success = new Discord.RichEmbed()
            .setAuthor('Done!')
            .setDescription(`${kUser} hab been kicked! ${emoji('602343210374922281')}`)
            .setColor('#386e36')
        message.channel.send(success)
            .then(msg => {
                msg.delete(6000);
            });
        
        const kickEmbed = new Discord.RichEmbed()
            .setAuthor(`"${issuerN}" used kick`, message.author.displayAvatarURL)
            .addField('Person Kicked:', `${kUser}`, true)
            .addField('Kicked By:', `${issuer}`, true)
            .addField('Kicked For:', `${reason}`, true)
            .addField('Kicked in Channel:', `${message.channel}`, false)
            .setColor('RED')
        logChannel.send(kickEmbed)

        message.guild.member(kUser).kick(reason);

    }

}


module.exports.help = {
    name: "kick"
}