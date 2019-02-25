'use strict';

const parse = require('discord-argument-flag-parser');

module.exports = (startOptions, message) => {
  if (startOptions.noParse) {
    return message;
  }
  const data = parse(startOptions.prefix, message);
  const { cmd, args, flags } = data;
  const raw = message;
  return { cmd, args, flags, raw };
};
