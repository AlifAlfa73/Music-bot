const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');
const musicUtils = require('./musicutils/musicutils');

module.exports = {
    name: 'playnext',
    description: "song you want to playnext",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to playnext',
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
        const queue = player.nodes.get(inter.guildId);

        if (!queue || !queue.isPlaying()) return inter.editReply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        const res = await musicUtils.search(inter);

        if (!res || !res.tracks.length) return inter.editReply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

       if (res.playlist) return inter.editReply({ content: `This command dose not support playlist's ${inter.member}... try again ? ❌`, ephemeral: true });

        queue.insertTrack(res.tracks[0], 0)

        await inter.editReply({ content:`Track has been inserted into the queue... it will play next 🎧`});

    }
}
