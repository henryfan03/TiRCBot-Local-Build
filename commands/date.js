const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('date')
		.setDescription('Replies with the current date and time!'),
	async execute(interaction) {
		Date.prototype.today = function () {
		    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
		}
		Date.prototype.timeNow = function () {
		     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
		}
		var newDate = new Date().toLocaleString();
		var datetime = "Current Date: " + newDate;
		await interaction.reply(datetime);
	},
};
