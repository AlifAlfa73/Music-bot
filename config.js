
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
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
