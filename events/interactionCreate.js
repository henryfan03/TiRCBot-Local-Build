const { InteractionType } = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		if (interaction.type === InteractionType.ApplicationCommand) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				command.execute(interaction);
				Date.prototype.today = function () {
				    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
				}
				Date.prototype.timeNow = function () {
				     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
				}
				var newDate = new Date().toLocaleString();
				console.log(`Command: /${interaction.commandName} used by ${interaction.user.tag} at ${newDate}`);
			} catch (error) {
				console.error(error);
				console.log(`ERROR: Slash command ${interaction.commandName} by user: ${interaction.user.tag} with id ${interaction.id} has failed`);
				interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
				return;
			}
		}
		else {
			//interaction.deferUpdate();
			console.log(`INFO: ${interaction.user.tag} in #${interaction.channel.name} triggered a modal submission.`);
	    if (interaction.type === InteractionType.ModalSubmit) {
				console.log(interaction.customId);
				const title = interaction.fields.getTextInputValue('eventTitle');
				const description = interaction.fields.getTextInputValue('eventDescription');
				console.log("Modal submission formdata displayed below:")
				console.log({ title, description });
				const thread =  interaction.channel.threads.create({
					name: `${title}`,
					autoArchiveDuration: 60,
					reason: `${description}`,
				});
				console.log(`Created thread: ${title}`);
				return;
	    }
		}
	}
}
