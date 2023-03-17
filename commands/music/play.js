const { ApplicationCommandOptionType } = require('discord.js');
const musicUtils = require('./musicutils/musicutils');

module.exports = {
    name: 'play',
    description: "play a song!",
    voiceChannel: true,
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

    async execute({ inter, client }) {
        await inter.deferReply();
        const res = await musicUtils.search(inter);

        if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

        const queue = player.nodes.create(inter.guild, {
            metadata: {
                channel: inter.channel,
                client: inter.guild.members.me,
                requestedBy: inter.user,
            },
            selfDeaf: true,
            volume: client.config.opt.defaultvolume,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEnd: client.config.opt.leaveOnEnd,
        });

        try {
            if (!queue.connection) await queue.connect(inter.member.voice.channel);
        } catch {
            await player.deleteQueue(inter.guildId);
            return inter.editReply({ content: `I can't join the voice channel ${inter.member}... try again ? ❌`, ephemeral: true});
        }

       await inter.editReply({ content:`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`});

        res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.isPlaying()) await queue.node.play();
    },
};
