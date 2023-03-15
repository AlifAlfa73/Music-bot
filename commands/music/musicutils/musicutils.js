
const { QueryType } = require('discord-player');
const { QueueRepeatMode} = require('discord-player');

module.exports.search = async function(inter){
        const song = inter.options.getString('song'); 
        const source = inter.options.getInteger('source'); 
        var querytype = QueryType.YOUTUBE;
        try{
            if(source){
                switch(source){
                    case 0:
                        queryType = QueryType.AUTO;
                        break;
                    case 1:
                        querytype = QueryType.YOUTUBE;
                        break;
                    case 2:
                        querytype = QueryType.SPOTIFY_SEARCH;
                        break;
                    case 3:
                        querytype = QueryType.SOUNDCLOUD_SEARCH;
                        break;
                    //case 4:
                    //    querytype = QueryType.FACEBOOK;
                    //    break;
                    //case 5:
                    //    querytype = QueryType.VIMEO;
                    //    break;
                    //case 6:
                    //    querytype = QueryType.ARBITRARY;
                    //    break;
                    //case 7:
                    //    querytype = QueryType.APPLE_MUSIC_SONG
                    //    break;
                    default:
                        querytype = QueryType.YOUTUBE;
                }
            }
            var res = await this.searchQuery(inter, song, querytype);
        }catch(err){
            console.log(err);
        }

        return res
}

module.exports.searchQuery = async function(inter, song, querytype){
    var res = null;
    try{
        res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: querytype
        });
    }catch(err){
        console.log(err);
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


module.exports.createQueue = async function(player, inter){
    const queue = player.nodes.create(inter.guild, {
        metadata: {
            channel: inter.channel,
            client: inter.guild.members.me,
            requestedBy: inter.user,
        },
        selfDeaf: true,
        volume: client.config.opt.defaultvolume,
        leaveOnEmpty: client.config.opt.leaveOnEmpty,
        leaveOnEnd: client.config.opt.leaveOnEnd,
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
        case 'track':
            success = this.setLoopTrack(queue);
            break;
        case 'off':
            success = queue.setRepeatMode(QueueRepeatMode.OFF);
            break;
    }
    return success;
}

module.exports.skipLoopSong = async function (queue){
    await this.setLoop(queue,'off');
    var success = queue.skip();
    
    return success;
}

module.exports.voiceConnect = async function(queue, inter){
    try {
        if (!queue.connection) await queue.connect(inter.member.voice.channel);
    } catch {
        await player.nodes.delete(inter.guildId);
        return inter.editReply({ content: `I can't join the voice channel ${inter.member}... try again ? ❌`, ephemeral: true});
    }
}