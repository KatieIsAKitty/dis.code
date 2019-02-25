module.exports={
    client: require('./base/client'),
    embed: require('discord.js').RichEmbed,
    handlers: {
        main: require('./handlers/handler')
    }
};