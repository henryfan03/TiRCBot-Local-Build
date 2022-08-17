const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-thread')
    .addStringOption(option =>
  		option.setName('threadname')
  			.setDescription('Name of thread to delete')
  			.setRequired(true))
    .setDescription('Deletes a thread from a channel'),
	async execute(interaction) {
		if (interaction.member.roles.cache.some(role => role.name === 'moderator')) {
			const threadName = interaction.options.getString('threadname');
			try {
				//interaction.deferReply();
				const thread = interaction.channel.threads.cache.find(x => x.name === `${threadName}`);
				thread.delete();
				interaction.reply(`Thread "${threadName}" deleted successfully`);
				console.log(`User ${interaction.user.tag} deleted thread: ${threadName}`);
			}
			catch {
				interaction.reply(`ERROR: Thread "${threadName}" could not be deleted because it was not found.`);
				console.log(`FATAL: Error deleting thread: ${threadName} not found.`);
				//console.log(err);
			}
		}
		else {
			await interaction.reply("Error: you do not have permission to use this command!");
		}
	},
};
