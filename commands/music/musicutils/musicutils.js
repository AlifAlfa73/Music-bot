
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

//custom shuffle since discord-player shuffle doesn't shuffle current track
module.exports.shuffle = async function(queue){
    for (let i = queue.tracks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [queue.tracks[i], queue.tracks[j]] = [queue.tracks[j], queue.tracks[i]];
    }
    return queue;
}

//custom jump since discord-player jump is bugged
//move a track in queue to the next to play (index 1)
module.exports.jump = async function(queue, idx){
    // remove the track if exists
    const foundTrack = queue.remove(queue.tracks[idx]);
    if (!foundTrack)
        return false;
    // since we removed the existing track from the queue,
    // we now have to place that to position 1
    // because we want to jump to that track
    // this will skip current track and play the next one which will be the foundTrack
    queue.tracks.splice(0, 0, foundTrack);
    return true;
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