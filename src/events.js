const log = require('../utils/logUtils');

player.on('error', (queue, error) => {
    log.info(`Error from [${queue.guild.name}/${queue.connection.channel.name}|${queue.guild.id}]`);
    log.error(`Printing Error object`)
    console.log(error);
    if(queue){
        queue.metadata.send(`Error happened when try to play song ${queue.current.title}, skipping... ❌`); 
        if(queue.playing){
            var success = queue.skip();
            if(!success){
                queue.destroy();
                queue.metadata.send(`Fail to skip song, disconnecting .... ❌`);
            }
        }else{
            queue.destroy();
            queue.metadata.send(`Fail to skip song, disconnecting .... ❌`);
        }
    }
});

player.on('connectionError', (queue, error) => {
    log.error(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    log.info(`Playing song [${track.title}] in [${queue.guild.name}/${queue.connection.channel.name}|${queue.guild.id}] requested by : [${track.requestedBy.username}|${track.requestedBy.id}]`);
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`Started playing **${track.title}** in **${queue.connection.channel.name}** 🎧`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`Track ${track.title} added in the queue ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('I was manually disconnected from the voice channel, clearing queue... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Nobody is in the voice channel, leaving the voice channel... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('I finished reading the whole queue ✅');
});