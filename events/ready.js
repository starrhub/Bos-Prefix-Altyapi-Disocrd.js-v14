const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`${client.user.tag} başarıyla aktif edildi!`);
    
    client.user.setPresence({
        activities: [{
            name: "✨by Shell Co.",
            type: ActivityType.Playing
        }],
        status: "idle"
    });
};