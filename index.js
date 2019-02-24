module.exports={
    client: require('./base/client'),
    embed: require('discord.js').RichEmbed,
    error: require('./base/errors/error'),
    handlers: {
        main: require('./handlers/handler')
    }
};