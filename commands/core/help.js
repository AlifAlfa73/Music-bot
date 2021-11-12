const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    showHelp: false,
    utilisation: '{prefix}help',

    execute(client, message, args) {
        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const commands = client.commands.filter(x => x.showHelp !== false);
        var desc = 'This code comes from a GitHub project [ZerioDev/Music-bot](https://github.com/ZerioDev/Music-bot).\nThe use of this one is possible while keeping the credits for free.\nIf you want to remove the credits join the Discord support server.\n\n'
        desc = desc + '**Supports** : Youtube Track, Youtube Playlist, Spotify Track, Spotify Playlist, Soundcloud Track\n';
        desc = desc + '**Not Supported** : Soundcloud Playlist';

        embed.setDescription(desc);
        embed.addField(`Enabled - ${commands.size}`, commands.map(x => `\`${x.name}${x.aliases[0] ? ` (${x.aliases.map(y => y).join(', ')})\`` : '\`'}`).join(' | '));

        embed.setTimestamp();
        embed.setFooter('Music comes first - Made with heart by Zerio ❤️, Edited with heart by PPUKJ ❤️ UwU', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};