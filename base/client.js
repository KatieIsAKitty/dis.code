const Discord = require('discord.js');
const db = require('keyv');
const superFile = require('../index.js');
const DiscodeError = superFile.error;

const Client = Discord.Client;
const persist = new db('sqlite://dis.code-storage.sqlite', {namespace: 'persist'});
const guildData = new db('sqlite://dis.code-storage.sqlite', {namespace: 'guildData'});
const userData = new db('sqlite://dis.code-storage.sqlite', {namespace: 'userData'});

class DiscodeClient extends Client {
    /**
     * Create a new dis.code client
     * @constructor
     * @param {string} token - The token to login with, can be obtained from https://discordapp.com/developers/applications/[botid]/bots and click 'Copy' under token
     * @param {object} options - The options to initiate the client with, refer to https://discord.js.org/
     */
    constructor(token,startOptions={
        prefix: '!',
        noparse: false
    }) {
        if((typeof options.ownerID)=='undefined'|(typeof options.ownerID)=='null'|options.ownerID.length<17|options.ownerID.length>20) throw new DiscodeError('Invalid \'ownerID\' startOption');
        super(options);
        this.internal={
            token,
            startOptions
        };
        this.storage={
            persist,
            guildData,
            userData
        };
    }

    /**
     * Run when ready
     * @param {function} callback - Function to run once ready
     */
    ready(callback) {
        this.on('ready',()=>{callback()});
    }

    /**
     * Runs when a message has been received and parsed
     * @param {function} callback
     */
    message(callback) {
        this.on('message',(message)=>{
            callback(require('index').handlers.main(this.internal.startOptions,message.content))
        });
    }

    /**
     * Run your dis.code client
     */
    run() {
        super.login(this.internal.token).catch((e)=>{throw new DiscodeError(e)});
    }
};
module.exports=DiscodeClient;