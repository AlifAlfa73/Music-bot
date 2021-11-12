
const { QueryType } = require('discord-player');
const { QueueRepeatMode, Queue } = require('discord-player');

module.exports.search = async function(message,param){ 
        const res = await player.search(param, {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length){
            return null;
        }
        return res;
}

module.exports.createQueue = async function(player, message){
    const queue = await player.createQueue(message.guild, {
        ytdlOptions: {
            quality: "highest",
            filter: "audioonly",
            highWaterMark: 1 << 25,
            dlChunkSize: 0,
        },
        metadata: message.channel
    });

    return queue;
}

module.exports.setLoopQueue = async function(queue){
    var success = false;
    switch (queue.repeatMode){
        case 0:
            success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
            break;
        case 1:
            queue.setRepeatMode(QueueRepeatMode.OFF);
            success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
            break;
        case 2:
            success = true;
            break;
        default:
            success = false;
    }
    return success;
}

module.exports.setLoopTrack = async function(queue){
    var success = false;
    switch (queue.repeatMode){
        case 0:
            success = queue.setRepeatMode(QueueRepeatMode.TRACK);
            break;
        case 1:
            success = true;
            break;
        case 2:
            queue.setRepeatMode(QueueRepeatMode.OFF);
            success = queue.setRepeatMode(QueueRepeatMode.TRACK);
            break;
        default:
            success = false;
    }
    return success;
}

module.exports.setLoop = async function(queue, loopType){
    var success = false;
    switch(loopType){
        case 'queue':
            success = this.setLoopQueue(queue);
            break;
        case 'song':
            success = this.setLoopTrack(queue);
            break;
        case 'off':
            success = queue.setRepeatMode(QueueRepeatMode.OFF);
            break;
    }
    return success;
}

module.exports.voiceConnect = async function(message, queue){
    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await player.deleteQueue(message.guild.id);
        return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
    }
}