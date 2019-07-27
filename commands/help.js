const Discord = require('discord.js');


module.exports.run = async (client, message, args) => {

	const author0 = message.member.displayName;
	const author1 = message.author.toString();

	if (!message.member.hasPermission("ADMINISTRATOR")) {
		const commEmbed0 = new Discord.RichEmbed()
			.setAuthor(`Here are the commands available to you ${author0}!`)
			.setColor('RANDOM')
			.addField('__m!help__', '_This command will send you a message of all commands_\n**Use:** m!help')
			.setThumbnail(message.author.displayAvatarURL)
			.setFooter('Sent')
			.setTimestamp([new Date().toUTCString()])
		message.channel.send(`You've got mail ${message.author.toString()}! 📬`);
		message.author.sendMessage(commEmbed0);
	}
	if (message.member.hasPermission('ADMINISTRATOR')) {
		const commEmbed0 = new Discord.RichEmbed()
			.setAuthor(`Here are the commands available to you ${author0}!`)
			.setColor('RANDOM')
			.addField('__m!help__', '_This command will send you a message of all commands_\n**Use:** m!help')
			.setThumbnail(message.author.displayAvatarURL)
			.setFooter('Sent')
			.setTimestamp([new Date().toUTCString()])
		message.channel.send(`You've got mail ${message.author.toString()}! 📬`);
		message.author.sendMessage(commEmbed0);

		const commEmbed1 = new Discord.RichEmbed()
			.setAuthor(`And since you are an admin, ${author0}, you can use these commands!`)
			.setColor('RANDOM')
			.addField('__m!kick__', '_This command will kick the user that you stated_\n**Use:** m!kick [user] [reason]')
			.addField('__m!ban__', '_This command will ban the user that that you stated_\n**Use:** m!ban [user] [reason]')
			//.addField('__m!mute__', '_This command will mute the user that you stated_\n**Use:** m!mute [user]')
			//.addField('__m!unmute__', '_This command will unmute the user that you stated_\n**Use:** m!unmute [user]')
			.addField('__m!purge__', 'This command will delete the amount of messages you stated\n**Use:** m!purge [amount]')
			.setFooter('Sent')
			.setTimestamp([new Date().toUTCString()])
		message.author.sendMessage(commEmbed1);
	}
	

}



module.exports.help = {
	name: 'help'
}
