
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env`
require('dotenv').config({ path: envFile} )

module.exports = {
    app: {
        px: process.env.PREFIX,
        token: process.env.BOT_TOKEN,
        playing: 'by PPUKJ ❤️'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
