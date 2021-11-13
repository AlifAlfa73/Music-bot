const { QueueRepeatMode } = require('discord-player');
const musicUtils = require('./musicutils/musicutils')

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        var prefix = client.config.app.px

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        var opt = args.join('').toLowerCase();
        var success = false;
        switch(opt){
            case 'queue':
                success = musicUtils.setLoopQueue(queue,opt);
                return message.channel.send(success ? `Repeat queue enabled. The whole queue will be repeated endlessly 🔁` : `Something went wrong ${message.author}... try again ? ❌`);
            case 'song':
                success = musicUtils.setLoopTrack(queue,opt);
                return message.channel.send(success ? `Repeat song enabled. The current music will be repeated endlessly 🔂` : `Something went wrong ${message.author}... try again ? ❌`);
            case 'off':
                success = queue.setRepeatMode(QueueRepeatMode.OFF);
                return message.channel.send(success ? `Repeat mode disabled` : `Something went wrong ${message.author}... try again ? ❌`);
            default :
                return message.channel.send(
                    `Please use \`${prefix}loop song\` to loop the song that is currently playing,` + 
                    ` \`${prefix}loop queue\` to loop the entire queue,` +
                    ` or \`${prefix}loop off\` to stop current loop.`);
        }
    },
};