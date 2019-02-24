const Discord = require('discord.js');
const Client = Discord.Client;
const db = require('quick.db');
class DiscodeClient extends Client {
    /**
     * Create a new dis.code client
     * @constructor
     * @param {string} token - The token to login with, can be obtained from https://discordapp.com/developers/applications/[botid]/bots and click 'Copy' under token
     * @param {object} options - The options to initiate the client with, refer to https://discord.js.org/
     */
    constructor(token,options={}) {
        super(options)
        this.internal={
            storage: {
                persist: db,
                startOptions: options
            },
            token
        }
    }

    /**
     * Run when ready
     * @param {function} callback - Function to run once ready
     */
    ready(callback) {
        this.on('ready',()=>{callback()})
    }

    /**
     * Run your dis.code client
     */
    run() {
        super.login(this.internal.token)
    }
}
module.exports=DiscodeClient