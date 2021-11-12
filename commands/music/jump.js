const musicUtils = require('./musicutils/musicutils')
module.exports = {
    name: 'jump',
    aliases: ['jmp'],
    utilisation: '{prefix}jump <track number>',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        var success = await musicUtils.jump(queue, args[0]-1);
        if(success){
            success = queue.skip();
        }

        return message.channel.send(success ? `Jumped to track no. ${args[0]} : ${queue.tracks[0].title} ✅` : `Something went wrong ${message.author}... try again ? ❌`);
    },
};