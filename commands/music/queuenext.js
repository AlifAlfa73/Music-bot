// TODO: Convert this to slash command version
// const { QueryType } = require('discord-player');

// module.exports = {
//     name: 'queuenext',
//     aliases: ['qn'],
//     utilisation: '{prefix}queuenext [song name/URL]',
//     voiceChannel: true,

//     async execute(client, message, args) {
//         if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

//         const res = await musicUtils.search(message,args.join(' '));

//         if(!res){
//             return message.channel.send(`No results found ${message.author}... try again ? ❌`);
//         }
        
//         if(!res.playlist){
//             const queue = await musicUtils.createQueue(player,message);

//             await message.channel.send(`Inserting track ${res.tracks[0].title} to be played next... 🎧`);4
//             queue.insert(res.tracks[0],0);

//             if (!queue || !queue.playing){
//                 await musicUtils.voiceConnect(message,queue);
//                 await queue.play();
//             }
//         }else{
//             message.channel.send(`Do not insert playlist to queue next! Queue next only accept singular track`);
//         }
//     },
// };

// placeholder
module.exports = {
    name: 'queuenext',
    description: 'Insert track to be played next',
    voiceChannel: true,

    execute({ inter }) {
        inter.reply({ content: `placeholder` });
    },
};