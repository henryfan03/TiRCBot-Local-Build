const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Replies with server info!'),
	async execute(interaction) {
		if (interaction.member.roles.cache.some(role => role.name === 'moderator')) {
			await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nLanguage/Region: ${interaction.guildLocale}`)
		}
		else {
			await interaction.reply("Error: you do not have permission to use this command!");
		}
	},
};
