const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

	message.delete(1);

	function emoji (id) {
        return client.emojis.get(id).toString();
	}
	
	const done = new Discord.RichEmbed()
		.setAuthor('Done! ' + emoji('602343210374922281'), client.user.displayAvatarURL)
		.setColor('#386e36')

	if(!message.member.hasPermission('MANAGE_MESSAGES')) {
		message.channel.send(`***__ERROR__***\nYou do not have permission to use this command, ${message.author.toString()}`)
			.then(msg => {
				msg.delete(5000);
			});
			return;
	}
	if(!args[0]) {
		message.channel.send(`***__ERROR__***\nYou must enter a number, ${message.author.toString()}`)
			.then(msg => {
				msg.delete(5000);
			});
			return;
	}
	if(message.member.hasPermission('MANAGE_MESSAGES')) {
		message.channel.bulkDelete(args[0])
			.then(() => {
				message.channel.send(done)
					.then(msg => {
						msg.delete(3000);
					});
			});
	}


}

module.exports.help = {
	name: "purge"
}