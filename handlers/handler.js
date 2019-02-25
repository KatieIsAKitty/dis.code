const parse = require('discord-argument-flag-parser');
module.exports=(startOptions,message)=>{
    if(startOptions.noParse) return message;
    let data = parse(startOptions.prefix, message);
    let {cmd, args, flags} = data;
    let raw = message;
    return {cmd, args, flags, raw};
}