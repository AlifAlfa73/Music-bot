const musicUtils = require('./musicutils/musicutils');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: false,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const query = args.join(' ');
        const res = await musicUtils.search(message,query);

        if(res){
            await message.channel.send(res.tracks[0].url);
        }else{
            await message.channel.send(`Fail to search for ${query}`)
        }        
    },
};