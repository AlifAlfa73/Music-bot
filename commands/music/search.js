const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');
const musicUtils = require('./musicutils/musicutils');

module.exports = {
    name: 'search',
    aliases: ['sh'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const res = await musicUtils.search(message,args.join(' '));
        const queue = await musicUtils.createQueue(player,message);

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setAuthor(`Results for ${args.join(' ')}`, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelect choice between **1** and **${maxTracks.length}** or **cancel** ⬇️`);

        embed.setTimestamp();
        embed.setFooter('Music comes first - Made with heart by Zerio ❤️', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Search cancelled ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Invalid response, try a value between **1** and **${maxTracks.length}** or **cancel**... try again ? ❌`);

            collector.stop();

            await musicUtils.voiceConnect(message, queue);

            await message.channel.send(`Loading your search... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.channel.send(`Search timed out ${message.author}... try again ? ❌`);
        });
    },
};