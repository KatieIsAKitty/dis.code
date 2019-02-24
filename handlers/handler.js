const parse = require('discord-argument-flag-parser');
module.exports=(message,startOptions)=>{
    if(startOptions.noParse) return message;
    let data = parse(startOptions.prefix, message.content);
    let {cmd, args, flags} = data;
    let raw = message;
    return {cmd, args, flags, raw};
}