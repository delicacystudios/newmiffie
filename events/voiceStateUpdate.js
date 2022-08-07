const { VoiceState } = require('discord.js');

module.exports = async (oldsState, newState, client) => {
  const { member, guild } = newState;
  const oldChannel = oldsState.channel;
  const newChannel = newState.channel;
  const joinToCreate = "";

  if (oldsState !== newChannel && newChannel && newChannel.id === joinToCreate) {
    const voiceChannel = await guild.channels.create(member.user.tag, {
      type: 'GUILD_VOICE',
      parent: newChannel.parent,
      permissionOverwrites: [
        {
          id: member.id,
          allow: ["CONNECT"]
        },
        {
          id: guild.id,
          deny: ["CONNECT"]
        }
      ]
    })

    client.voiceGenerator.set(member.id, voiceChannel.id);
    await newChannel.permmissionOverwrites.edit(member, { CONNECT: false });
    setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

    return setTimeout(() => member.voice.setChannel(voiceChannel), 500)
  }
}