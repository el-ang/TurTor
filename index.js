const Discord = require("discord.js");
const bot = new Discord.Client();
const ytdl = require("ytdl-core");
const color = require("./color.json");

var prefix = "r.";
var server = {};
var owner = "roy.exe#9106";

bot.on("ready", () => {
    console.log("Bot is ready!");
    bot.user.setActivity(prefix, 3).catch(console.error);
})

bot.on("message", msg => {
    let args = msg.content.substring(prefix.length).split(" ");

    function path(type) {
        switch (type){
            case "vc":
                var category = `${msg.member.voice.channel.parent.name}/${msg.member.voice.channel.name}`
                var fixed = category.replace("#", "")
                var voicePath = new Discord.MessageEmbed()
                    .setTitle("Path:")
                    .setDescription(`${msg.guild}${fixed}`)
                    .setColor(color.turquoise)
                msg.channel.send(voicePath)
                break;
            case "txt":
                var category = msg.channel.parent.name
                var fixed = category.replace("#", "")
                var textPath = new Discord.MessageEmbed()
                    .setTitle("Path:")
                    .setDescription(`${msg.guild}${fixed}${msg.channel}`)
                    .setColor(color.navy)
                msg.channel.send(textPath)
                break;
        }
    }
    function hlp(n, how, nb, ex, uses) {
        var fixed = args[n].charAt(0).toUpperCase() + args[n].slice(1)
        var help = new Discord.MessageEmbed()
            .setTitle(`:grey_exclamation: ${fixed} Command`)
            .setDescription("Your current prefix: " + prefix)
            .addFields(
                {name: "How to use:", value: how},
                {name: "Note:", value: nb},
                {name: "Example:", value: ex},
                {name: "Uses:", value: uses}
            )
            .setColor(color.fog)
            .setFooter("Ralph - Bot by " + owner, "https://cdn.discordapp.com/avatars/668427384910905354/bcb63798e5cf8db7a1cc1fd182a1acdd.png?size=128")
        msg.channel.send(help);
    }
        var botProfile = new Discord.MessageEmbed()
            .setTitle("Ralph")
            .setThumbnail(bot.user.displayAvatarURL("png"))
            .setColor(color.red)
            .setDescription("Music Bot")
            .addField("For more info:", "https://instagram.com/_roy.exe?igshid=fnrgz9s1j2y9")
            .setFooter("By " + owner);

    switch (args[0]) {
        case "play":
        case "pl":
            if (!args[1]) {
                msg.channel.send("Please, set the name or the link of the music!")
                return;
            }
            else {
                if (!msg.member.voice.channel) {
                msg.channel.send("You must in a voice channel! So the bot isn\"t alone. :>")
                return;
                }
                else {
                    msg.channel.send("Playing " + args[1] + "...")
                    msg.member.voice.channel.join()
                        .then(connection => console.log(`Connected!${msg.member.guild.name}${msg.member.voice.channel.parent.name}/${msg.member.voice.channel.name}`))
                        .catch(console.error)
                    path("vc")
                }
            }
            if (!server[msg.guild.id]) server[msg.guild.id] = {
                queue: []
            }
            var server = server[msg.guild.id];
            if (!msg.guild.voice.connection) msg.member.voice.channel
            break;
        case "checkup":
        case "c.up":
            msg.channel.send("Bot is Online! :thumbsup:")
            msg.channel.send(botProfile)
            break;
        case "pause":
        case "ps":
            msg.channel.send("Queue paused")
            break;
        case "disconnect":
        case "dc":
            msg.channel.send("Successfully disconnected")
            path("vc")
            msg.member.voice.channel.leave()
            break;
        case "leave":
        case "lv":
            msg.channel.send(`Ralph left the ${msg.member.voice.channel.name}`)
            path("vc")
            msg.member.voice.channel.leave()
            break
        case "connect":
        case "join":
        case "j+":
        case "c+":
            if (!msg.member.voice.channel) {
                msg.channel.send("You must in a voice channel! So the bot isn\"t alone. :>")
                return;
            }
            else {
                msg.channel.send("Joining channel...")
                msg.member.voice.channel.join()
                    .then(connection => console.log(`Connected!${msg.member.guild.name}${msg.member.voice.channel.parent.name}/${msg.member.voice.channel.name}`))
                    .catch(console.error)
                path("vc");
            }
            break;
        case "help":
        case "!":
        case "?":
            switch (args[1]) {
                case (args[0]):
                    msg.channel.send("This command can\"t be done twice :x:")
                    break;
                default:
                    hlp(0, "(prefix)help (command_name)", "- command_name can\"t be command_aliases\n- If there is no input for command_name, it will explain the uses of \"Help Command\"\n- This command can\"t be done twice :x:", `- ${prefix}${args[0]}\n- ${prefix}${args[0]} play`, "To explain any uses or information of the command")
                    break;
            }
            break;
        case "create":
            msg.guild.channels.create(args[1], "voice")
            break;
    }
})

bot.login(token);