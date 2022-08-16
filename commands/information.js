const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('information')
		.setDescription('Replies with general bot information!'),
	async execute(interaction) {
		const exampleEmbed = {
			color: 2631549,
			author: {
			name: 'CUNY Codes Discord Bot',
			//topside icon
			icon_url: 'https://kahoot.com/files/2020/09/cuny-logo.png',
			url: 'https://twitter.com/cunycodes?lang=en',
			},
			description: '@cunycodes on twitter',
			thumbnail: {
				//top right
				url: 'https://pbs.twimg.com/profile_images/949009598408663040/Avm_aSoU_400x400.jpg',
			},
			fields: [
				{
					name: 'CUNY Codes',
					value: '#CUNYCodes is one of many programs offered by the #CUNY Career Success Initiatives. Follow the twitter accounts below for opportunities in tech!',
				},
				{
					name: '\u200b',
					value: '\u200b',
					inline: false,
				},
				{
					name: 'Career Success Initiatives',
					value: '@CUNY_Works',
					inline: true,
				},
				{
					name: 'CUNY Tech',
					value: '@CUNYTech',
					inline: true,
				},
				{
					name: 'CUNY Career Meetups',
					value: '@CunyMeetups',
					inline: true,
				},
			],
			image: {
				//big image on bottom
				url: 'https://pbs.twimg.com/profile_banners/713366697110016000/1515096517/1500x500',
			},
			timestamp: new Date(),
			footer: {
				text: 'Brought to you by the TiRC DevOps team',
				icon_url: 'https://kahoot.com/files/2020/09/cuny-logo.png',
			},
		};
		await interaction.reply({ embeds: [exampleEmbed]});
	},
};
