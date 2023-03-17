const { ApplicationCommandOptionType } = require('discord.js');
const musicUtils = require('./musicutils/musicutils');

module.exports = {
    name: 'search',
    description: "Search youtube for a song",
    voiceChannel: false,
    options: [
        {
            name: 'song',
            description: 'the song you want to play',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'source',
            description: 'song source',
            type: ApplicationCommandOptionType.Integer,
            choices: [
                {name: 'Youtube', value: 1},
                {name: 'Spotify', value: 2},
                {name: 'Soundcloud', value: 3}
            ],
            required: false,
        }
    ],

    async execute({ inter }) {
        await inter.deferReply();
        //const song = inter.options.getString('song');
        
        const res = await musicUtils.search(inter);

        if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

        //const queue = await player.createQueue(inter.guild, {
        //    metadata: inter.channel,
        //    spotifyBridge: client.config.opt.spotifyBridge,
        //    initialVolume: client.config.opt.defaultvolume,
        //    leaveOnEnd: client.config.opt.leaveOnEnd
        //});

        //try {
        //    if (!queue.connection) await queue.connect(inter.member.voice.channel);
        //} catch {
        //    await player.deleteQueue(inter.guildId);
        //    return inter.editReply({ content: `I can't join the voice channel ${inter.member}... try again ? ❌`, ephemeral: true});
        //}

       await inter.editReply({ content:`${res.tracks[0].url}`});

        //res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        //if (!queue.playing) await queue.play();
    },
};
