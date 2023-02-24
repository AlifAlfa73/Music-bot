const { QueryType } = require('discord-player');

module.exports = {
    name: 'queuenext',
    aliases: ['qn'],
    utilisation: '{prefix}queuenext [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ? ❌`);
        
        if(!res.playlist){
            const queue = await player.createQueue(message.guild, {
                ytdlOptions: {
                    quality: "highest",
                    filter: "audioonly",
                    highWaterMark: 1 << 25,
                    dlChunkSize: 0,
                },
                metadata: message.channel
            });
    
    
            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
            }
            
            await message.channel.send(`Inserting track ${res.tracks.title} to be played next... 🎧`);4
            queue.insert(res.tracks[0],0);
        }else{
            message.channel.send(`Do not insert playlist to queue next! Queue next only accept singular track`);
        }
    },
};