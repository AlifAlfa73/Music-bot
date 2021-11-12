const playlistUtils = require('./musicutils/playlistutils');

module.exports = {
    name: 'playlist',
    aliases: ['pl'],
    utilisation: '{prefix}playlist option [playlist name]',
    voiceChannel: true,

    async execute(client, message, args) {
        var params = args.join(" ");
        console.log(`[Playlist] menu called by ${message.author.username}(${message.author}), params ${params}`);

        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);
        var opt = args[0].toLowerCase();
        var queue = player.getQueue(message.guild.id);
        switch (opt){
            case 'save':
                if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);
                playlistUtils.savePlaylist(message,args.slice(1),queue);
                break;
            case 'load':
                await playlistUtils.loadPlaylist(message,args.slice(1), queue);
                break;
            case 'loadshuffle':
                await playlistUtils.loadShufflePlaylist(message,args.slice(1), queue);
                break;
            case 'delete':
                playlistUtils.deletePlaylist(message,args.slice(1));
                break;
            case 'list':
                playlistUtils.listPlaylist(message);
                break;
            case 'info':
                playlistUtils.infoPlaylist(message,args.slice(1));
                break;
            default :
                return message.channel.send(`No such option for this command`);
        }
    },
};