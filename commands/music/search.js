const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'playsearch',
    aliases: ['psh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'the song you want to search',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `No results found ${inter.member}... try again ? ❌`, ephemeral: true });

        return inter.reply({content: `${res.tracks[0]}`})

        // collector.on('collect', async (query) => {
        //     if (query.content.toLowerCase() === 'cancel') return inter.followUp({ content: `Search cancelled ✅`, ephemeral: true }), collector.stop();
        // });

        // collector.on('end', (msg, reason) => {
        //     if (reason === 'time') return inter.followUp({ content:`Search timed out ${inter.member}... try again ? ❌`, ephemeral: true })
        // });
    },
};