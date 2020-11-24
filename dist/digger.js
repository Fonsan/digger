!function(){"use strict";var e={905:function(e,t){var i=function(e){if("object"==typeof e&&null!==e){if("function"==typeof Object.getPrototypeOf){var t=Object.getPrototypeOf(e);return t===Object.prototype||null===t}return"[object Object]"===Object.prototype.toString.call(e)}return!1},n=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e.reduce((function(e,t){return Object.keys(t).forEach((function(a){Array.isArray(e[a])&&Array.isArray(t[a])?e[a]=Array.from(new Set(e[a].concat(t[a]))):i(e[a])&&i(t[a])?e[a]=n(e[a],t[a]):e[a]=t[a]})),e}),{})};t.Z=n},122:function(e,t,i){i.d(t,{K:function(){return k}});var n,a=i(905);class s{constructor(e,t,i,n){this.votes=new Map,this.ended=!1,this.instance=e,this.callback=n;const a=this.instance.playerIdToAuth.get(i.id);this.votes.set(a,"y"),this.voteCommandHandler=this.instance.registerCommand(["!y","!n"],"",this.handleVote),this.instance.on("playerLeave",this.reCount),this.instance.on("playerJoin",this.reCount),this.timeout=window.setTimeout((()=>{this.instance.notify(`Vote: ${t} failed`),this.end()}),this.instance.config.voteTime),this.instance.notify(`Vote: ${t} started, vote with !y or !n, current `),this.reCount()}handleVote(e,t){const i=this.instance.playerIdToAuth.get(e.id);this.votes.get(i)?this.instance.error("You have already voted in this election, you may be interested in !stopthecount",e.id):(this.votes.set(i,t[1]),this.reCount())}reCount(){const e=Object.keys(this.instance.playerIdToAuth).length,t=2==e?2:e/2,i=Array.from(this.votes.values()).reduce(((e,t)=>(e[t]+=1,e)),{y:0,n:0}),n=`Vote: ${name}, ${i.y}/${e} in favour, ${i.n}/${e} against. `;i.y>=t?(this.instance.notify(`${n}Moving ahead with ${name}`),this.end(),this.callback()):i.n>=t||i.n+i.y==e?(this.instance.notify(`${n}Dismissed ${name}`),this.end()):this.instance.notify(`${n}, participate using !y or !n`)}end(){this.ended||(this.ended=!0,this.instance.currentElection=void 0,this.voteCommandHandler(),this.instance.off("playerLeave",this.reCount),this.instance.off("playerJoin",this.reCount),clearTimeout(this.timeout))}}class o{constructor(e,t){this.listeners=[],this.commandHandlers=[],e.log(`${this.constructor.name} loaded`),this.instance=e,this.config=t,t.enabled&&(this.enable(),e.log(`${this.constructor.name} enabled with ${JSON.stringify(t)}`))}disable(){this.instance.log(`${this.constructor.name} disabled`),this.listeners.forEach((({name:e,listener:t})=>{this.instance.off(e,t)})),this.commandHandlers.forEach((e=>e()))}on(e,t){this.listeners.push({name:e,listener:t}),this.instance.on(e,t)}registerCommand(e,t,i){const n=this.instance.registerCommand(e,t,i);return this.commandHandlers.push(n),n}}class r extends o{constructor(e,t){super(e,t),this.auths=new Set(t.auths)}enable(){this.on("playerJoin",this.handleJoin),this.registerCommand(["!a"],"Admin: !a s[kip] | r[estart] | d[efcon6] | m[ute] t | u[nmute] t | k[ick] t | b[an] t | c[ban] t",((e,t)=>{if(!e.admin)return void this.instance.error("Not admin",e.id);const i=t.replace(/ +/," ").split(" ");if(2==i.length)switch(i[1][0]){case"s":this.instance.room.endGame();case"r":this.instance.room.restartGame();case"d":this.instance.error("Not yet implemented",e.id);default:return this.respondWithUsage(e.id)}else if(i.length>=3){const t=this.instance.findPlayer(i[2]);if(!t)return void this.instance.notify(`Could not find targetPlayer: ${i[2]}, use !list`,e.id);switch(i[2][0]){case"m":this.mute(e,t);case"u":this.unMute(e,t);case"k":this.instance.room.kickPlayer(t.id,`You have been kicked ${i[3]}`,!1);case"b":this.instance.temporaryBan(t,`You have been kicked for ${Math.round(this.config.kickDuration/1e3/60)} minutes ${i[3]}`,this.config.kickDuration);case"c":this.instance.room.clearBan(t.id);default:return this.respondWithUsage(e.id)}}else this.respondWithUsage(e.id)}))}mute(e,t){const i=this.config.muteDuration/1e3/60;this.instance.notify(`${t.name} has been muted for ${i} minutes, use "!a unmute ${this.instance.shortId(t.id)}" to unmute`),this.instance.mute(t.id,this.config.muteDuration)}unMute(e,t){this.instance.notify(`${t.name} has been ungagged`),this.instance.unMute(t.id)}respondWithUsage(e){this.instance.notify("Usage:",e),this.instance.notify("!a s or !a skip",e),this.instance.notify("!a r or !a restart",e),this.instance.notify("!a d or !a defcon6",e),this.instance.notify("!a m 123 or !a mute 123",e),this.instance.notify("!a u 123 or !a unmute 123",e),this.instance.notify("!a k 123 or !a kick 123",e),this.instance.notify("!a b 123 or !a ban 123",e),this.instance.notify("!a c 123 or !a cban 123",e)}handleJoin({detail:e}){this.auths.has(e.auth)&&this.instance.room.setPlayerAdmin(e.id,!0)}}class h extends o{constructor(e,t){super(e,t),this.playingPlayers=new Map,this.hotPlayers=new Map,this.kickCandidates=new Map,this.timeout=t.timeout,this.graceTime=t.graceTime,this.hotTimeout=t.hotTimeout,this.warnTimeout=this.timeout-this.graceTime}enable(){this.on("playerJoin",this.handleMotd),this.config.kickAFKSpectatorWhenFull&&this.on("playerJoin",this.purgeInactiveSpectators),this.on("playerTeamChange",this.handleTeamChange),this.on("playerActivity",this.activate),this.on("playerLeave",this.handleLeave)}handleMotd({detail:e}){const t=`AFK detection loaded, players are moved to spectators after ${this.timeout/1e3} seconds of inactivity`;this.instance.notify(t,e.id)}handleTeamChange({detail:{player:e,byPlayer:t}}){e.team==k.spectatorTeam?this.clearPlayerTimeout(e.id):(this.kickCandidates.delete(e.id),this.resetPlayerTimeout(e.id))}handleLeave({detail:e}){this.kickCandidates.delete(e.id),this.clearPlayerTimeout(e.id)}activate({detail:e}){this.hotPlayers.get(e.id)||(this.hotPlayers.set(e.id,window.setTimeout((()=>this.hotPlayers.delete(e.id)),this.hotTimeout)),this.playingPlayers.get(e.id)&&this.resetPlayerTimeout(e.id))}resetPlayerTimeout(e){this.clearPlayerTimeout(e),this.playingPlayers.set(e,window.setTimeout((()=>this.evictPlayer(e)),this.warnTimeout))}clearPlayerTimeout(e){const t=this.playingPlayers.get(e);t&&clearTimeout(t),this.playingPlayers.delete(e)}evictPlayer(e){const t=`You will be moved to spectators due too inactivity in ${this.graceTime/1e3} seconds, please move`;this.instance.notify(t,e);const i=this.playingPlayers.get(e);setTimeout((()=>{const t=this.instance.room.getPlayer(e);if(t&&t.team!=k.spectatorTeam&&this.playingPlayers.get(e)==i){this.instance.softNotify(`Moving ${t.name} to spectators due to inactivity`);const i=`You were afk for more than ${this.timeout/1e3} seconds, moving you to spectators`;this.instance.error(i,e),this.instance.room.setPlayerTeam(e,0),this.kickCandidates.set(e,new Date)}}),this.graceTime)}purgeInactiveSpectators({detail:e}){if(this.instance.room.getPlayerList().length>=this.instance.initOptions.maxPlayers){const e=Array.from(this.kickCandidates).reduce(((e,t)=>e[1]<t[1]?e:t));if(e){const t=this.instance.room.getPlayer(e[0]);this.instance.softNotify(`Server full, kicking oldest afk spectator ${t.name}`),this.instance.room.kickPlayer(e[0],"Server full, kicking oldest afk spectator",!1)}}}}class l extends o{constructor(){super(...arguments),this.aliases=new Map}enable(){this.on("playerJoin",this.handleJoin),this.registerCommand(["!a","!aliases"],"Check the previously known aliases of a player",((e,t)=>{const i=t.split(" ");if(i.length<2)return void this.instance.error("Usage: !a 123 or !a playerName",e.id);const n=i[i.length-1],a=this.instance.findPlayer(n);if(!a)return this.instance.error("Could not find player",e.id),void this.instance.error("Usage: !a 123 or !aliases playerName",e.id);const s=this.instance.playerIdToAuth.get(a.id);this.instance.notify(`${a.name} previously known names:`,e.id),this.namesByLastUsed(s).forEach((([t,i])=>{if(t!=a.name){const n=new Date;this.instance.notify(`${t} ${(+n-+i)/1e3/60/60} hours ago`,e.id)}}))})),this.config.announceNameChange&&this.on("changePlayerName",this.handleChangeName)}handleChangeName({detail:e}){const t=this.namesByLastUsed(e.auth).slice(0,this.config.annouceNamesCount);this.instance.room.getPlayerList().forEach((i=>{this.instance.playerIdToAuth.get(i.id)!=e.auth&&(this.instance.notify(`${e.name} changed their name, last ${t.length} previously known names:`,i.id),t.forEach((([e,t])=>this.instance.notify(e,i.id))))}))}namesByLastUsed(e){const t=this.aliases.get(e);return Array.from(t).sort(((e,t)=>t[1].getTime()-e[1].getTime()))}handleJoin({detail:e}){const t=this.aliases.get(e.auth);t?(t.get(e.name)&&this.instance.emit("changePlayerName",e),t.set(e.name,new Date)):(this.aliases.set(e.auth,new Map),this.instance.emit("newPlayer",e))}}class c extends o{constructor(){super(...arguments),this.connectionMap=new Map,this.playerIdToConn=new Map}enable(){this.on("playerJoin",this.addPlayer),this.on("playerLeave",this.removePlayer)}addPlayer({detail:e}){this.playerIdToConn.set(e.id,e.conn);const t=this.connectionMap.get(e.conn);if(t){if(t.size>=this.config.maxConnectionsPerIP){const e=Array.from(t).reduce(((e,t)=>e[1]<t[1]?e:t));this.instance.room.kickPlayer(e[0],"Too many connections",!1),t.delete(e[0])}t.set(e.id,new Date)}else this.connectionMap.set(e.conn,new Map([[e.id,new Date]]))}removePlayer({detail:e}){const t=this.playerIdToConn.get(e.id);this.connectionMap.get(t).delete(e.id),this.playerIdToConn.delete(e.id)}}class d extends o{enable(){this.registerCommand(["!l","!list"],"List the players showing an id and name",((e,t)=>{this.instance.notify("Players: id, name",e.id),this.instance.room.getPlayerList().forEach((t=>{this.instance.notify(`${this.instance.shortId(t.id)}\t${t.name}`,e.id)}))}))}}class m extends o{constructor(){super(...arguments),this.playingPlayers=new Map,this.idToAuth=new Map}enable(){this.on("playerJoin",this.addPlayer),this.on("playerLeave",this.removePlayer)}removePlayer({detail:e}){this.idToAuth.delete(e.id);const t=this.idToAuth.get(e.id);t&&this.playingPlayers.delete(t)}addPlayer({detail:e}){this.idToAuth.set(e.id,e.auth);const t=this.playingPlayers.get(e.auth);t&&this.instance.room.kickPlayer(t.id,"Only one connection allowed",!1),this.playingPlayers.set(e.auth,e)}}class u extends o{enable(){this.on("gameEnd",this.handleGameEnd)}handleGameEnd(){const e=this.instance.room.getPlayerList(),t=new Map,i=Array();if(e.forEach((e=>{t.set(e.team,!0);const n=this.instance.room.getPlayerScore(e.id);n&&i.push({player:e,score:n})})),this.instance.emit("playerScores",i),"tdm"==this.instance.room.getSettings().gameMode){let e=Array();Object.keys(t).map((t=>{const i=parseInt(t,10);if(i>0){const t=this.instance.room.getTeamScore(i);e.push({team:i,score:t})}})),this.instance.emit("teamScores",e)}}}class y extends o{enable(){this.config.url&&(this.webSocket=new WebSocket(this.config.url)),this.config.events.forEach((e=>{this.on(e,this.publish)})),this.on("gameStart",this.handleGameStart)}handleGameStart(e){this.publish(new CustomEvent("GameSettings",{detail:this.instance.room.getSettings()}))}publish(e){let t={time:Date.now(),event:e.type};void 0!==e.detail&&(t.detail=e.detail),this.webSocket&&this.webSocket.readyState==WebSocket.OPEN&&this.webSocket.send(JSON.stringify(t)),this.instance.log(t)}}class p extends o{enable(){const e=this.config.muteDuration/1e3/60;this.registerCommand(["!vm","!votemute"],"Mute player vote, type !vm for Usage",((t,i)=>{const n=i.split(" ");if(n.length<2)return void this.instance.error("Usage: !vm 123 or !vm playerName",t.id);const a=n[n.length-1],s=this.instance.findPlayer(a);if(!s)return this.instance.error("Could not find player",t.id),void this.instance.error("Usage: !vm 123 or !vm playerName",t.id);this.instance.election(`Mute ${s.name}`,t,(()=>{this.instance.mute(s.id,this.config.muteDuration),this.instance.notify(`${s.name} has been muted for ${e} minutes`)}))}))}}class g extends o{enable(){const e=Math.round(this.config.kickDuration/1e3/60);this.registerCommand(["!vk","!votekick"],"Kick player vote, type !vk for Usage",((t,i)=>{const n=i.split(" ");if(n.length<2)return void this.instance.error("Usage: !vk 123 or !vk playerName",t.id);const a=n[n.length-1],s=this.instance.findPlayer(a);if(!s)return this.instance.error("Could not find player",t.id),void this.instance.error("Usage: !vk 123 or !vk playerName",t.id);this.instance.election(`Kick ${s.name} for ${e} minutes`,t,(()=>{this.instance.temporaryBan(s,"Vote kick",this.config.kickDuration)}))}))}}class f extends o{enable(){this.registerCommand(["!vr","!voterestart"],"Restart map vote",((e,t)=>{this.instance.election("Skip map",e,(()=>{this.instance.room.restartGame(),this.instance.notify("Game restarted")}))}))}}class v extends o{enable(){this.registerCommand(["!vs","!voteskip"],"Skip map vote",((e,t)=>{this.instance.election("Skip map",e,(()=>this.instance.room.endGame()))}))}}!function(e){e[e.captcha=0]="captcha",e[e.changePlayerName=1]="changePlayerName",e[e.gameEnd=2]="gameEnd",e[e.gameEnd2=3]="gameEnd2",e[e.gameStart=4]="gameStart",e[e.gameTick=5]="gameTick",e[e.newPlayer=6]="newPlayer",e[e.playerActive=7]="playerActive",e[e.playerActivity=8]="playerActivity",e[e.playerAdminChange=9]="playerAdminChange",e[e.playerChat=10]="playerChat",e[e.playerInactive=11]="playerInactive",e[e.playerJoin=12]="playerJoin",e[e.playerKicked=13]="playerKicked",e[e.playerKilled=14]="playerKilled",e[e.playerLeave=15]="playerLeave",e[e.playerScores=16]="playerScores",e[e.playerTeamChange=17]="playerTeamChange",e[e.roomLink=18]="roomLink",e[e.teamScores=19]="teamScores"}(n||(n={}));class k{constructor(e,t,i,n){if(this.commands=new Map,this.commandDescriptions=new Map,this.playerIdToAuth=new Map,this.mutedPlayers=new Map,this.activePlayers=new Map,this.electionTimeouts=new Map,this.window=e,this.config=n,this.initialSettings=i,this.config=(0,a.Z)(k.defaultConfig,n),e.onWLLoaded)throw"already loaded";if(!function(e){const t=e;return!!t.roomName&&!!t.maxPlayers&&void 0!==t.public&&!!t.token}(t))throw"roomName, maxPlayers, public and token must be set";if(this.config.configVersion!=k.configVersion)throw"Your config is out of date and not compatible with latest digger, check https://gitlab.com/webliero/digger";this.initOptions=t,this.validateInitOptions(),this.fullRoom=e.WLInit(t),this.room=this.fullRoom,this.room.setSettings(i),this.serverId=this.initOptions.roomName.replace(/[^A-Z0-9]/gi,"-").toLowerCase(),this.instanceId=`${Date.now().toString(36)}#${Math.round(Math.random()*Math.pow(36,3)).toString(36)}`,this.setNewGame(),this.eventTarget=new EventTarget,this.registerRoomCallbacks(),this.on("gameStart",(e=>{this.setNewGame()})),this.on("playerJoin",(({detail:e})=>this.playerIdToAuth.set(e.id,e.auth))),this.on("playerLeave",(({detail:e})=>this.playerIdToAuth.delete(e.id))),this.on("playerChat",this.handlePlayerChat),this.on("playerTeamChange",this.handleActive),this.on("roomLink",(({detail:e})=>this.log("Started: `${url}`"))),this.on("captcha",(()=>this.log("Failed to start: Faulty token"))),this.on("playerJoin",(({detail:e})=>this.notify(k.motd,e.id))),this.registerCommand(["!h","!help"],"Display this help",this.handleHelp),this.registerCommand(["!stc","!stopthecount"],"Request to stop the count of a vote",this.handleStopTheCount),this.enablePlugins()}log(...e){console.log(...e.map((e=>JSON.stringify(e))))}on(e,t){this.eventTarget.addEventListener(e,t)}once(e,t){this.eventTarget.addEventListener(e,t,{once:!0})}off(e,t){this.eventTarget.removeEventListener(e,t)}emit(e,t){return this.eventTarget.dispatchEvent(new CustomEvent(e,{detail:t,cancelable:!0}))}notify(e,t){this.room.sendAnnouncement(e,t,16776960,"bold",2)}softNotify(e,t){this.room.sendAnnouncement(e,t,14540253)}error(e,t){this.room.sendAnnouncement(e,t,16711680,"bold",2)}registerCommand(e,t,i){return this.commandDescriptions.set(e[0],[...e.map((e=>e.padEnd(4," "))),t].join(" ")),e.forEach((e=>{if("!"!=e[0]||e.length<2)throw`${e} command not valid`;if(this.commands.get(e))throw"command already registered";this.commands.set(e,i)})),()=>{this.commandDescriptions.delete(e[0]),e.forEach((e=>this.commands.delete(e)))}}findPlayer(e){const t=this.room.getPlayerList();return t.find((t=>this.shortId(t.id).toString()==e))||t.find((t=>t.name==e))}mute(e,t){const i=Math.round(t/1e3/60);this.error(`You have been muted for ${i} minutes`,e);const n=this.playerIdToAuth.get(e);this.mutedPlayers.set(n,{time:new Date(Date.now()+t),timeout:window.setTimeout((()=>this.unMute(e)),t)})}temporaryBan(e,t,i){const n=Math.round(i/1e3/60);this.room.kickPlayer(e.id,t,!0),this.notify(`${e.name} has been kicked for ${n} minutes`),setTimeout((()=>this.room.clearBan(e.id)),i)}unMute(e){this.error("You have been unmuted",e);const t=this.playerIdToAuth.get(e);this.mutedPlayers.delete(t)}clearMutes(){this.mutedPlayers.clear()}shortId(e){return e%1e3}election(e,t,i){const n=this.playerIdToAuth.get(t.id);this.electionTimeouts.get(n)?this.error(`You may only start a vote once every ${this.config.voteTimeout/1e3} seconds`,t.id):this.currentElection?this.notify("Another vote is already active, wait your turn",t.id):(this.electionTimeouts.set(n,window.setTimeout((()=>this.electionTimeouts.delete(n)),this.config.voteTimeout)),this.currentElection=new s(this,e,t,(()=>{this.currentElection=void 0,i()})))}enablePlugins(){Object.entries(this.config.plugins).forEach((([e,t])=>{if(t.enabled)switch(e){case"admin":new r(this,this.config.plugins.admin);case"afk":new h(this,this.config.plugins.afk);case"aliases":new l(this,this.config.plugins.aliases);case"connection":new c(this,this.config.plugins.connection);case"list":new d(this,this.config.plugins.list);case"onePlayer":new m(this,this.config.plugins.onePlayer);case"scores":new u(this,this.config.plugins.scores);case"slurper":new y(this,this.config.plugins.slurper);case"voteMutePlayer":new p(this,this.config.plugins.voteMutePlayer);case"voteKickPlayer":new g(this,this.config.plugins.voteKickPlayer);case"voteRestartMap":new f(this,this.config.plugins.voteRestartMap);case"voteSkipMap":new v(this,this.config.plugins.voteSkipMap)}}))}handleHelp(e,t){this.notify("Available commands:",e.id),Array.from(this.commandDescriptions.values()).sort().filter((t=>e.admin||!("!a"==t.substr(0,2)))).forEach((t=>this.notify(t,e.id)))}handleActive({detail:{player:e,byPlayer:t}}){0==e.team?(this.emit("playerInactive",e),this.activePlayers.delete(e.id)):this.activePlayers.get(e.id)||(this.emit("playerActive",e),this.activePlayers.set(e.id,!0))}handlePlayerChat(e){let{player:t,message:i}=e.detail;if(i=i.trim(),"!"==i[0]){const n=i.indexOf(" "),a=-1==n?i:i.substr(0,n),s=this.commands.get(a);if(s)s(t,i);else{const e=`"${a}" not recognized command`;this.room.sendAnnouncement(e,t.id,16711680,"bold",2)}e.preventDefault()}const n=this.playerIdToAuth.get(t.id),a=this.mutedPlayers.get(n);if(a){const i=Math.round((a.time.getTime()-Date.now())/1e3/60);this.room.sendAnnouncement(`You are muted for ${i} minutes more`,t.id,16711680,"bold",2),e.preventDefault()}}setNewGame(){this.gameStartTime=new Date,this.gameId=`${Date.now().toString(36)}#${Math.round(Math.random()*Math.pow(36,3)).toString(36)}`}handleStopTheCount(e,t){this.currentElection?this.notify(`${e.name} has requested to stop the count, we of course ignore it and the counting of votes will continue`):this.notify(`${e.name} has requested to stop the count, the vote is over and we ignore it`)}registerRoomCallbacks(){this.fullRoom.onPlayerJoin=e=>{this.emit("playerJoin",e)},this.fullRoom.onPlayerLeave=e=>{this.emit("playerLeave",e)},this.fullRoom.onPlayerKicked=(e,t,i,n)=>{this.emit("playerKicked",{player:e,reason:t,ban:i,byPlayer:n})},this.fullRoom.onPlayerChat=(e,t)=>this.emit("playerChat",{player:e,message:t}),this.fullRoom.onPlayerTeamChange=(e,t)=>{this.emit("playerTeamChange",{player:e,byPlayer:t})},this.fullRoom.onPlayerAdminChange=(e,t)=>{this.emit("playerAdminChange",{player:e,byPlayer:t})},this.fullRoom.onGameTick=()=>{this.emit("gameTick",null)},this.fullRoom.onPlayerActivity=e=>{this.emit("playerActivity",e)},this.fullRoom.onRoomLink=e=>{this.emit("roomLink",e)},this.fullRoom.onGameStart=()=>{this.emit("gameStart",null)},this.fullRoom.onGameEnd=()=>{this.emit("gameEnd",null)},this.fullRoom.onGameEnd2=()=>{this.emit("gameEnd2",null)},this.fullRoom.onPlayerKilled=(e,t)=>{this.emit("playerKilled",{killed:e,killer:t})},this.fullRoom.onCaptcha=()=>{this.emit("captcha",null)}}validateInitOptions(){if(!this.initOptions.roomName)throw"you must set a roomName";if(!this.initOptions.maxPlayers)throw"you must set maxPlayers"}generateId(){return`${Date.now().toString(36)}#${Math.round(Math.random()*Math.pow(36,3)).toString(36)}`}}k.configVersion="0.1.0",k.spectatorTeam=0,k.motd=`Digger ${k.configVersion} loaded, write !h or !help in chat for commands`,k.defaultConfig={configVersion:k.configVersion,voteTime:3e4,voteTimeout:45e3,plugins:{admin:{enabled:!0,auths:[],muteDuration:9e5,kickDuration:9e5},afk:{enabled:!0,timeout:6e4,graceTime:1e4,hotTimeout:3e3,kickAFKSpectatorWhenFull:!0},aliases:{enabled:!0,announceNameChange:!0,annouceNamesCount:4},connection:{enabled:!0,maxConnectionsPerIP:3},list:{enabled:!0},onePlayer:{enabled:!0},scores:{enabled:!0},slurper:{enabled:!0,events:["captcha","changePlayerName","gameEnd","gameEnd2","gameStart","newPlayer","playerActive","playerAdminChange","playerChat","playerInactive","playerJoin","playerKicked","playerKilled","playerLeave","playerScores","playerTeamChange","roomLink","teamScores"]},voteMutePlayer:{enabled:!0,muteDuration:9e5},voteKickPlayer:{enabled:!0,kickDuration:9e5},voteRestartMap:{enabled:!0},voteSkipMap:{enabled:!0}}}}},t={};function i(n){if(t[n])return t[n].exports;var a=t[n]={exports:{}};return e[n](a,a.exports,i),a.exports}i.d=function(e,t){for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i(122)}();