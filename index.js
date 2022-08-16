// Require the necessary discord.js classes
const { Client, Collection, Intents, InteractionType, GuildChannelManager, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// When the client is ready, run this code (only once)
// client.once('ready', c => {
// 	console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// client.on('interactionCreate', async interaction => {
// 	if (interaction.type === InteractionType.ApplicationCommand) {
// 		const command = client.commands.get(interaction.commandName);
//
// 		if (!command) return;
//
// 		try {
// 			await command.execute(interaction);
// 			console.log(`Command: /${interaction.commandName} user by ${interaction.user.tag} with interaction# ${interaction.id}`);
// 		} catch (error) {
// 			console.error(error);
// 			console.log(`ERROR: Slash command ${interaction.commandName} by user: ${interaction.user.tag} with id ${interaction.id} has failed`);
// 			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 		}
// 	}
// 	else if (interaction.type === InteractionType.ModalSubmit) {
// 		console.log(interaction.fields.get);
// 		const title = interaction.fields.getTextInputValue('eventTitle');
// 		const description = interaction.fields.getTextInputValue('eventDescription');
// 		//console.log(`Modal Submission by ${interaction.user.tag} with interaction# ${interaction.id}`);
// 		console.log("Modal submission formdata displayed below:")
// 		console.log({ title, description });
// 		await interaction.reply({ content: 'Your submission was recieved successfully!' });
// 		const thread = await interaction.channel.threads.create({
// 			name: `${title}`,
// 			autoArchiveDuration: 60,
// 			reason: `${description}`,
// 		});
//
// 		console.log(`Created thread: ${thread.name}`);
		// client.channels.cache.get('996792207291981934').send(`Hello here! ${title} and ${description}`);
	// }
	// else if (interaction.type === InteractionType.MessageComponent) {
	//
	// }

// });

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
