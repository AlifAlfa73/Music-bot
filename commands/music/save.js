const fs = require('fs');
const constants = require('../../constants/constants')
const fileIOUtils = require('../../utils/fileIOUtils')
const { EmbedBuilder } = require("discord.js");

function saveSong(message){
    message.author.send(`You saved the track ${queue.current.title} | ${queue.current.author} from the server ${message.guild.name} ✅`).then(() => {
        message.channel.send(`I have sent you the title of the music by private messages ✅`);
    }).catch(error => {
        message.channel.send(`Unable to send you a private message ${message.author}... try again ? ❌`);
    });

    return;
}

function savePlaylist(message, args, queue){
    
    var playlistName = args.join(" ");
     console.log("[Save] Saving playlist "+ playlistName);
     
     //Add every song URL in queue to be saved
     var songURLs = []
     songURLs.push(queue.current.url);

     for(var i = 0;i<queue.tracks.length;i++){
         songURLs.push(queue.tracks[i].url);
     }

     var savedPlaylist = {
         author : message.author.username,
         tracks : songURLs
     }

     var playslistFilePath = constants.PLAYLIST_PATH + playlistName + ".json";
     var jsonData = JSON.stringify(savedPlaylist);

     //Writing playlist to be saved
     console.log("[Save] Writing Playlist " + playlistName);
     fileIOUtils.writeFile(playslistFilePath,jsonData, function(err) {
         if(err){
             if(err = "Already Exist"){
                 message.channel.send('Playlist already exists');
             }
             message.channel.send('Error saving playlist '+ playlistName);
             return;
         }

         message.channel.send('Playlist ' + playlistName + " has been saved");
     });
}



module.exports = {
    name: 'save',
    description: 'save the current track!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `No music currently playing ${inter.member}... try again ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Duration:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Song by:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'Views :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'Song URL:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`from the server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.reply({ content: `I have sent you the title of the music by private messages ✅`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `Unable to send you a private message... try again ? ❌`, ephemeral: true });
        });
    },
};