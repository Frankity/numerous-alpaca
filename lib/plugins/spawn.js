'use strict';
var Vec3 = require('vec3');

module.exports.player = function(player, serv){
  player.spawn = function(packet) {
    player.pos = new Vec3(1 * 32, 32 * 32, 1 * 32);
    player.pos.x = 1,
    player.pos.y = 1
    player.pos.z = 1
    player.yaw = 0;
    player.headYaw = 0;
    player.pitch = 0;

    player.id = packet.client_id;
    player.entity_id = serv.entityID;
    player.name = packet.username;
    player.secret = packet.client_secret;
    player.skinType = packet.skin.skinType;

    player._client.writeMCPE('mcpe_player_status', {
      status: 0
    });

    player._client.writeMCPE('mcpe_move_player', {
      entity_id: [0,0],
      x: player.pos.x,
      y: player.pos.y + 1.62,
      z: player.pos.z,
      yaw: player.yaw,
      head_yaw: player.headYaw,
      pitch: player.pitch,
      mode: 0,
      on_ground: 1
    });

    player._client.writeMCPE('mcpe_start_game', {
      seed: -1,
      dimension: 0,
      generator: 1,
      gamemode: 0,
      entity_id: [0,0],
      spawn_x: 1,
      spawn_y: 1,
      spawn_z: 1,
      x: player.pos.x,
      y: player.pos.y + 1.62,
      z: player.pos.z,
      unknown: 0
    });

    player._client.writeMCPE('mcpe_set_spawn_position', {
      x: 1,
      y: 1,
      z: 1
    });

    player._client.writeMCPE('mcpe_move_player', {
      entity_id: [0,0],
      x: player.pos.x,
      y: player.pos.y + 1.62,
      z: player.pos.z,
      yaw: player.yaw,
      head_yaw: player.headYaw,
      pitch: player.pitch,
      mode: 0,
      on_ground: 1
    });

    player._client.writeMCPE('mcpe_set_time', {
      time: 0,
      started: 1
    });

    player._client.writeMCPE('mcpe_respawn', {
      x: 1,
      y: 1,
      z: 1
    });

    player._client.on('mcpe_request_chunk_radius', function(packet) {
      // player._client.writeMCPE('mcpe_chunk_radius_update', {
      //   chunk_radius: 1
      // });
      //
      // sendChunk(-1,-1);
      // sendChunk(-1,0);
      // sendChunk(0,-1);
      // sendChunk(0,1);
      // sendChunk(1,0);
      // sendChunk(1,1);
      //
      // function sendChunk(x,z) {
      //   player._client.writeBatch([{"name": "mcpe", "params": { name: "mcpe_full_chunk_data", params: {
      //     chunk_x: x,
      //     chunk_z: z,
      //     order: 1,
      //     chunk_data: serv.world.dump()
      //   }}}]);
      // }

      player._client.writeMCPE('mcpe_player_status', {
        status: 3
      });

      player._client.writeMCPE('mcpe_set_time', {
        time: 0,
        started: 1
      });
    });

    player._client.on('mcpe', function(packet){ console.log(packet); });

    serv.players.push(player);

    console.log(player.name + '[/' + player._client.socket.address().address + ':' + player._client.socket.address().port + '] logged in with entity id ' + player.entity_id); // pretty sure that's broken
    console.log(player.name + ' joined the game');

    serv.broadcast(serv.color.yellow + player.name + ' has joined the game');

    serv.entityID++;
    serv.onlinePlayers++;
  };
};