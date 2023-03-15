const { QueueRepeatMode, QueryType } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');
const musicUtils = require('./musicutils/musicutils');

module.exports = {
    name: 'playskip',
    description: "skip the current song and play a new song",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
	    await inter.deferReply();
        const res = await musicUtils.search(inter, QueryType.YOUTUBE);

        if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

        if(!res.playlist){
            const queue = await musicUtils.createQueue(player, inter);
            await inter.editReply({ content:`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`});
            await queue.addTrack(res.tracks[0]);
            if (!queue || !queue.playing){
                await musicUtils.voiceConnect(queue, inter);
                if (!queue.playing) await queue.node.play();
            }else{
                var loopSong = false;
                    if(queue.repeatMode === 1){
                        loopSong = true;
                        player.once('trackStart',(queue) =>{
                            if(loopSong) musicUtils.setLoop(queue,'song');
                        })
                    }
                    if(loopSong) musicUtils.setLoop(queue,'off');
                    const success = queue.skip();
            }
        }else{
            await inter.editReply({ content:`Do not insert playlist to queue next! Queue next only accept singular track`});
        }
    },
};
