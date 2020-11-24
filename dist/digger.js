/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

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

var Election = /** @class */ (function () {
    function Election(instance, name, initiatingPlayer, callback) {
        var _this = this;
        this.votes = new Map();
        this.ended = false;
        this.instance = instance;
        this.callback = callback;
        var auth = this.instance.playerIdToAuth.get(initiatingPlayer.id);
        this.votes.set(auth, 'y');
        this.voteCommandHandler = this.instance.registerCommand(['!y', '!n'], '', this.handleVote);
        this.instance.on('playerLeave', this.reCount);
        this.instance.on('playerJoin', this.reCount);
        this.timeout = window.setTimeout(function () {
            _this.instance.notify("Vote: " + name + " failed");
            _this.end();
        }, this.instance.config.voteTime);
        this.instance.notify("Vote: " + name + " started, vote with !y or !n, current ");
        this.reCount();
    }
    Election.prototype.handleVote = function (player, message) {
        var playerAuth = this.instance.playerIdToAuth.get(player.id);
        if (this.votes.get(playerAuth)) {
            this.instance.error("You have already voted in this election, you may be interested in !stopthecount", player.id);
        }
        else {
            this.votes.set(playerAuth, message[1]);
            this.reCount();
        }
    };
    Election.prototype.reCount = function () {
        var playerCount = Object.keys(this.instance.playerIdToAuth).length;
        var neededVotes = playerCount == 2 ? 2 : playerCount / 2;
        var voteCounts = Array.from(this.votes.values()).reduce(function (acc, vote) { acc[vote] += 1; return acc; }, { y: 0, n: 0 });
        var prefix = "Vote: " + name + ", " + voteCounts.y + "/" + playerCount + " in favour, " + voteCounts.n + "/" + playerCount + " against. ";
        if (voteCounts.y >= neededVotes) {
            this.instance.notify(prefix + "Moving ahead with " + name);
            this.end();
            this.callback();
        }
        else if (voteCounts.n >= neededVotes || voteCounts.n + voteCounts.y == playerCount) {
            this.instance.notify(prefix + "Dismissed " + name);
            this.end();
        }
        else {
            this.instance.notify(prefix + ", participate using !y or !n");
        }
    };
    Election.prototype.end = function () {
        if (this.ended) {
            return;
        }
        this.ended = true;
        this.instance.currentElection = undefined;
        this.voteCommandHandler();
        this.instance.off('playerLeave', this.reCount);
        this.instance.off('playerJoin', this.reCount);
        clearTimeout(this.timeout);
    };
    return Election;
}());

var Plugin = /** @class */ (function () {
    function Plugin(instance, config) {
        this.listeners = [];
        this.commandHandlers = [];
        instance.log(this.constructor.name + " loaded");
        this.instance = instance;
        this.config = config;
        if (config.enabled) {
            this.enable();
            instance.log(this.constructor.name + " enabled with " + JSON.stringify(config));
        }
    }
    Plugin.prototype.disable = function () {
        var _this = this;
        this.instance.log(this.constructor.name + " disabled");
        this.listeners.forEach(function (_a) {
            var name = _a.name, listener = _a.listener;
            _this.instance.off(name, listener);
        });
        this.commandHandlers.forEach(function (handler) { return handler(); });
    };
    Plugin.prototype.on = function (name, listener) {
        this.listeners.push({ name: name, listener: listener });
        this.instance.on(name, listener);
    };
    Plugin.prototype.registerCommand = function (commands, description, callback) {
        var handler = this.instance.registerCommand(commands, description, callback);
        this.commandHandlers.push(handler);
        return handler;
    };
    return Plugin;
}());

var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(instance, config) {
        var _this = _super.call(this, instance, config) || this;
        _this.auths = new Set(config.auths);
        return _this;
    }
    Admin.prototype.enable = function () {
        var _this = this;
        this.on('playerJoin', this.handleJoin);
        this.registerCommand(['!a'], 'Admin: !a s[kip] | r[estart] | d[efcon6] | m[ute] t | u[nmute] t | k[ick] t | b[an] t | c[ban] t', function (player, message) {
            if (!player.admin) {
                _this.instance.error('Not admin', player.id);
                return;
            }
            var parts = message.replace(/ +/, ' ').split(' ');
            if (parts.length == 2) {
                switch (parts[1][0]) {
                    case 's': _this.instance.room.endGame();
                    case 'r': _this.instance.room.restartGame();
                    case 'd': _this.instance.error('Not yet implemented', player.id);
                    default: return _this.respondWithUsage(player.id);
                }
            }
            else if (parts.length >= 3) {
                var targetPlayer = _this.instance.findPlayer(parts[2]);
                if (!targetPlayer) {
                    _this.instance.notify("Could not find targetPlayer: " + parts[2] + ", use !list", player.id);
                    return;
                }
                switch (parts[2][0]) {
                    case 'm': _this.mute(player, targetPlayer);
                    case 'u': _this.unMute(player, targetPlayer);
                    case 'k': _this.instance.room.kickPlayer(targetPlayer.id, "You have been kicked " + parts[3], false);
                    case 'b': _this.instance.temporaryBan(targetPlayer, "You have been kicked for " + Math.round(_this.config.kickDuration / 1000 / 60) + " minutes " + parts[3], _this.config.kickDuration);
                    case 'c': _this.instance.room.clearBan(targetPlayer.id);
                    default: return _this.respondWithUsage(player.id);
                }
            }
            else {
                _this.respondWithUsage(player.id);
            }
        });
    };
    Admin.prototype.mute = function (admin, targetPlayer) {
        var minutes = this.config.muteDuration / 1000 / 60;
        this.instance.notify(targetPlayer.name + " has been muted for " + minutes + " minutes, use \"!a unmute " + this.instance.shortId(targetPlayer.id) + "\" to unmute");
        this.instance.mute(targetPlayer.id, this.config.muteDuration);
    };
    Admin.prototype.unMute = function (admin, targetPlayer) {
        this.instance.notify(targetPlayer.name + " has been ungagged");
        this.instance.unMute(targetPlayer.id);
    };
    Admin.prototype.respondWithUsage = function (playerId) {
        this.instance.notify("Usage:", playerId);
        this.instance.notify("!a s or !a skip", playerId);
        this.instance.notify("!a r or !a restart", playerId);
        this.instance.notify("!a d or !a defcon6", playerId);
        this.instance.notify("!a m 123 or !a mute 123", playerId);
        this.instance.notify("!a u 123 or !a unmute 123", playerId);
        this.instance.notify("!a k 123 or !a kick 123", playerId);
        this.instance.notify("!a b 123 or !a ban 123", playerId);
        this.instance.notify("!a c 123 or !a cban 123", playerId);
    };
    Admin.prototype.handleJoin = function (_a) {
        var player = _a.detail;
        if (this.auths.has(player.auth)) {
            this.instance.room.setPlayerAdmin(player.id, true);
        }
    };
    return Admin;
}(Plugin));

var AFK = /** @class */ (function (_super) {
    __extends(AFK, _super);
    function AFK(instance, config) {
        var _this = _super.call(this, instance, config) || this;
        _this.playingPlayers = new Map();
        _this.hotPlayers = new Map();
        _this.kickCandidates = new Map();
        _this.timeout = config.timeout;
        _this.graceTime = config.graceTime;
        _this.hotTimeout = config.hotTimeout;
        _this.warnTimeout = _this.timeout - _this.graceTime;
        return _this;
    }
    AFK.prototype.enable = function () {
        this.on('playerJoin', this.handleMotd);
        if (this.config.kickAFKSpectatorWhenFull) {
            this.on('playerJoin', this.purgeInactiveSpectators);
        }
        this.on('playerTeamChange', this.handleTeamChange);
        this.on('playerActivity', this.activate);
        this.on('playerLeave', this.handleLeave);
    };
    AFK.prototype.handleMotd = function (_a) {
        var player = _a.detail;
        var motd = "AFK detection loaded, players are moved to spectators after " + this.timeout / 1000 + " seconds of inactivity";
        this.instance.notify(motd, player.id);
    };
    AFK.prototype.handleTeamChange = function (_a) {
        var _b = _a.detail, player = _b.player, byPlayer = _b.byPlayer;
        if (player.team == Instance.spectatorTeam) {
            this.clearPlayerTimeout(player.id);
        }
        else {
            this.kickCandidates.delete(player.id);
            this.resetPlayerTimeout(player.id);
        }
    };
    AFK.prototype.handleLeave = function (_a) {
        var player = _a.detail;
        this.kickCandidates.delete(player.id);
        this.clearPlayerTimeout(player.id);
    };
    AFK.prototype.activate = function (_a) {
        var _this = this;
        var player = _a.detail;
        if (!this.hotPlayers.get(player.id)) {
            this.hotPlayers.set(player.id, window.setTimeout(function () { return _this.hotPlayers.delete(player.id); }, this.hotTimeout));
            if (this.playingPlayers.get(player.id)) {
                this.resetPlayerTimeout(player.id);
            }
        }
    };
    AFK.prototype.resetPlayerTimeout = function (playerId) {
        var _this = this;
        this.clearPlayerTimeout(playerId);
        this.playingPlayers.set(playerId, window.setTimeout(function () { return _this.evictPlayer(playerId); }, this.warnTimeout));
    };
    AFK.prototype.clearPlayerTimeout = function (playerId) {
        var timeout = this.playingPlayers.get(playerId);
        if (timeout) {
            clearTimeout(timeout);
        }
        this.playingPlayers.delete(playerId);
    };
    AFK.prototype.evictPlayer = function (playerId) {
        var _this = this;
        var message = "You will be moved to spectators due too inactivity in " + this.graceTime / 1000 + " seconds, please move";
        this.instance.notify(message, playerId);
        var currentTimeout = this.playingPlayers.get(playerId);
        setTimeout(function () {
            var player = _this.instance.room.getPlayer(playerId);
            if (player && player.team != Instance.spectatorTeam && _this.playingPlayers.get(playerId) == currentTimeout) {
                _this.instance.softNotify("Moving " + player.name + " to spectators due to inactivity");
                var reason = "You were afk for more than " + _this.timeout / 1000 + " seconds, moving you to spectators";
                _this.instance.error(reason, playerId);
                _this.instance.room.setPlayerTeam(playerId, 0);
                _this.kickCandidates.set(playerId, new Date());
            }
        }, this.graceTime);
    };
    AFK.prototype.purgeInactiveSpectators = function (_a) {
        var player = _a.detail;
        var list = this.instance.room.getPlayerList();
        if (list.length >= this.instance.initOptions.maxPlayers) {
            var oldestPlayerPair = Array.from(this.kickCandidates).reduce(function (acc, el) { return acc[1] < el[1] ? acc : el; });
            if (oldestPlayerPair) {
                var oldestPlayer = this.instance.room.getPlayer(oldestPlayerPair[0]);
                this.instance.softNotify("Server full, kicking oldest afk spectator " + oldestPlayer.name);
                this.instance.room.kickPlayer(oldestPlayerPair[0], 'Server full, kicking oldest afk spectator', false);
            }
        }
    };
    return AFK;
}(Plugin));

var Aliases = /** @class */ (function (_super) {
    __extends(Aliases, _super);
    function Aliases() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aliases = new Map();
        return _this;
    }
    Aliases.prototype.enable = function () {
        var _this = this;
        this.on('playerJoin', this.handleJoin);
        this.registerCommand(['!a', '!aliases'], 'Check the previously known aliases of a player', function (player, message) {
            var parts = message.split(' ');
            if (parts.length < 2) {
                _this.instance.error("Usage: !a 123 or !a playerName", player.id);
                return;
            }
            var lastPart = parts[parts.length - 1];
            var targetPlayer = _this.instance.findPlayer(lastPart);
            if (!targetPlayer) {
                _this.instance.error("Could not find player", player.id);
                _this.instance.error("Usage: !a 123 or !aliases playerName", player.id);
                return;
            }
            var auth = _this.instance.playerIdToAuth.get(targetPlayer.id);
            _this.instance.notify(targetPlayer.name + " previously known names:", player.id);
            _this.namesByLastUsed(auth).forEach(function (_a) {
                var name = _a[0], time = _a[1];
                if (name != targetPlayer.name) {
                    var currentTime = new Date();
                    _this.instance.notify(name + " " + (+currentTime - +time) / 1000 / 60 / 60 + " hours ago", player.id);
                }
            });
        });
        if (this.config.announceNameChange) {
            this.on('changePlayerName', this.handleChangeName);
        }
    };
    Aliases.prototype.handleChangeName = function (_a) {
        var _this = this;
        var player = _a.detail;
        var names = this.namesByLastUsed(player.auth).slice(0, this.config.annouceNamesCount);
        this.instance.room.getPlayerList().forEach(function (otherPlayer) {
            if (_this.instance.playerIdToAuth.get(otherPlayer.id) != player.auth) {
                _this.instance.notify(player.name + " changed their name, last " + names.length + " previously known names:", otherPlayer.id);
                names.forEach(function (_a) {
                    var name = _a[0], date = _a[1];
                    return _this.instance.notify(name, otherPlayer.id);
                });
            }
        });
    };
    Aliases.prototype.namesByLastUsed = function (auth) {
        var names = this.aliases.get(auth);
        return Array.from(names).sort(function (a, b) { return b[1].getTime() - a[1].getTime(); });
    };
    Aliases.prototype.handleJoin = function (_a) {
        var player = _a.detail;
        var prev = this.aliases.get(player.auth);
        if (prev) {
            if (prev.get(player.name)) {
                this.instance.emit('changePlayerName', player);
            }
            prev.set(player.name, new Date());
        }
        else {
            this.aliases.set(player.auth, new Map());
            this.instance.emit('newPlayer', player);
        }
    };
    return Aliases;
}(Plugin));

var Connection = /** @class */ (function (_super) {
    __extends(Connection, _super);
    function Connection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.connectionMap = new Map();
        _this.playerIdToConn = new Map();
        return _this;
    }
    Connection.prototype.enable = function () {
        this.on('playerJoin', this.addPlayer);
        this.on('playerLeave', this.removePlayer);
    };
    Connection.prototype.addPlayer = function (_a) {
        var player = _a.detail;
        this.playerIdToConn.set(player.id, player.conn);
        var connectionPlayers = this.connectionMap.get(player.conn);
        if (connectionPlayers) {
            if (connectionPlayers.size >= this.config.maxConnectionsPerIP) {
                var playerPair = Array.from(connectionPlayers).reduce(function (acc, el) { return acc[1] < el[1] ? acc : el; });
                this.instance.room.kickPlayer(playerPair[0], 'Too many connections', false);
                connectionPlayers.delete(playerPair[0]);
            }
            connectionPlayers.set(player.id, new Date());
        }
        else {
            this.connectionMap.set(player.conn, new Map([[player.id, new Date()]]));
        }
    };
    Connection.prototype.removePlayer = function (_a) {
        var player = _a.detail;
        var conn = this.playerIdToConn.get(player.id);
        var connectionPlayers = this.connectionMap.get(conn);
        connectionPlayers.delete(player.id);
        this.playerIdToConn.delete(player.id);
    };
    return Connection;
}(Plugin));

var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List.prototype.enable = function () {
        var _this = this;
        this.registerCommand(['!l', '!list'], 'List the players showing an id and name', function (commandPlayer, message) {
            _this.instance.notify('Players: id, name', commandPlayer.id);
            _this.instance.room.getPlayerList().forEach(function (player) {
                _this.instance.notify(_this.instance.shortId(player.id) + "\t" + player.name, commandPlayer.id);
            });
        });
    };
    return List;
}(Plugin));

var OnePlayer = /** @class */ (function (_super) {
    __extends(OnePlayer, _super);
    function OnePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playingPlayers = new Map();
        _this.idToAuth = new Map();
        return _this;
    }
    OnePlayer.prototype.enable = function () {
        this.on('playerJoin', this.addPlayer);
        this.on('playerLeave', this.removePlayer);
    };
    OnePlayer.prototype.removePlayer = function (_a) {
        var player = _a.detail;
        this.idToAuth.delete(player.id);
        var auth = this.idToAuth.get(player.id);
        if (auth) {
            this.playingPlayers.delete(auth);
        }
    };
    OnePlayer.prototype.addPlayer = function (_a) {
        var player = _a.detail;
        this.idToAuth.set(player.id, player.auth);
        var existingPlayer = this.playingPlayers.get(player.auth);
        if (existingPlayer) {
            this.instance.room.kickPlayer(existingPlayer.id, 'Only one connection allowed', false);
        }
        this.playingPlayers.set(player.auth, player);
    };
    return OnePlayer;
}(Plugin));

var Scores = /** @class */ (function (_super) {
    __extends(Scores, _super);
    function Scores() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scores.prototype.enable = function () {
        this.on('gameEnd', this.handleGameEnd);
    };
    Scores.prototype.handleGameEnd = function () {
        var _this = this;
        var players = this.instance.room.getPlayerList();
        var teams = new Map();
        var playerScores = Array();
        players.forEach(function (player) {
            teams.set(player.team, true);
            var score = _this.instance.room.getPlayerScore(player.id);
            if (score) {
                playerScores.push({
                    player: player,
                    score: score
                });
            }
        });
        this.instance.emit('playerScores', playerScores);
        if (this.instance.room.getSettings().gameMode == 'tdm') {
            var teamScores_1 = Array();
            Object.keys(teams).map(function (teamIdstring) {
                var teamId = parseInt(teamIdstring, 10);
                if (teamId > 0) {
                    var teamScore = _this.instance.room.getTeamScore(teamId);
                    teamScores_1.push({ team: teamId, score: teamScore });
                }
            });
            this.instance.emit('teamScores', teamScores_1);
        }
    };
    return Scores;
}(Plugin));

var Slurper = /** @class */ (function (_super) {
    __extends(Slurper, _super);
    function Slurper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Slurper.prototype.enable = function () {
        var _this = this;
        if (this.config.url) {
            this.webSocket = new WebSocket(this.config.url);
        }
        this.config.events.forEach(function (eventName) {
            _this.on(eventName, _this.publish);
        });
        this.on('gameStart', this.handleGameStart);
    };
    Slurper.prototype.handleGameStart = function (event) {
        this.publish(new CustomEvent('GameSettings', { detail: this.instance.room.getSettings() }));
    };
    Slurper.prototype.publish = function (event) {
        var message = {
            time: Date.now(),
            event: event.type,
        };
        if (event.detail !== undefined) {
            message.detail = event.detail;
        }
        if (this.webSocket && this.webSocket.readyState == WebSocket.OPEN) {
            this.webSocket.send(JSON.stringify(message));
        }
        this.instance.log(message);
    };
    return Slurper;
}(Plugin));

var VoteMute = /** @class */ (function (_super) {
    __extends(VoteMute, _super);
    function VoteMute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoteMute.prototype.enable = function () {
        var _this = this;
        var minutes = this.config.muteDuration / 1000 / 60;
        this.registerCommand(['!vm', '!votemute'], 'Mute player vote, type !vm for Usage', function (player, message) {
            var parts = message.split(' ');
            if (parts.length < 2) {
                _this.instance.error("Usage: !vm 123 or !vm playerName", player.id);
                return;
            }
            var lastPart = parts[parts.length - 1];
            var targetPlayer = _this.instance.findPlayer(lastPart);
            if (!targetPlayer) {
                _this.instance.error("Could not find player", player.id);
                _this.instance.error("Usage: !vm 123 or !vm playerName", player.id);
                return;
            }
            _this.instance.election("Mute " + targetPlayer.name, player, function () {
                _this.instance.mute(targetPlayer.id, _this.config.muteDuration);
                _this.instance.notify(targetPlayer.name + " has been muted for " + minutes + " minutes");
            });
        });
    };
    return VoteMute;
}(Plugin));

var VoteKick = /** @class */ (function (_super) {
    __extends(VoteKick, _super);
    function VoteKick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoteKick.prototype.enable = function () {
        var _this = this;
        var minutes = Math.round(this.config.kickDuration / 1000 / 60);
        this.registerCommand(['!vk', '!votekick'], 'Kick player vote, type !vk for Usage', function (player, message) {
            var parts = message.split(' ');
            if (parts.length < 2) {
                _this.instance.error("Usage: !vk 123 or !vk playerName", player.id);
                return;
            }
            var lastPart = parts[parts.length - 1];
            var targetPlayer = _this.instance.findPlayer(lastPart);
            if (!targetPlayer) {
                _this.instance.error("Could not find player", player.id);
                _this.instance.error("Usage: !vk 123 or !vk playerName", player.id);
                return;
            }
            _this.instance.election("Kick " + targetPlayer.name + " for " + minutes + " minutes", player, function () {
                _this.instance.temporaryBan(targetPlayer, "Vote kick", _this.config.kickDuration);
            });
        });
    };
    return VoteKick;
}(Plugin));

var VoteRestartMap = /** @class */ (function (_super) {
    __extends(VoteRestartMap, _super);
    function VoteRestartMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoteRestartMap.prototype.enable = function () {
        var _this = this;
        this.registerCommand(['!vr', '!voterestart'], 'Restart map vote', function (player, message) {
            _this.instance.election('Skip map', player, function () {
                _this.instance.room.restartGame();
                _this.instance.notify('Game restarted');
            });
        });
    };
    return VoteRestartMap;
}(Plugin));

var VoteSkipMap = /** @class */ (function (_super) {
    __extends(VoteSkipMap, _super);
    function VoteSkipMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoteSkipMap.prototype.enable = function () {
        var _this = this;
        this.registerCommand(['!vs', '!voteskip'], 'Skip map vote', function (player, message) {
            _this.instance.election('Skip map', player, function () { return _this.instance.room.endGame(); });
        });
    };
    return VoteSkipMap;
}(Plugin));

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
    var so = options;
    return !!so.roomName && !!so.maxPlayers && so.public !== undefined && !!so.token;
}
var Instance = /** @class */ (function () {
    function Instance(window, initOptions, initialSettings, config) {
        var _this = this;
        this.commands = new Map();
        this.commandDescriptions = new Map();
        this.playerIdToAuth = new Map();
        this.mutedPlayers = new Map();
        this.activePlayers = new Map();
        this.electionTimeouts = new Map();
        this.window = window;
        this.config = config;
        this.initialSettings = initialSettings;
        this.config = merge(Instance.defaultConfig, config);
        if (window.onWLLoaded) {
            throw 'already loaded';
        }
        if (!isStrictInitOptions(initOptions)) {
            throw 'roomName, maxPlayers, public and token must be set';
        }
        if (this.config.configVersion != Instance.configVersion) {
            throw "Your config is out of date and not compatible with latest digger, check https://gitlab.com/webliero/digger";
        }
        this.initOptions = initOptions;
        this.validateInitOptions();
        this.fullRoom = window.WLInit(initOptions);
        this.room = this.fullRoom;
        this.room.setSettings(initialSettings);
        this.serverId = this.initOptions.roomName.replace(/[^A-Z0-9]/gi, '-').toLowerCase();
        this.instanceId = Date.now().toString(36) + "#" + Math.round(Math.random() * Math.pow(36, 3)).toString(36);
        this.setNewGame();
        this.eventTarget = new EventTarget();
        this.registerRoomCallbacks();
        this.on('gameStart', function (e) { _this.setNewGame(); });
        this.on('playerJoin', function (_a) {
            var player = _a.detail;
            return _this.playerIdToAuth.set(player.id, player.auth);
        });
        this.on('playerLeave', function (_a) {
            var player = _a.detail;
            return _this.playerIdToAuth.delete(player.id);
        });
        this.on('playerChat', this.handlePlayerChat);
        this.on('playerTeamChange', this.handleActive);
        this.on('roomLink', function (_a) {
            var url = _a.detail;
            return _this.log("Started: `${url}`");
        });
        this.on('captcha', function () { return _this.log('Failed to start: Faulty token'); });
        this.on('playerJoin', function (_a) {
            var player = _a.detail;
            return _this.notify(Instance.motd, player.id);
        });
        this.registerCommand(['!h', '!help'], 'Display this help', this.handleHelp);
        this.registerCommand(['!stc', '!stopthecount'], 'Request to stop the count of a vote', this.handleStopTheCount);
        this.enablePlugins();
    }
    Instance.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, args.map(function (x) { return JSON.stringify(x); }));
    };
    Instance.prototype.on = function (name, listener) {
        this.eventTarget.addEventListener(name, listener);
    };
    Instance.prototype.once = function (name, listener) {
        this.eventTarget.addEventListener(name, listener, { once: true });
    };
    Instance.prototype.off = function (name, listener) {
        this.eventTarget.removeEventListener(name, listener);
    };
    Instance.prototype.emit = function (name, detail) {
        return this.eventTarget.dispatchEvent(new CustomEvent(name, { detail: detail, cancelable: true }));
    };
    Instance.prototype.notify = function (message, target) {
        this.room.sendAnnouncement(message, target, 0xFFFF00, "bold", 2);
    };
    Instance.prototype.softNotify = function (message, target) {
        this.room.sendAnnouncement(message, target, 0xDDDDDD);
    };
    Instance.prototype.error = function (message, target) {
        this.room.sendAnnouncement(message, target, 0xFF0000, "bold", 2);
    };
    Instance.prototype.registerCommand = function (names, description, callback) {
        var _this = this;
        this.commandDescriptions.set(names[0], __spreadArrays(names.map(function (name) { return name.padEnd(4, ' '); }), [description]).join(" "));
        names.forEach(function (name) {
            if (name[0] != '!' || name.length < 2) {
                throw name + " command not valid";
            }
            if (_this.commands.get(name)) {
                throw 'command already registered';
            }
            _this.commands.set(name, callback);
        });
        return function () {
            _this.commandDescriptions.delete(names[0]);
            names.forEach(function (name) { return _this.commands.delete(name); });
        };
    };
    Instance.prototype.findPlayer = function (token) {
        var _this = this;
        var players = this.room.getPlayerList();
        var playerById = players.find(function (player) { return _this.shortId(player.id).toString() == token; });
        return playerById || players.find(function (player) { return player.name == token; });
    };
    Instance.prototype.mute = function (playerId, duration) {
        var _this = this;
        var minutes = Math.round(duration / 1000 / 60);
        this.error("You have been muted for " + minutes + " minutes", playerId);
        var auth = this.playerIdToAuth.get(playerId);
        this.mutedPlayers.set(auth, {
            time: new Date(Date.now() + duration),
            timeout: window.setTimeout(function () { return _this.unMute(playerId); }, duration)
        });
    };
    Instance.prototype.temporaryBan = function (player, reason, duration) {
        var _this = this;
        var minutes = Math.round(duration / 1000 / 60);
        this.room.kickPlayer(player.id, reason, true);
        this.notify(player.name + " has been kicked for " + minutes + " minutes");
        setTimeout(function () { return _this.room.clearBan(player.id); }, duration);
    };
    Instance.prototype.unMute = function (playerId) {
        this.error("You have been unmuted", playerId);
        var auth = this.playerIdToAuth.get(playerId);
        this.mutedPlayers.delete(auth);
    };
    Instance.prototype.clearMutes = function () {
        this.mutedPlayers.clear();
    };
    Instance.prototype.shortId = function (playerId) {
        return playerId % 1000;
    };
    Instance.prototype.election = function (name, player, callback) {
        var _this = this;
        var auth = this.playerIdToAuth.get(player.id);
        if (this.electionTimeouts.get(auth)) {
            this.error("You may only start a vote once every " + this.config.voteTimeout / 1000 + " seconds", player.id);
            return;
        }
        if (this.currentElection) {
            this.notify("Another vote is already active, wait your turn", player.id);
            return;
        }
        this.electionTimeouts.set(auth, window.setTimeout(function () { return _this.electionTimeouts.delete(auth); }, this.config.voteTimeout));
        this.currentElection = new Election(this, name, player, function () {
            _this.currentElection = undefined;
            callback();
        });
    };
    Instance.prototype.enablePlugins = function () {
        var _this = this;
        Object.entries(this.config.plugins).forEach(function (_a) {
            var name = _a[0], pluginConfig = _a[1];
            if (pluginConfig.enabled) {
                switch (name) {
                    case 'admin':
                        new Admin(_this, _this.config.plugins.admin);
                    case 'afk':
                        new AFK(_this, _this.config.plugins.afk);
                    case 'aliases':
                        new Aliases(_this, _this.config.plugins.aliases);
                    case 'connection':
                        new Connection(_this, _this.config.plugins.connection);
                    case 'list':
                        new List(_this, _this.config.plugins.list);
                    case 'onePlayer':
                        new OnePlayer(_this, _this.config.plugins.onePlayer);
                    case 'scores':
                        new Scores(_this, _this.config.plugins.scores);
                    case 'slurper':
                        new Slurper(_this, _this.config.plugins.slurper);
                    case 'voteMutePlayer':
                        new VoteMute(_this, _this.config.plugins.voteMutePlayer);
                    case 'voteKickPlayer':
                        new VoteKick(_this, _this.config.plugins.voteKickPlayer);
                    case 'voteRestartMap':
                        new VoteRestartMap(_this, _this.config.plugins.voteRestartMap);
                    case 'voteSkipMap':
                        new VoteSkipMap(_this, _this.config.plugins.voteSkipMap);
                }
            }
        });
    };
    Instance.prototype.handleHelp = function (player, message) {
        var _this = this;
        this.notify("Available commands:", player.id);
        var commands = Array.from(this.commandDescriptions.values()).sort();
        commands.filter(function (command) { return player.admin || !(command.substr(0, 2) == '!a'); })
            .forEach(function (command) { return _this.notify(command, player.id); });
    };
    Instance.prototype.handleActive = function (_a) {
        var _b = _a.detail, player = _b.player, byPlayer = _b.byPlayer;
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
    Instance.prototype.handlePlayerChat = function (event) {
        var _a = event.detail, player = _a.player, message = _a.message;
        message = message.trim();
        if (message[0] == '!') {
            var firstSpaceIndex = message.indexOf(' ');
            var commandName = firstSpaceIndex == -1 ? message : message.substr(0, firstSpaceIndex);
            var callback = this.commands.get(commandName);
            if (callback) {
                callback(player, message);
            }
            else {
                var response = "\"" + commandName + "\" not recognized command";
                this.room.sendAnnouncement(response, player.id, 0xFF0000, "bold", 2);
            }
            event.preventDefault();
        }
        var auth = this.playerIdToAuth.get(player.id);
        var muteConfig = this.mutedPlayers.get(auth);
        if (muteConfig) {
            var minutes = Math.round((muteConfig.time.getTime() - Date.now()) / 1000 / 60);
            this.room.sendAnnouncement("You are muted for " + minutes + " minutes more", player.id, 0xFF0000, "bold", 2);
            event.preventDefault();
        }
    };
    Instance.prototype.setNewGame = function () {
        this.gameStartTime = new Date();
        this.gameId = Date.now().toString(36) + "#" + Math.round(Math.random() * Math.pow(36, 3)).toString(36);
    };
    Instance.prototype.handleStopTheCount = function (player, message) {
        if (this.currentElection) {
            this.notify(player.name + " has requested to stop the count, we of course ignore it and the counting of votes will continue");
        }
        else {
            this.notify(player.name + " has requested to stop the count, the vote is over and we ignore it");
        }
    };
    Instance.prototype.registerRoomCallbacks = function () {
        var _this = this;
        this.fullRoom.onPlayerJoin = function (player) { _this.emit('playerJoin', player); };
        this.fullRoom.onPlayerLeave = function (player) { _this.emit('playerLeave', player); };
        this.fullRoom.onPlayerKicked = function (player, reason, ban, byPlayer) {
            _this.emit('playerKicked', { player: player, reason: reason, ban: ban, byPlayer: byPlayer });
        };
        this.fullRoom.onPlayerChat = function (player, message) { return _this.emit('playerChat', { player: player, message: message }); };
        this.fullRoom.onPlayerTeamChange = function (player, byPlayer) { _this.emit('playerTeamChange', { player: player, byPlayer: byPlayer }); };
        this.fullRoom.onPlayerAdminChange = function (player, byPlayer) { _this.emit('playerAdminChange', { player: player, byPlayer: byPlayer }); };
        this.fullRoom.onGameTick = function () { _this.emit('gameTick', null); };
        this.fullRoom.onPlayerActivity = function (player) { _this.emit('playerActivity', player); };
        this.fullRoom.onRoomLink = function (link) { _this.emit('roomLink', link); };
        this.fullRoom.onGameStart = function () { _this.emit('gameStart', null); };
        this.fullRoom.onGameEnd = function () { _this.emit('gameEnd', null); };
        this.fullRoom.onGameEnd2 = function () { _this.emit('gameEnd2', null); };
        this.fullRoom.onPlayerKilled = function (killed, killer) { _this.emit('playerKilled', { killed: killed, killer: killer }); };
        this.fullRoom.onCaptcha = function () { _this.emit('captcha', null); };
    };
    Instance.prototype.validateInitOptions = function () {
        if (!this.initOptions.roomName) {
            throw 'you must set a roomName';
        }
        if (!this.initOptions.maxPlayers) {
            throw 'you must set maxPlayers';
        }
    };
    Instance.prototype.generateId = function () {
        return Date.now().toString(36) + "#" + Math.round(Math.random() * Math.pow(36, 3)).toString(36);
    };
    Instance.configVersion = '0.1.0';
    Instance.spectatorTeam = 0;
    Instance.motd = "Digger " + Instance.configVersion + " loaded, write !h or !help in chat for commands";
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
            aliases: {
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
    return Instance;
}());

export { Instance };
//# sourceMappingURL=digger.js.map
