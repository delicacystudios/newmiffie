const { ShardingManager } = require("discord.js");
const config = require('./configs/config.js');

const shards = new ShardingManager('./index.js', {
  token: config.bot.token,
  totalShards: 'auto'
})

shards.on('shardCreate', shard => {
  console.log(`[shards]: Шард ${shard.id + 1} был запущен`)
});

shards.spawn();