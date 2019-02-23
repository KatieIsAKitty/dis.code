const Discord = require('discord.js');
const Client = Discord.Client;
const keyv = require('keyv');
class DiscodeClient extends Client {
    /**
     * Create a new dis.code client
     * @constructor
     * @param {string} token - The token to login with, can be obtained from https://discordapp.com/developers/applications/[botid]/bots and click 'Copy' under token
     * @param {object} options - The options to initiate the client with, refer to https://discord.js.org/
     */
    constructor(token,options={}) {
        super(options)
        this.storage={}
        this.storage.startOptions=options
        this.auth.token=token
        this.storage.persist
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
        super.login(this.auth.token)
    }
}
module.exports=DiscodeClient