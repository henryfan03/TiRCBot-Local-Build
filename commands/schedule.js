const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('schedule an event!'),
	async execute(interaction) {
		if (interaction.member.roles.cache.some(role => role.name === 'moderator')) {
            const modal = new ModalBuilder()
				.setCustomId('formEntry')
				.setTitle('Event Creation Form');

			const favoriteColorInput = new TextInputBuilder()
				.setCustomId('eventTitle')
				.setLabel("Enter a title for this event:")
				.setStyle(TextInputStyle.Short);

			const hobbiesInput = new TextInputBuilder()
				.setCustomId('eventDescription')
				.setLabel("Enter a description for this event:")
				.setStyle(TextInputStyle.Paragraph);

			const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
			const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

			modal.addComponents(firstActionRow, secondActionRow);

			await interaction.showModal(modal);
			
        }
        else {
            await interaction.reply("Error: you do not have permission to use this command!");
        }
	},
};
