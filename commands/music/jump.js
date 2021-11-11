module.exports = {
    name: 'jump',
    aliases: ['jmp'],
    utilisation: '{prefix}jump <track number>',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        message.channel.send(`**WARNING** Jump is bugged on the player library and fix is not yet deployed for public use. Refer to : <https://github.com/Androz2091/discord-player/pull/872>`);

        queue.jump(queue.tracks[args[0]-1]);

        return message.channel.send(`Jumped to track no. ${args[0]-1} : ${queue.tracks[args[0]-1].title} ✅`);
    },
};