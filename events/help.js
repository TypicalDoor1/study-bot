const { Client, Intents, MessageEmbed } = require('discord.js');
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  intents: [

  ]
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