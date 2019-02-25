'use strict';

const { Client } = require('discord.js');
const db = require('keyv');

const persist = new db('sqlite://dis.code-storage.sqlite', { namespace: 'persist' });
const guildData = new db('sqlite://dis.code-storage.sqlite', { namespace: 'guildData' });
const userData = new db('sqlite://dis.code-storage.sqlite', { namespace: 'userData' });

class DiscodeClient extends Client {
  /**
   * Create a new dis.code client
   * @constructor
   * @param {string} token - The token to login with, can be obtained from https://discordapp.com/developers/applications/[botid]/bots and click 'Copy' under token
   * @param {object} options - The options to initiate the client with, refer to https://discord.js.org/
   */
  constructor(token, startOptions = {
    prefix: '!',
    noparse: false,
  }) {
    if ((typeof startOptions.ownerID) === 'undefined') {
      throw Error('Invalid \'ownerID\' startOption type');
    }
    if (startOptions.ownerID.length < 17 | startOptions.ownerID.length > 20) {
      throw Error('Invalid \'ownerID\' startOption length');
    }
    super(startOptions);
    this.internal = {
      token,
      startOptions,
    };
    this.storage = {
      persist,
      guildData,
      userData,
    };
  }

  /**
   * Run when ready
   * @param {function} callback - Function to run once ready
   */
  ready(callback) {
    this.on('ready', () => {
      callback();
    });
  }

  /**
   * Runs when a command has been received and parsed
   * @param {function} callback
   */
  command(callback) {
    this.on('message', (message) => {
      const data = require('../index').handlers.main(this.internal.startOptions, message.content);
      if (!data.cmd) {
        return;
      }
      callback(data);
    });
  }

  /**
   * Run your dis.code client
   */
  run() {
    super.login(this.internal.token).catch((e) => {
      throw Error(e);
    });
  }
}

module.exports = DiscodeClient;
