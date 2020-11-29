function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var dist = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
// istanbul ignore next
var isObject = function (obj) {
    if (typeof obj === "object" && obj !== null) {
        if (typeof Object.getPrototypeOf === "function") {
            var prototype = Object.getPrototypeOf(obj);
            return prototype === Object.prototype || prototype === null;
        }
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
    return false;
};
var merge = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return objects.reduce(function (result, current) {
        Object.keys(current).forEach(function (key) {
            if (Array.isArray(result[key]) && Array.isArray(current[key])) {
                result[key] = Array.from(new Set(result[key].concat(current[key])));
            }
            else if (isObject(result[key]) && isObject(current[key])) {
                result[key] = merge(result[key], current[key]);
            }
            else {
                result[key] = current[key];
            }
        });
        return result;
    }, {});
};
exports.default = merge;

});

var merge = /*@__PURE__*/getDefaultExportFromCjs(dist);

class Election {
    constructor(instance, name, initiatingPlayer, callback) {
        this.votes = new Map();
        this.ended = false;
        this.handleVote = (player, message) => {
            const playerAuth = this.instance.playerIdToAuth.get(player.id);
            if (this.votes.get(playerAuth)) {
                this.instance.error("You have already voted in this election, you may be interested in !stopthecount", player.id);
            }
            else {
                this.votes.set(playerAuth, message[1]);
                this.reCount();
            }
        };
        this.reCount = () => {
            const playerCount = Object.keys(this.instance.playerIdToAuth).length;
            const neededVotes = playerCount == 2 ? 2 : playerCount / 2;
            const voteCounts = Array.from(this.votes.values()).reduce((acc, vote) => { acc[vote] += 1; return acc; }, { y: 0, n: 0 });
            const prefix = `Vote: ${this.name}, ${voteCounts.y}/${playerCount} in favour, ${voteCounts.n}/${playerCount} against. `;
            if (voteCounts.y >= neededVotes) {
                this.instance.notify(`${prefix}Moving ahead with ${this.name}`);
                try {
                    this.callback();
                    this.end();
                }
                catch (e) {
                    this.instance.log('EXception');
                    this.instance.log('EXception', e);
                }
            }
            else if (voteCounts.n >= neededVotes || voteCounts.n + voteCounts.y == playerCount) {
                this.instance.notify(`${prefix}Dismissed ${this.name}`);
                this.end();
            }
            else {
                this.instance.notify(`${prefix}, participate using !y or !n`);
            }
        };
        this.instance = instance;
        this.name = name;
        this.callback = callback;
        this.instance.currentElection = this;
        const auth = this.instance.playerIdToAuth.get(initiatingPlayer.id);
        this.votes.set(auth, 'y');
        this.voteCommandHandler = this.instance.registerCommand(['!y', '!n'], '', this.handleVote);
        this.instance.on('playerLeave', this.reCount);
        this.instance.on('playerJoin', this.reCount);
        this.timeout = window.setTimeout(() => {
            this.instance.notify(`Vote: ${name} failed`);
            this.end();
        }, this.instance.config.voteTime);
        this.instance.notify(`Vote: ${name} started, vote with !y or !n, current `);
        this.reCount();
    }
    end() {
        if (this.ended) {
            return;
        }
        this.ended = true;
        this.instance.currentElection = undefined;
        this.voteCommandHandler();
        this.instance.off('playerLeave', this.reCount);
        this.instance.off('playerJoin', this.reCount);
        clearTimeout(this.timeout);
    }
}

class Plugin {
    constructor(instance, config) {
        this.listeners = [];
        this.commandHandlers = [];
        instance.log(`${this.constructor.name} loaded`);
        this.instance = instance;
        this.config = config;
    }
    enable() {
        this.activate();
        this.instance.log(`${this.constructor.name} enabled with ${JSON.stringify(this.config)}`);
    }
    disable() {
        this.instance.log(`${this.constructor.name} disabled`);
        this.listeners.forEach(({ name, listener }) => {
            this.instance.off(name, listener);
        });
        this.commandHandlers.forEach(handler => handler());
    }
    on(name, listener) {
        this.listeners.push({ name, listener });
        this.instance.on(name, listener);
    }
    registerCommand(commands, description, callback) {
        const handler = this.instance.registerCommand(commands, description, callback);
        this.commandHandlers.push(handler);
        return handler;
    }
}

class Admin extends Plugin {
    constructor(instance, config) {
        super(instance, config);
        this.handleJoin = ({ detail: player }) => {
            if (this.auths.has(player.auth)) {
                this.instance.room.setPlayerAdmin(player.id, true);
            }
        };
        this.auths = new Set(config.auths);
    }
    activate() {
        this.on('playerJoin', this.handleJoin);
        this.registerCommand(['!a'], 'Admin: !a s[kip] | r[estart] | d[efcon6] | m[ute] t | u[nmute] t | k[ick] t | b[an] t | c[ban] t', (player, message) => {
            if (!player.admin) {
                this.instance.error('Not admin', player.id);
                return;
            }
            const parts = message.replace(/ +/, ' ').split(' ');
            this.instance.log(parts);
            if (parts.length < 2) {
                this.respondWithUsage(player.id);
                return;
            }
            const command = parts[1][0];
            if (parts.length == 2) {
                switch (command) {
                    case 's': {
                        this.instance.room.endGame();
                        this.instance.notify(`Admin: ${player.name}, ended game`);
                        break;
                    }
                    case 'r': {
                        this.instance.room.restartGame();
                        this.instance.notify(`Admin: ${player.name}, restared game`);
                        break;
                    }
                    case 'd':
                        this.instance.error('Not yet implemented', player.id);
                        break;
                    default: return this.respondWithUsage(player.id);
                }
                return;
            }
            if (command == 'c') {
                const id = parseInt(parts[2], 10);
                if (isNaN(id)) {
                    this.instance.error(`You need to pass a number, !a c 123`);
                    return;
                }
                this.instance.room.clearBan(id);
                this.instance.notify(`Clearing ban for player with previous id ${id}`);
            }
            const targetPlayer = this.instance.findPlayer(parts[2]);
            if (!targetPlayer) {
                this.instance.notify(`Could not find targetPlayer: ${parts[2]}, use !list`, player.id);
                return;
            }
            switch (command) {
                case 'm':
                    this.mute(player, targetPlayer);
                    break;
                case 'u':
                    this.unMute(player, targetPlayer);
                    break;
                case 'k':
                    this.instance.room.kickPlayer(targetPlayer.id, `You have been kicked ${parts[3] || ''}`, false);
                    break;
                case 'b': {
                    this.instance.temporaryBan(targetPlayer, `You have been kicked for ${Math.round(this.config.kickDuration / 1000 / 60)} minutes ${parts[3] || ''}`, this.config.kickDuration);
                    break;
                }
                default: return this.respondWithUsage(player.id);
            }
        });
    }
    mute(admin, targetPlayer) {
        const minutes = this.config.muteDuration / 1000 / 60;
        this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes, use "!a unmute ${this.instance.shortId(targetPlayer.id)}" to unmute`, admin.id);
        this.instance.mute(targetPlayer.id, this.config.muteDuration);
    }
    unMute(admin, targetPlayer) {
        this.instance.notify(`${targetPlayer.name} has been ungagged`, admin.id);
        this.instance.unMute(targetPlayer.id);
    }
    respondWithUsage(playerId) {
        this.instance.notify(`Usage:`, playerId);
        this.instance.notify("!a s or !a skip", playerId);
        this.instance.notify("!a r or !a restart", playerId);
        this.instance.notify("!a d or !a defcon6", playerId);
        this.instance.notify("!a m 123 or !a mute 123", playerId);
        this.instance.notify("!a u 123 or !a unmute 123", playerId);
        this.instance.notify("!a k 123 or !a kick 123", playerId);
        this.instance.notify("!a b 123 or !a ban 123", playerId);
        this.instance.notify("!a c 123 or !a cban 123", playerId);
    }
}

class AFK extends Plugin {
    constructor(instance, config) {
        super(instance, config);
        this.playingPlayers = new Map();
        this.hotPlayers = new Map();
        this.kickCandidates = new Map();
        this.handleMotd = ({ detail: player }) => {
            const motd = `AFK detection loaded, players are moved to spectators after ${this.timeout / 1000} seconds of inactivity`;
            this.instance.notify(motd, player.id);
        };
        this.handleTeamChange = ({ detail: { player, byPlayer } }) => {
            if (player.team == Instance.spectatorTeam) {
                this.clearPlayerTimeout(player.id);
            }
            else {
                this.kickCandidates.delete(player.id);
                this.resetPlayerTimeout(player.id);
            }
        };
        this.handleLeave = ({ detail: player }) => {
            this.kickCandidates.delete(player.id);
            this.clearPlayerTimeout(player.id);
        };
        this.activatePlayer = ({ detail: player }) => {
            if (!this.hotPlayers.get(player.id)) {
                this.hotPlayers.set(player.id, window.setTimeout(() => this.hotPlayers.delete(player.id), this.hotTimeout));
                if (this.playingPlayers.get(player.id)) {
                    this.resetPlayerTimeout(player.id);
                }
            }
        };
        this.purgeInactiveSpectators = ({ detail: player }) => {
            const list = this.instance.room.getPlayerList();
            if (list.length >= this.instance.initOptions.maxPlayers) {
                const oldestPlayerPair = Array.from(this.kickCandidates).reduce((acc, el) => acc[1] < el[1] ? acc : el);
                if (oldestPlayerPair) {
                    const oldestPlayer = this.instance.room.getPlayer(oldestPlayerPair[0]);
                    this.instance.softNotify(`Server full, kicking oldest afk spectator ${oldestPlayer.name}`);
                    this.instance.room.kickPlayer(oldestPlayerPair[0], 'Server full, kicking oldest afk spectator', false);
                }
            }
        };
        this.timeout = config.timeout;
        this.graceTime = config.graceTime;
        this.hotTimeout = config.hotTimeout;
        this.warnTimeout = this.timeout - this.graceTime;
    }
    activate() {
        this.on('playerJoin', this.handleMotd);
        if (this.config.kickAFKSpectatorWhenFull) {
            this.on('playerJoin', this.purgeInactiveSpectators);
        }
        this.on('playerTeamChange', this.handleTeamChange);
        this.on('playerActivity', this.activatePlayer);
        this.on('playerLeave', this.handleLeave);
    }
    resetPlayerTimeout(playerId) {
        this.clearPlayerTimeout(playerId);
        this.playingPlayers.set(playerId, window.setTimeout(() => this.evictPlayer(playerId), this.warnTimeout));
    }
    clearPlayerTimeout(playerId) {
        const timeout = this.playingPlayers.get(playerId);
        if (timeout) {
            clearTimeout(timeout);
        }
        this.playingPlayers.delete(playerId);
    }
    evictPlayer(playerId) {
        const message = `You will be moved to spectators due too inactivity in ${this.graceTime / 1000} seconds, please move`;
        this.instance.notify(message, playerId);
        const currentTimeout = this.playingPlayers.get(playerId);
        setTimeout(() => {
            const player = this.instance.room.getPlayer(playerId);
            if (player && player.team != Instance.spectatorTeam && this.playingPlayers.get(playerId) == currentTimeout) {
                this.instance.softNotify(`Moving ${player.name} to spectators due to inactivity`);
                const reason = `You were afk for more than ${this.timeout / 1000} seconds, moving you to spectators`;
                this.instance.error(reason, playerId);
                this.instance.room.setPlayerTeam(playerId, 0);
                this.kickCandidates.set(playerId, new Date());
            }
        }, this.graceTime);
    }
}

class Info extends Plugin {
    constructor() {
        super(...arguments);
        this.aliases = new Map();
        this.handleChangeName = ({ detail: player }) => {
            const names = this.namesByLastUsed(player.auth).slice(0, this.config.annouceNamesCount);
            this.instance.room.getPlayerList().forEach(otherPlayer => {
                if (this.instance.playerIdToAuth.get(otherPlayer.id) != player.auth) {
                    this.instance.notify(`${player.name} changed their name, last ${names.length} previously known names:`, otherPlayer.id);
                    names.forEach(([name, date]) => this.instance.notify(`${name} ${date.toString().substr(0, 21)}`, otherPlayer.id));
                }
            });
        };
        this.handleJoin = ({ detail: player }) => {
            const prev = this.aliases.get(player.auth);
            if (prev) {
                if (!prev.get(player.name)) {
                    this.instance.emit('changePlayerName', player);
                }
                prev.set(player.name, new Date());
            }
            else {
                this.aliases.set(player.auth, new Map([[player.name, new Date()]]));
                this.instance.emit('newPlayer', player);
            }
        };
    }
    activate() {
        this.on('playerJoin', this.handleJoin);
        this.registerCommand(['!i', '!info'], 'Check the previously known aliases of a player', (player, message) => {
            const parts = message.split(' ');
            if (parts.length < 2) {
                this.instance.error(`Usage: !i 123 or !info playerName`, player.id);
                return;
            }
            const lastPart = parts[parts.length - 1];
            const targetPlayer = this.instance.findPlayer(lastPart);
            if (!targetPlayer) {
                this.instance.error(`Could not find player`, player.id);
                this.instance.error(`Usage: !i 123 or !info playerName`, player.id);
                return;
            }
            const auth = this.instance.playerIdToAuth.get(targetPlayer.id);
            this.instance.notify(`${targetPlayer.name} previously known names:`, player.id);
            this.namesByLastUsed(auth).forEach(([name, time]) => {
                if (name != targetPlayer.name) {
                    const currentTime = new Date();
                    this.instance.notify(`${name} ${(+currentTime - +time) / 1000 / 60 / 60} hours ago`, player.id);
                }
            });
        });
        if (this.config.announceNameChange) {
            this.on('changePlayerName', this.handleChangeName);
        }
    }
    namesByLastUsed(auth) {
        const names = this.aliases.get(auth);
        return Array.from(names).sort((a, b) => b[1].getTime() - a[1].getTime());
    }
}

class Connection extends Plugin {
    constructor() {
        super(...arguments);
        this.connectionMap = new Map();
        this.playerIdToConn = new Map();
        this.addPlayer = ({ detail: player }) => {
            this.playerIdToConn.set(player.id, player.conn);
            const connectionPlayers = this.connectionMap.get(player.conn);
            if (connectionPlayers) {
                if (connectionPlayers.size >= this.config.maxConnectionsPerIP) {
                    const playerPair = Array.from(connectionPlayers).reduce((acc, el) => acc[1] < el[1] ? acc : el);
                    this.instance.room.kickPlayer(playerPair[0], 'Too many connections', false);
                    connectionPlayers.delete(playerPair[0]);
                }
                connectionPlayers.set(player.id, new Date());
            }
            else {
                this.connectionMap.set(player.conn, new Map([[player.id, new Date()]]));
            }
        };
        this.removePlayer = ({ detail: player }) => {
            const conn = this.playerIdToConn.get(player.id);
            const connectionPlayers = this.connectionMap.get(conn);
            connectionPlayers.delete(player.id);
            this.playerIdToConn.delete(player.id);
        };
    }
    activate() {
        this.on('playerJoin', this.addPlayer);
        this.on('playerLeave', this.removePlayer);
    }
}

class List extends Plugin {
    activate() {
        this.registerCommand(['!l', '!list'], 'List the players showing an id and name', (commandPlayer, message) => {
            this.instance.notify('Players: id, name', commandPlayer.id);
            this.instance.room.getPlayerList().forEach(player => {
                this.instance.notify(`${this.instance.shortId(player.id)}\t${player.name}`, commandPlayer.id);
            });
        });
    }
}

class OnePlayer extends Plugin {
    constructor() {
        super(...arguments);
        this.playingPlayers = new Map();
        this.idToAuth = new Map();
        this.removePlayer = ({ detail: player }) => {
            this.idToAuth.delete(player.id);
            const auth = this.idToAuth.get(player.id);
            if (auth) {
                this.playingPlayers.delete(auth);
            }
        };
        this.addPlayer = ({ detail: player }) => {
            this.idToAuth.set(player.id, player.auth);
            const existingPlayer = this.playingPlayers.get(player.auth);
            if (existingPlayer) {
                this.instance.room.kickPlayer(existingPlayer.id, 'Only one connection allowed', false);
            }
            this.playingPlayers.set(player.auth, player);
        };
    }
    activate() {
        this.on('playerJoin', this.addPlayer);
        this.on('playerLeave', this.removePlayer);
    }
}

class Scores extends Plugin {
    constructor() {
        super(...arguments);
        this.handleGameEnd = () => {
            const players = this.instance.room.getPlayerList();
            const teams = new Map();
            const playerScores = Array();
            players.forEach(player => {
                teams.set(player.team, true);
                const score = this.instance.room.getPlayerScore(player.id);
                if (score) {
                    playerScores.push({
                        player: player,
                        score: score
                    });
                }
            });
            this.instance.emit('playerScores', playerScores);
            if (this.instance.room.getSettings().gameMode == 'tdm') {
                let teamScores = Array();
                Object.keys(teams).map(teamIdstring => {
                    const teamId = parseInt(teamIdstring, 10);
                    if (teamId > 0) {
                        const teamScore = this.instance.room.getTeamScore(teamId);
                        teamScores.push({ team: teamId, score: teamScore });
                    }
                });
                this.instance.emit('teamScores', teamScores);
            }
        };
    }
    activate() {
        this.on('gameEnd', this.handleGameEnd);
    }
}

class Slurper extends Plugin {
    activate() {
        if (this.config.url) {
            this.webSocket = new WebSocket(this.config.url);
        }
        this.config.events.forEach(eventName => {
            this.on(eventName, this.publish.bind(this));
        });
    }
    publish(event) {
        let message = {
            time: Date.now(),
            serverId: this.instance.serverId,
            instanceId: this.instance.instanceId,
            gameId: this.instance.gameId,
            gameStart: this.instance.gameStart.getTime(),
            event: event.type,
        };
        if (event.detail !== undefined && event.detail !== null) {
            message.data = event.detail;
        }
        if (this.webSocket && this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.send(JSON.stringify(message));
        }
        this.instance.log(message);
    }
}

class VoteMute extends Plugin {
    activate() {
        const minutes = this.config.muteDuration / 1000 / 60;
        this.registerCommand(['!vm', '!votemute'], 'Mute player vote, type !vm for Usage', (player, message) => {
            const parts = message.split(' ');
            if (parts.length < 2) {
                this.instance.error(`Usage: !vm 123 or !vm playerName`, player.id);
                return;
            }
            const lastPart = parts[parts.length - 1];
            const targetPlayer = this.instance.findPlayer(lastPart);
            if (!targetPlayer) {
                this.instance.error(`Could not find player`, player.id);
                this.instance.error(`Usage: !vm 123 or !vm playerName`, player.id);
                return;
            }
            this.instance.election(`Mute ${targetPlayer.name}`, player, () => {
                this.instance.mute(targetPlayer.id, this.config.muteDuration);
                this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes`);
            });
        });
    }
}

class VoteKick extends Plugin {
    activate() {
        const minutes = Math.round(this.config.kickDuration / 1000 / 60);
        this.registerCommand(['!vk', '!votekick'], 'Kick player vote, type !vk for Usage', (player, message) => {
            const parts = message.split(' ');
            if (parts.length < 2) {
                this.instance.error(`Usage: !vk 123 or !vk playerName`, player.id);
                return;
            }
            const lastPart = parts[parts.length - 1];
            const targetPlayer = this.instance.findPlayer(lastPart);
            if (!targetPlayer) {
                this.instance.error(`Could not find player`, player.id);
                this.instance.error(`Usage: !vk 123 or !vk playerName`, player.id);
                return;
            }
            this.instance.election(`Kick ${targetPlayer.name} for ${minutes} minutes`, player, () => {
                this.instance.temporaryBan(targetPlayer, "Vote kick", this.config.kickDuration);
            });
        });
    }
}

class VoteRestartMap extends Plugin {
    activate() {
        this.registerCommand(['!vr', '!voterestart'], 'Restart map vote', (player, message) => {
            this.instance.election('Skip map', player, () => {
                this.instance.room.restartGame();
                this.instance.notify('Game restarted');
            });
        });
    }
}

class VoteSkipMap extends Plugin {
    activate() {
        this.registerCommand(['!vs', '!voteskip'], 'Skip map vote', (player, message) => {
            this.instance.election('Skip map', player, () => this.instance.room.endGame());
        });
    }
}

var EventEnum;
(function (EventEnum) {
    EventEnum[EventEnum["captcha"] = 0] = "captcha";
    EventEnum[EventEnum["changePlayerName"] = 1] = "changePlayerName";
    EventEnum[EventEnum["gameEnd"] = 2] = "gameEnd";
    EventEnum[EventEnum["gameEnd2"] = 3] = "gameEnd2";
    EventEnum[EventEnum["gameStart"] = 4] = "gameStart";
    EventEnum[EventEnum["gameTick"] = 5] = "gameTick";
    EventEnum[EventEnum["newPlayer"] = 6] = "newPlayer";
    EventEnum[EventEnum["playerActive"] = 7] = "playerActive";
    EventEnum[EventEnum["playerActivity"] = 8] = "playerActivity";
    EventEnum[EventEnum["playerAdminChange"] = 9] = "playerAdminChange";
    EventEnum[EventEnum["playerChat"] = 10] = "playerChat";
    EventEnum[EventEnum["playerInactive"] = 11] = "playerInactive";
    EventEnum[EventEnum["playerJoin"] = 12] = "playerJoin";
    EventEnum[EventEnum["playerKicked"] = 13] = "playerKicked";
    EventEnum[EventEnum["playerKilled"] = 14] = "playerKilled";
    EventEnum[EventEnum["playerLeave"] = 15] = "playerLeave";
    EventEnum[EventEnum["playerScores"] = 16] = "playerScores";
    EventEnum[EventEnum["playerTeamChange"] = 17] = "playerTeamChange";
    EventEnum[EventEnum["roomLink"] = 18] = "roomLink";
    EventEnum[EventEnum["teamScores"] = 19] = "teamScores";
})(EventEnum || (EventEnum = {}));
function isStrictInitOptions(options) {
    const so = options;
    return !!so.roomName && !!so.maxPlayers && so.public !== undefined && !!so.token;
}
class Instance extends EventTarget {
    constructor(window, initOptions, initialSettings, config) {
        super();
        this.commands = new Map();
        this.commandDescriptions = new Map();
        this.playerIdToAuth = new Map();
        this.mutedPlayers = new Map();
        this.activePlayers = new Map();
        this.electionTimeouts = new Map();
        this.plugins = new Map();
        this.handleActive = ({ detail: { player, byPlayer } }) => {
            if (player.team == 0) {
                this.emit('playerInactive', player);
                this.activePlayers.delete(player.id);
            }
            else {
                if (!this.activePlayers.get(player.id)) {
                    this.emit('playerActive', player);
                    this.activePlayers.set(player.id, true);
                }
            }
        };
        this.handlePlayerChat = (event) => {
            let { player, message } = event.detail;
            message = message.trim();
            if (message[0] == '!') {
                const firstSpaceIndex = message.indexOf(' ');
                const commandName = firstSpaceIndex == -1 ? message : message.substr(0, firstSpaceIndex);
                const callback = this.commands.get(commandName);
                if (callback) {
                    callback.apply(this, [player, message]);
                }
                else {
                    this.error(`"${commandName}" not recognized command`, player.id);
                }
                event.preventDefault();
            }
            const auth = this.playerIdToAuth.get(player.id);
            const muteConfig = this.mutedPlayers.get(auth);
            if (muteConfig) {
                const minutes = Math.round((muteConfig.time.getTime() - Date.now()) / 1000 / 60);
                this.error(`You have been muted for ${minutes} minutes more`, player.id);
                event.preventDefault();
            }
        };
        this.setNewGame = () => {
            this.gameStart = new Date();
            this.gameId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
        };
        this.window = window;
        this.initialSettings = initialSettings;
        if (config.configVersion != Instance.configVersion) {
            throw `Your config is out of date and not compatible with latest digger, check https://gitlab.com/webliero/digger`;
        }
        this.config = merge(Instance.defaultConfig, config);
        if (!isStrictInitOptions(initOptions)) {
            throw 'roomName, maxPlayers, public and token must be set';
        }
        this.initOptions = initOptions;
        this.serverId = this.initOptions.roomName.replace(/[^A-Z0-9]/gi, '-').toLowerCase();
        this.instanceId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
        this.eventTarget = this;
        this.setNewGame();
        this.on('gameStart', this.setNewGame);
        this.on('playerJoin', ({ detail: player }) => this.playerIdToAuth.set(player.id, player.auth));
        this.on('playerLeave', ({ detail: player }) => this.playerIdToAuth.delete(player.id));
        this.on('playerChat', this.handlePlayerChat);
        this.on('playerTeamChange', this.handleActive);
        this.on('roomLink', ({ detail: url }) => this.log(`Started: ${url}`));
        this.on('captcha', () => this.log('Failed to start: Faulty token'));
        this.on('playerJoin', ({ detail: player }) => this.notify(Instance.motd, player.id));
        this.registerCommand(['!h', '!help'], 'Display this help', this.handleHelp);
        this.registerCommand(['!stc', '!stopthecount'], 'Request to stop the count of a vote', this.handleStopTheCount);
        this.room = {};
        this.fullRoom = {};
    }
    start() {
        this.fullRoom = window.WLInit(this.initOptions);
        this.room = this.fullRoom;
        this.room.setSettings(this.initialSettings);
        this.registerRoomCallbacks(this.fullRoom);
        this.enablePlugins();
    }
    log(...args) {
        console.log(...args.map(x => JSON.stringify(x)));
    }
    on(name, listener) {
        this.eventTarget.addEventListener(name, listener);
    }
    once(name, listener) {
        this.eventTarget.addEventListener(name, listener, { once: true });
    }
    off(name, listener) {
        this.eventTarget.removeEventListener(name, listener);
    }
    emit(name, detail) {
        return this.eventTarget.dispatchEvent(new CustomEvent(name, { detail, cancelable: true }));
    }
    notify(message, target) {
        this.room.sendAnnouncement(message, target, 0xFFFF00, "bold", 2);
    }
    softNotify(message, target) {
        this.room.sendAnnouncement(message, target, 0xDDDDDD);
    }
    error(message, target) {
        this.room.sendAnnouncement(message, target, 0xFF0000, "bold", 2);
    }
    registerCommand(names, description, callback) {
        this.commandDescriptions.set(names[0], [...names.map(name => name.padEnd(4, ' ')), description].join(" "));
        names.forEach(name => {
            if (name[0] != '!' || name.length < 2) {
                throw `${name} command not valid`;
            }
            if (this.commands.get(name)) {
                throw `command already registered ${name}`;
            }
            this.commands.set(name, callback);
        });
        return () => {
            this.commandDescriptions.delete(names[0]);
            names.forEach(name => this.commands.delete(name));
        };
    }
    findPlayer(token) {
        const players = this.room.getPlayerList();
        const playerById = players.find(player => this.shortId(player.id).toString() == token);
        return playerById || players.find(player => player.name == token);
    }
    mute(playerId, duration) {
        const minutes = Math.round(duration / 1000 / 60);
        this.error(`You have been muted for ${minutes} minutes`, playerId);
        const auth = this.playerIdToAuth.get(playerId);
        this.mutedPlayers.set(auth, {
            time: new Date(Date.now() + duration),
            timeout: window.setTimeout(() => this.unMute(playerId), duration)
        });
    }
    temporaryBan(player, reason, duration) {
        const minutes = Math.round(duration / 1000 / 60);
        this.room.kickPlayer(player.id, reason, true);
        this.notify(`${player.name} has been kicked for ${minutes} minutes`);
        setTimeout(() => this.room.clearBan(player.id), duration);
    }
    unMute(playerId) {
        this.error(`You have been unmuted`, playerId);
        const auth = this.playerIdToAuth.get(playerId);
        this.mutedPlayers.delete(auth);
    }
    clearMutes() {
        this.mutedPlayers.clear();
    }
    shortId(playerId) {
        return playerId % 1000;
    }
    election(name, player, callback) {
        const auth = this.playerIdToAuth.get(player.id);
        if (this.electionTimeouts.get(auth)) {
            this.error(`You may only start a vote once every ${this.config.voteTimeout / 1000} seconds`, player.id);
            return;
        }
        if (this.currentElection) {
            this.error("Another vote is already active, wait your turn", player.id);
            return;
        }
        this.electionTimeouts.set(auth, window.setTimeout(() => this.electionTimeouts.delete(auth), this.config.voteTimeout));
        new Election(this, name, player, () => {
            this.currentElection = undefined;
            callback();
        });
    }
    registerPlugin(name, plugin) {
        this.plugins.set(name, plugin);
        plugin.enable();
    }
    enablePlugins() {
        Object.entries(this.config.plugins).forEach(([name, pluginConfig]) => {
            if (pluginConfig.enabled) {
                switch (name) {
                    case 'admin':
                        this.registerPlugin(name, new Admin(this, this.config.plugins.admin));
                        break;
                    case 'afk':
                        this.registerPlugin(name, new AFK(this, this.config.plugins.afk));
                        break;
                    case 'info':
                        this.registerPlugin(name, new Info(this, this.config.plugins.info));
                        break;
                    case 'connection':
                        this.registerPlugin(name, new Connection(this, this.config.plugins.connection));
                        break;
                    case 'list':
                        this.registerPlugin(name, new List(this, this.config.plugins.list));
                        break;
                    case 'onePlayer':
                        this.registerPlugin(name, new OnePlayer(this, this.config.plugins.onePlayer));
                        break;
                    case 'scores':
                        this.registerPlugin(name, new Scores(this, this.config.plugins.scores));
                        break;
                    case 'slurper':
                        this.registerPlugin(name, new Slurper(this, this.config.plugins.slurper));
                        break;
                    case 'voteMutePlayer':
                        this.registerPlugin(name, new VoteMute(this, this.config.plugins.voteMutePlayer));
                        break;
                    case 'voteKickPlayer':
                        this.registerPlugin(name, new VoteKick(this, this.config.plugins.voteKickPlayer));
                        break;
                    case 'voteRestartMap':
                        this.registerPlugin(name, new VoteRestartMap(this, this.config.plugins.voteRestartMap));
                        break;
                    case 'voteSkipMap':
                        this.registerPlugin(name, new VoteSkipMap(this, this.config.plugins.voteSkipMap));
                        break;
                }
            }
        });
    }
    handleHelp(player, message) {
        this.notify("Available commands:", player.id);
        const commands = Array.from(this.commandDescriptions.values()).sort();
        commands.filter((command) => player.admin || !(command.substr(0, 2) == '!a'))
            .forEach(command => this.notify(command, player.id));
    }
    handleStopTheCount(player, message) {
        if (this.currentElection) {
            this.notify(`${player.name} has requested to stop the count, we of course ignore it and the counting of votes will continue`);
        }
        else {
            this.notify(`${player.name} has requested to stop the count, the vote is over and we ignore it`);
        }
    }
    registerRoomCallbacks(room) {
        room.onPlayerJoin = (player) => this.emit('playerJoin', player);
        room.onPlayerLeave = (player) => this.emit('playerLeave', player);
        room.onPlayerKicked = (player, reason, ban, byPlayer) => this.emit('playerKicked', { player, reason, ban, byPlayer });
        room.onPlayerChat = (player, message) => this.emit('playerChat', { player, message });
        room.onPlayerTeamChange = (player, byPlayer) => this.emit('playerTeamChange', { player, byPlayer });
        room.onPlayerAdminChange = (player, byPlayer) => this.emit('playerAdminChange', { player, byPlayer });
        room.onGameTick = () => this.emit('gameTick', null);
        room.onPlayerActivity = (player) => this.emit('playerActivity', player);
        room.onRoomLink = (link) => this.emit('roomLink', link);
        room.onGameStart = () => this.emit('gameStart', room.getSettings());
        room.onGameEnd = () => this.emit('gameEnd', null);
        const originalGameEnd2 = room.onGameEnd2;
        room.onGameEnd2 = () => {
            (this.config.onGameEnd2 || originalGameEnd2).apply(room);
            this.emit('gameEnd2', null);
        };
        room.onPlayerKilled = (killed, killer) => this.emit('playerKilled', { killed, killer });
        room.onCaptcha = () => this.emit('captcha', null);
    }
    generateId() {
        return `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
    }
}
Instance.configVersion = 1;
Instance.spectatorTeam = 0;
Instance.motd = `Digger ${Instance.configVersion} loaded, write !h or !help in chat for commands`;
Instance.defaultConfig = {
    configVersion: Instance.configVersion,
    voteTime: 30000,
    voteTimeout: 45000,
    plugins: {
        admin: {
            enabled: true,
            auths: [],
            muteDuration: 15 * 60 * 1000,
            kickDuration: 15 * 60 * 1000
        },
        afk: {
            enabled: true,
            timeout: 60000,
            graceTime: 10000,
            hotTimeout: 3000,
            kickAFKSpectatorWhenFull: true
        },
        info: {
            enabled: true,
            announceNameChange: true,
            annouceNamesCount: 4
        },
        connection: {
            enabled: true,
            maxConnectionsPerIP: 3
        },
        list: { enabled: true },
        onePlayer: { enabled: true },
        scores: { enabled: true },
        slurper: {
            enabled: true,
            events: [
                'captcha',
                'changePlayerName',
                'gameEnd',
                'gameEnd2',
                'gameStart',
                // 'gameTick', // Disabled for performance reasons
                'newPlayer',
                'playerActive',
                // 'playerActivity', // Disabled for performance reasons
                'playerAdminChange',
                'playerChat',
                'playerInactive',
                'playerJoin',
                'playerKicked',
                'playerKilled',
                'playerLeave',
                'playerScores',
                'playerTeamChange',
                'roomLink',
                'teamScores',
            ]
        },
        voteMutePlayer: {
            enabled: true,
            muteDuration: 15 * 60 * 1000
        },
        voteKickPlayer: {
            enabled: true,
            kickDuration: 15 * 60 * 1000
        },
        voteRestartMap: { enabled: true },
        voteSkipMap: { enabled: true }
    }
};

export { Instance };
//# sourceMappingURL=digger.js.map
