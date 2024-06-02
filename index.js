const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const dotenv = require('dotenv');
dotenv.config();

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("messageCreate", function(message){
    if (message.content.startsWith(process.env.PREFIX)){
        if (message.content == "!help") {
            const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help Command')
            .setDescription('List of available commands:')
            .addFields({ name: '!help', value: 'Shows this help message' }) 
            .setFooter('StudyBot', 'bot.png');
            message.channel.send({ embeds: [helpEmbed] });
        }
    }
    message.channel.send("hi")
});

//---------------------------------------------------------------------------------//
//EVENTS HANDLER
//---------------------------------------------------------------------------------//
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

client.login(process.env.DISCORD_TOKEN);
//---------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------//
