const { EmbedBuilder } = require('discord.js');

module.exports = {
    conf: {
        aliases: ['p', 'latency', 'ms'],
        permLevel: 0,
        category: "Bot"
    },

    help: {
        name: 'ping',
        description: 'Botun anlık ping değerlerini gösterir',
        usage: 'ping'
    },

    run: async (client, message, args) => {
        const start = Date.now();
        
        const embed = new EmbedBuilder()
            .setColor('#2F3136')
            .setAuthor({ 
                name: 'Ping Ölçülüyor...', 
                iconURL: message.author.displayAvatarURL({ dynamic: true }) 
            })
            .setDescription('Lütfen bekleyin, ping değerleri hesaplanıyor...');

        message.channel.send({ embeds: [embed] }).then(msg => {
            const end = Date.now();
            const botLatency = end - start;
            
            const newEmbed = new EmbedBuilder()
                .setColor('#2F3136')
                .setAuthor({ 
                    name: 'Ping Değerleri', 
                    iconURL: client.user.displayAvatarURL() 
                })
                .addFields(
                    { 
                        name: '📶 Bot Gecikmesi:', 
                        value: `\`${botLatency}ms\``, 
                        inline: true 
                    },
                    { 
                        name: '🌐 WebSocket Gecikmesi:', 
                        value: `\`${client.ws.ping}ms\``, 
                        inline: true 
                    },
                    { 
                        name: '⏰ Mesaj Gecikmesi:', 
                        value: `\`${Date.now() - message.createdTimestamp}ms\``, 
                        inline: true 
                    }
                )
                .setFooter({ 
                    text: `${message.author.tag} tarafından istendi`, 
                    iconURL: message.author.displayAvatarURL({ dynamic: true }) 
                })
                .setTimestamp();

            let status;
            if (client.ws.ping < 100) status = "🟢";
            else if (client.ws.ping < 200) status = "🟡";
            else if (client.ws.ping < 400) status = "🟠";
            else status = "🔴";

            newEmbed.setDescription(`${status} Genel Durum: ${client.ws.ping < 100 ? "Mükemmel" : client.ws.ping < 200 ? "İyi" : client.ws.ping < 400 ? "Orta" : "Kötü"}`);

            setTimeout(() => {
                msg.edit({ embeds: [newEmbed] });
            }, 500);
        });
    }
};