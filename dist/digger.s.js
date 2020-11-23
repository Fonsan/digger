!function(){function e(e,t){return(t||"")+" (SystemJS https://git.io/JvFET#"+e+")"}function t(e,t){if(-1!==e.indexOf("\\")&&(e=e.replace(/\\/g,"/")),"/"===e[0]&&"/"===e[1])return t.slice(0,t.indexOf(":")+1)+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length&&(e+="/"))||1===e.length&&(e+="/"))||"/"===e[0]){var n,r=t.slice(0,t.indexOf(":")+1);if(n="/"===t[r.length+1]?"file:"!==r?(n=t.slice(r.length+2)).slice(n.indexOf("/")+1):t.slice(8):t.slice(r.length+("/"===t[r.length])),"/"===e[0])return t.slice(0,t.length-n.length-1)+e;for(var i=n.slice(0,n.lastIndexOf("/")+1)+e,o=[],c=-1,s=0;i.length>s;s++)-1!==c?"/"===i[s]&&(o.push(i.slice(c,s+1)),c=-1):"."===i[s]?"."!==i[s+1]||"/"!==i[s+2]&&s+2!==i.length?"/"===i[s+1]||s+1===i.length?s+=1:c=s:(o.pop(),s+=2):c=s;return-1!==c&&o.push(i.slice(c)),t.slice(0,t.length-n.length)+o.join("")}}function n(e,n){return t(e,n)||(-1!==e.indexOf(":")?e:t("./"+e,n))}function r(e,n,r,i,o){for(var u in e){var f=t(u,r)||u,a=e[u];if("string"==typeof a){var l=s(i,t(a,r)||a,o);l?n[f]=l:c("W1",u,a)}}}function i(e,t){if(t[e])return e;var n=e.length;do{var r=e.slice(0,n+1);if(r in t)return r}while(-1!==(n=e.lastIndexOf("/",n-1)))}function o(e,t){var n=i(e,t);if(n){var r=t[n];if(null===r)return;if(n.length>=e.length||"/"===r[r.length-1])return r+e.slice(n.length);c("W2",n,r)}}function c(t,n,r){console.warn(e(t,[r,n].join(", ")))}function s(e,t,n){for(var r=e.scopes,c=n&&i(n,r);c;){var s=o(t,r[c]);if(s)return s;c=i(c.slice(0,c.lastIndexOf("/")),r)}return o(t,e.imports)||-1!==t.indexOf(":")&&t}function u(){this[x]={}}function f(t,n,r){var i=t[x][n];if(i)return i;var o=[],c=Object.create(null);E&&Object.defineProperty(c,E,{value:"Module"});var s=Promise.resolve().then((function(){return t.instantiate(n,r)})).then((function(r){if(!r)throw Error(e(2,n));var s=r[1]((function(e,t){i.h=!0;var n=!1;if("string"==typeof e)e in c&&c[e]===t||(c[e]=t,n=!0);else{for(var r in e)t=e[r],r in c&&c[r]===t||(c[r]=t,n=!0);e.__esModule&&(c.__esModule=e.__esModule)}if(n)for(var s=0;o.length>s;s++){var u=o[s];u&&u(c)}return t}),2===r[1].length?{import:function(e){return t.import(e,n)},meta:t.createContext(n)}:void 0);return i.e=s.execute||function(){},[r[0],s.setters||[]]})),u=s.then((function(e){return Promise.all(e[0].map((function(r,i){var o=e[1][i];return Promise.resolve(t.resolve(r,n)).then((function(e){var r=f(t,e,n);return Promise.resolve(r.I).then((function(){return o&&(r.i.push(o),!r.h&&r.I||o(r.n)),r}))}))}))).then((function(e){i.d=e}),!1)}));return u.catch((function(e){i.e=null,i.er=e})),i=t[x][n]={id:n,i:o,n:c,I:s,L:u,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0}}function a(){[].forEach.call(document.querySelectorAll("script"),(function(t){if(!t.sp)if("systemjs-module"===t.type){if(t.sp=!0,!t.src)return;System.import("import:"===t.src.slice(0,7)?t.src.slice(7):n(t.src,l))}else if("systemjs-importmap"===t.type){t.sp=!0;var i=t.src?fetch(t.src,{integrity:t.integrity}).then((function(e){return e.text()})):t.innerHTML;j=j.then((function(){return i})).then((function(i){!function(t,i,o){try{var c=JSON.parse(i)}catch(s){throw Error(e(1))}!function(e,t,i){var o;for(o in e.imports&&r(e.imports,i.imports,t,i,null),e.scopes||{}){var c=n(o,t);r(e.scopes[o],i.scopes[c]||(i.scopes[c]={}),t,i,c)}for(o in e.depcache||{})i.depcache[n(o,t)]=e.depcache[o];for(o in e.integrity||{})i.integrity[n(o,t)]=e.integrity[o]}(c,o,t)}(C,i,t.src||l)}))}}))}var l,h="undefined"!=typeof Symbol,v="undefined"!=typeof self,d="undefined"!=typeof document,p=v?self:global;if(d){var g=document.querySelector("base[href]");g&&(l=g.href)}if(!l&&"undefined"!=typeof location){var m=(l=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==m&&(l=l.slice(0,m+1))}var y,E=h&&Symbol.toStringTag,x=h?Symbol():"@",w=u.prototype;w.import=function(e,t){var n=this;return Promise.resolve(n.prepareImport()).then((function(){return n.resolve(e,t)})).then((function(e){var t=f(n,e);return t.C||function(e,t){return t.C=function e(t,n,r){if(!r[n.id])return r[n.id]=!0,Promise.resolve(n.L).then((function(){return Promise.all(n.d.map((function(n){return e(t,n,r)})))}))}(e,t,{}).then((function(){return function e(t,n,r){function i(){try{var e=n.e.call(O);if(e)return e=e.then((function(){n.C=n.n,n.E=null}),(function(e){throw n.er=e,n.E=null,e})),n.E=n.E||e;n.C=n.n}catch(t){throw n.er=t,t}finally{n.L=n.I=void 0,n.e=null}}if(!r[n.id]){if(r[n.id]=!0,!n.e){if(n.er)throw n.er;return n.E?n.E:void 0}var o;return n.d.forEach((function(i){try{var c=e(t,i,r);c&&(o=o||[]).push(c)}catch(s){throw n.e=null,n.er=s,s}})),o?Promise.all(o).then(i,(function(e){throw n.e=null,n.er=e,e})):i()}}(e,t,{})})).then((function(){return t.n}))}(n,t)}))},w.createContext=function(e){var t=this;return{url:e,resolve:function(n,r){return Promise.resolve(t.resolve(n,r||e))}}},w.register=function(e,t){y=[e,t]},w.getRegister=function(){var e=y;return y=void 0,e};var O=Object.freeze(Object.create(null));p.System=new u;var S,P,j=Promise.resolve(),C={imports:{},scopes:{},depcache:{},integrity:{}},I=d;if(w.prepareImport=function(e){return(I||e)&&(a(),I=!1),j},d&&(a(),window.addEventListener("DOMContentLoaded",a)),d){window.addEventListener("error",(function(e){L=e.filename,M=e.error}));var b=location.origin}w.createScript=function(e){var t=document.createElement("script");t.async=!0,e.indexOf(b+"/")&&(t.crossOrigin="anonymous");var n=C.integrity[e];return n&&(t.integrity=n),t.src=e,t};var L,M,T={},_=w.register;w.register=function(e,t){if(d&&"loading"===document.readyState&&"string"!=typeof e){var n=document.querySelectorAll("script[src]"),r=n[n.length-1];if(r){S=e;var i=this;P=setTimeout((function(){T[r.src]=[e,t],i.import(r.src)}))}}else S=void 0;return _.call(this,e,t)},w.instantiate=function(t,n){var r=T[t];if(r)return delete T[t],r;var i=this;return new Promise((function(r,o){var c=w.createScript(t);c.addEventListener("error",(function(){o(Error(e(3,[t,n].join(", "))))})),c.addEventListener("load",(function(){if(document.head.removeChild(c),L===t)o(M);else{var e=i.getRegister();e&&e[0]===S&&clearTimeout(P),r(e)}})),document.head.appendChild(c)}))},w.shouldFetch=function(){return!1},"undefined"!=typeof fetch&&(w.fetch=fetch);var R=w.instantiate,q=/^(text|application)\/(x-)?javascript(;|$)/;w.instantiate=function(t,n){var r=this;return this.shouldFetch(t)?this.fetch(t,{credentials:"same-origin",integrity:C.integrity[t]}).then((function(i){if(!i.ok)throw Error(e(7,[i.status,i.statusText,t,n].join(", ")));var o=i.headers.get("content-type");if(!o||!q.test(o))throw Error(e(4,o));return i.text().then((function(e){return(0,eval)(e),r.getRegister()}))})):R.apply(this,arguments)},w.resolve=function(n,r){return s(C,t(n,r=r||l)||n,r)||function(t,n){throw Error(e(8,[t,n].join(", ")))}(n,r)};var F=w.instantiate;w.instantiate=function(e,t){var n=C.depcache[e];if(n)for(var r=0;n.length>r;r++)f(this,this.resolve(n[r],e),e);return F.call(this,e,t)},v&&"function"==typeof importScripts&&(w.instantiate=function(e){var t=this;return Promise.resolve().then((function(){return importScripts(e),t.getRegister()}))})}();
//# sourceMappingURL=s.min.js.map
System.register("plugins/plugin", [], function (exports_1, context_1) {
    "use strict";
    var PluginConfig, Plugin;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            PluginConfig = class PluginConfig {
                constructor() {
                    this.enabled = true;
                }
            };
            exports_1("PluginConfig", PluginConfig);
            Plugin = class Plugin {
                constructor(instance, config) {
                    this.listeners = [];
                    this.commandHandlers = [];
                    instance.log(`${this.constructor.name} loaded`);
                    this.instance = instance;
                    this.config = config;
                    if (config.enabled) {
                        this.enable();
                        instance.log(`${this.constructor.name} enabled with ${JSON.stringify(config)}`);
                    }
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
            };
            exports_1("Plugin", Plugin);
        }
    };
});
System.register("plugins/admin", ["plugins/plugin"], function (exports_2, context_2) {
    "use strict";
    var plugin_1, Admin;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (plugin_1_1) {
                plugin_1 = plugin_1_1;
            }
        ],
        execute: function () {
            Admin = class Admin extends plugin_1.Plugin {
                constructor(instance, config) {
                    super(instance, config);
                    this.auths = new Set(config.auths);
                }
                enable() {
                    this.on('playerJoin', this.handleJoin);
                    this.registerCommand(['!a'], 'Admin: !a s[kip] | r[estart] | d[efcon6] | m[ute] t | u[nmute] t | k[ick] t | b[an] t | c[ban] t', (player, message) => {
                        if (!player.admin) {
                            this.instance.error('Not admin', player.id);
                            return;
                        }
                        const parts = message.replace(/ +/, ' ').split(' ');
                        if (parts.length == 2) {
                            switch (parts[1][0]) {
                                case 's': this.instance.room.endGame();
                                case 'r': this.instance.room.restartGame();
                                case 'd': this.instance.error('Not yet implemented', player.id);
                                default: return this.respondWithUsage(player.id);
                            }
                        }
                        else if (parts.length >= 3) {
                            const targetPlayer = this.instance.findPlayer(parts[2]);
                            if (!targetPlayer) {
                                this.instance.notify(`Could not find targetPlayer: ${parts[2]}, use !list`, player.id);
                                return;
                            }
                            switch (parts[2][0]) {
                                case 'm': this.mute(player, targetPlayer);
                                case 'u': this.unMute(player, targetPlayer);
                                case 'k': this.instance.room.kickPlayer(targetPlayer.id, `You have been kicked ${parts[3]}`, false);
                                case 'b': this.instance.temporaryBan(targetPlayer, `You have been kicked for ${Math.round(this.config.kickDuration / 1000 / 60)} minutes ${parts[3]}`, this.config.kickDuration);
                                case 'c': this.instance.room.clearBan(targetPlayer.id);
                                default: return this.respondWithUsage(player.id);
                            }
                        }
                        else {
                            this.respondWithUsage(player.id);
                        }
                    });
                }
                mute(admin, targetPlayer) {
                    const minutes = this.config.muteDuration / 1000 / 60;
                    this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes, use "!a unmute ${this.instance.shortId(targetPlayer.id)}" to unmute`);
                    this.instance.mute(targetPlayer.id, this.config.muteDuration);
                }
                unMute(admin, targetPlayer) {
                    this.instance.notify(`${targetPlayer.name} has been ungagged`);
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
                handleJoin({ detail: player }) {
                    if (this.auths.has(player.auth)) {
                        this.instance.room.setPlayerAdmin(player.id, true);
                    }
                }
            };
            exports_2("Admin", Admin);
        }
    };
});
System.register("plugins/afk", ["plugins/plugin", "instance"], function (exports_3, context_3) {
    "use strict";
    var plugin_2, instance_1, AFK;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (plugin_2_1) {
                plugin_2 = plugin_2_1;
            },
            function (instance_1_1) {
                instance_1 = instance_1_1;
            }
        ],
        execute: function () {
            AFK = class AFK extends plugin_2.Plugin {
                constructor(instance, config) {
                    super(instance, config);
                    this.playingPlayers = new Map();
                    this.hotPlayers = new Map();
                    this.kickCandidates = new Map();
                    this.timeout = config.timeout;
                    this.graceTime = config.graceTime;
                    this.hotTimeout = config.hotTimeout;
                    this.warnTimeout = this.timeout - this.graceTime;
                }
                enable() {
                    this.on('playerJoin', this.handleMotd);
                    if (this.config.kickAFKSpectatorWhenFull) {
                        this.on('playerJoin', this.purgeInactiveSpectators);
                    }
                    this.on('playerTeamChange', this.handleTeamChange);
                    this.on('playerActivity', this.activate);
                    this.on('playerLeave', this.handleLeave);
                }
                handleMotd({ detail: player }) {
                    const motd = `AFK detection loaded, players are moved to spectators after ${this.timeout / 1000} seconds of inactivity`;
                    this.instance.notify(motd, player.id);
                }
                handleTeamChange({ detail: { player, byPlayer } }) {
                    if (player.team == instance_1.Instance.spectatorTeam) {
                        this.clearPlayerTimeout(player.id);
                    }
                    else {
                        this.kickCandidates.delete(player.id);
                        this.resetPlayerTimeout(player.id);
                    }
                }
                handleLeave({ detail: player }) {
                    this.kickCandidates.delete(player.id);
                    this.clearPlayerTimeout(player.id);
                }
                activate({ detail: player }) {
                    if (!this.hotPlayers.get(player.id)) {
                        this.hotPlayers.set(player.id, setTimeout(() => this.hotPlayers.delete(player.id), this.hotTimeout));
                        if (this.playingPlayers.get(player.id)) {
                            this.resetPlayerTimeout(player.id);
                        }
                    }
                }
                resetPlayerTimeout(playerId) {
                    this.clearPlayerTimeout(playerId);
                    this.playingPlayers.set(playerId, setTimeout(() => this.evictPlayer(playerId), this.warnTimeout));
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
                        if (player && player.team != instance_1.Instance.spectatorTeam && this.playingPlayers.get(playerId) == currentTimeout) {
                            this.instance.softNotify(`Moving ${player.name} to spectators due to inactivity`);
                            const reason = `You were afk for more than ${this.timeout / 1000} seconds, moving you to spectators`;
                            this.instance.error(reason, playerId);
                            this.instance.room.setPlayerTeam(playerId, 0);
                            this.kickCandidates.set(playerId, new Date());
                        }
                    }, this.graceTime);
                }
                purgeInactiveSpectators({ detail: player }) {
                    const list = this.instance.room.getPlayerList();
                    if (list.length >= this.instance.initOptions.maxPlayers) {
                        const oldestPlayerPair = Array.from(this.kickCandidates).reduce((acc, el) => acc[1] < el[1] ? acc : el);
                        if (oldestPlayerPair) {
                            const oldestPlayer = this.instance.room.getPlayer(oldestPlayerPair[0]);
                            this.instance.softNotify(`Server full, kicking oldest afk spectator ${oldestPlayer.name}`);
                            this.instance.room.kickPlayer(oldestPlayerPair[0], 'Server full, kicking oldest afk spectator', false);
                        }
                    }
                }
            };
            exports_3("AFK", AFK);
        }
    };
});
System.register("plugins/aliases", ["plugins/plugin"], function (exports_4, context_4) {
    "use strict";
    var plugin_3, Aliases;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (plugin_3_1) {
                plugin_3 = plugin_3_1;
            }
        ],
        execute: function () {
            Aliases = class Aliases extends plugin_3.Plugin {
                constructor() {
                    super(...arguments);
                    this.aliases = new Map();
                }
                enable() {
                    this.on('playerJoin', this.handleJoin);
                    this.registerCommand(['!a', '!aliases'], 'Check the previously known aliases of a player', (player, message) => {
                        const parts = message.split(' ');
                        if (parts.length < 2) {
                            this.instance.error(`Usage: !a 123 or !a playerName`, player.id);
                            return;
                        }
                        const lastPart = parts[parts.length - 1];
                        const targetPlayer = this.instance.findPlayer(lastPart);
                        if (!targetPlayer) {
                            this.instance.error(`Could not find player`, player.id);
                            this.instance.error(`Usage: !a 123 or !aliases playerName`, player.id);
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
                handleChangeName({ detail: player }) {
                    const names = this.namesByLastUsed(player.auth).slice(0, this.config.annouceNamesCount);
                    this.instance.room.getPlayerList().forEach(otherPlayer => {
                        if (this.instance.playerIdToAuth.get(otherPlayer.id) != player.auth) {
                            this.instance.notify(`${player.name} changed their name, last ${names.length} previously known names:`, otherPlayer.id);
                            names.forEach(([name, date]) => this.instance.notify(name, otherPlayer.id));
                        }
                    });
                }
                namesByLastUsed(auth) {
                    const names = this.aliases.get(auth);
                    return Array.from(names).sort((a, b) => b[1].getTime() - a[1].getTime());
                }
                handleJoin({ detail: player }) {
                    const prev = this.aliases.get(player.auth);
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
                }
            };
            exports_4("Aliases", Aliases);
        }
    };
});
System.register("plugins/connection", ["plugins/plugin"], function (exports_5, context_5) {
    "use strict";
    var plugin_4, Connection;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (plugin_4_1) {
                plugin_4 = plugin_4_1;
            }
        ],
        execute: function () {
            Connection = class Connection extends plugin_4.Plugin {
                constructor() {
                    super(...arguments);
                    this.connectionMap = new Map();
                    this.playerIdToConn = new Map();
                }
                enable() {
                    this.on('playerJoin', this.addPlayer);
                    this.on('playerLeave', this.removePlayer);
                }
                addPlayer({ detail: player }) {
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
                }
                removePlayer({ detail: player }) {
                    const conn = this.playerIdToConn.get(player.id);
                    const connectionPlayers = this.connectionMap.get(conn);
                    connectionPlayers.delete(player.id);
                    this.playerIdToConn.delete(player.id);
                }
            };
            exports_5("Connection", Connection);
        }
    };
});
System.register("plugins/list", ["plugins/plugin"], function (exports_6, context_6) {
    "use strict";
    var plugin_5, List;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (plugin_5_1) {
                plugin_5 = plugin_5_1;
            }
        ],
        execute: function () {
            List = class List extends plugin_5.Plugin {
                enable() {
                    this.registerCommand(['!l', '!list'], 'List the players showing an id and name', (commandPlayer, message) => {
                        this.instance.notify('Players: id, name', commandPlayer.id);
                        this.instance.room.getPlayerList().forEach(player => {
                            this.instance.notify(`${this.instance.shortId(player.id)}\t${player.name}`, commandPlayer.id);
                        });
                    });
                }
            };
            exports_6("List", List);
        }
    };
});
System.register("plugins/one_player", ["plugins/plugin"], function (exports_7, context_7) {
    "use strict";
    var plugin_6, OnePlayer;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (plugin_6_1) {
                plugin_6 = plugin_6_1;
            }
        ],
        execute: function () {
            OnePlayer = class OnePlayer extends plugin_6.Plugin {
                constructor() {
                    super(...arguments);
                    this.playingPlayers = new Map();
                    this.idToAuth = new Map();
                }
                enable() {
                    this.on('playerJoin', this.addPlayer);
                    this.on('playerLeave', this.removePlayer);
                }
                removePlayer({ detail: player }) {
                    this.idToAuth.delete(player.id);
                    const auth = this.idToAuth.get(player.id);
                    if (auth) {
                        this.playingPlayers.delete(auth);
                    }
                }
                addPlayer({ detail: player }) {
                    this.idToAuth.set(player.id, player.auth);
                    const existingPlayer = this.playingPlayers.get(player.auth);
                    if (existingPlayer) {
                        this.instance.room.kickPlayer(existingPlayer.id, 'Only one connection allowed', false);
                    }
                    this.playingPlayers.set(player.auth, player);
                }
            };
            exports_7("OnePlayer", OnePlayer);
        }
    };
});
System.register("plugins/scores", ["plugins/plugin"], function (exports_8, context_8) {
    "use strict";
    var plugin_7, Scores;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (plugin_7_1) {
                plugin_7 = plugin_7_1;
            }
        ],
        execute: function () {
            Scores = class Scores extends plugin_7.Plugin {
                enable() {
                    this.on('gameEnd', this.handleGameEnd);
                }
                handleGameEnd() {
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
                }
            };
            exports_8("Scores", Scores);
        }
    };
});
System.register("plugins/slurper", ["plugins/plugin"], function (exports_9, context_9) {
    "use strict";
    var plugin_8, Slurper;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (plugin_8_1) {
                plugin_8 = plugin_8_1;
            }
        ],
        execute: function () {
            Slurper = class Slurper extends plugin_8.Plugin {
                enable() {
                    if (this.config.url) {
                        this.webSocket = new WebSocket(this.config.url);
                    }
                    this.config.events.forEach(eventName => {
                        this.on(eventName, this.publish);
                    });
                    this.on('gameStart', this.handleGameStart);
                }
                handleGameStart(event) {
                    this.publish(new CustomEvent('GameSettings', { detail: this.instance.room.getSettings() }));
                }
                publish(event) {
                    let message = {
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
                }
            };
            exports_9("Slurper", Slurper);
        }
    };
});
System.register("plugins/vote_mute", ["plugins/plugin"], function (exports_10, context_10) {
    "use strict";
    var plugin_9, VoteMute;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (plugin_9_1) {
                plugin_9 = plugin_9_1;
            }
        ],
        execute: function () {
            VoteMute = class VoteMute extends plugin_9.Plugin {
                enable() {
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
            };
            exports_10("VoteMute", VoteMute);
        }
    };
});
System.register("plugins/vote_kick", ["plugins/plugin"], function (exports_11, context_11) {
    "use strict";
    var plugin_10, VoteKick;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (plugin_10_1) {
                plugin_10 = plugin_10_1;
            }
        ],
        execute: function () {
            VoteKick = class VoteKick extends plugin_10.Plugin {
                enable() {
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
            };
            exports_11("VoteKick", VoteKick);
        }
    };
});
System.register("plugins/vote_restart_map", ["plugins/plugin"], function (exports_12, context_12) {
    "use strict";
    var plugin_11, VoteRestartMap;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (plugin_11_1) {
                plugin_11 = plugin_11_1;
            }
        ],
        execute: function () {
            VoteRestartMap = class VoteRestartMap extends plugin_11.Plugin {
                enable() {
                    this.registerCommand(['!vr', '!voterestart'], 'Restart map vote', (player, message) => {
                        this.instance.election('Skip map', player, () => {
                            this.instance.room.restartGame();
                            this.instance.notify('Game restarted');
                        });
                    });
                }
            };
            exports_12("VoteRestartMap", VoteRestartMap);
        }
    };
});
System.register("plugins/vote_skip_map", ["plugins/plugin"], function (exports_13, context_13) {
    "use strict";
    var plugin_12, VoteSkipMap;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (plugin_12_1) {
                plugin_12 = plugin_12_1;
            }
        ],
        execute: function () {
            VoteSkipMap = class VoteSkipMap extends plugin_12.Plugin {
                enable() {
                    this.registerCommand(['!vs', '!voteskip'], 'Skip map vote', (player, message) => {
                        this.instance.election('Skip map', player, () => this.instance.room.endGame());
                    });
                }
            };
            exports_13("VoteSkipMap", VoteSkipMap);
        }
    };
});
System.register("instance", ["ts-deepmerge", "election", "plugins/admin", "plugins/afk", "plugins/aliases", "plugins/connection", "plugins/list", "plugins/one_player", "plugins/scores", "plugins/slurper", "plugins/vote_mute", "plugins/vote_kick", "plugins/vote_restart_map", "plugins/vote_skip_map"], function (exports_14, context_14) {
    "use strict";
    var ts_deepmerge_1, election_1, admin_1, afk_1, aliases_1, connection_1, list_1, one_player_1, scores_1, slurper_1, vote_mute_1, vote_kick_1, vote_restart_map_1, vote_skip_map_1, EventEnum, Instance;
    var __moduleName = context_14 && context_14.id;
    function isStrictInitOptions(options) {
        const so = options;
        return !!so.roomName && !!so.maxPlayers && so.public !== undefined && !!so.token;
    }
    return {
        setters: [
            function (ts_deepmerge_1_1) {
                ts_deepmerge_1 = ts_deepmerge_1_1;
            },
            function (election_1_1) {
                election_1 = election_1_1;
            },
            function (admin_1_1) {
                admin_1 = admin_1_1;
            },
            function (afk_1_1) {
                afk_1 = afk_1_1;
            },
            function (aliases_1_1) {
                aliases_1 = aliases_1_1;
            },
            function (connection_1_1) {
                connection_1 = connection_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (one_player_1_1) {
                one_player_1 = one_player_1_1;
            },
            function (scores_1_1) {
                scores_1 = scores_1_1;
            },
            function (slurper_1_1) {
                slurper_1 = slurper_1_1;
            },
            function (vote_mute_1_1) {
                vote_mute_1 = vote_mute_1_1;
            },
            function (vote_kick_1_1) {
                vote_kick_1 = vote_kick_1_1;
            },
            function (vote_restart_map_1_1) {
                vote_restart_map_1 = vote_restart_map_1_1;
            },
            function (vote_skip_map_1_1) {
                vote_skip_map_1 = vote_skip_map_1_1;
            }
        ],
        execute: function () {
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
            Instance = class Instance {
                constructor(window, initOptions, initialSettings, config) {
                    this.commands = new Map();
                    this.commandDescriptions = new Map();
                    this.playerIdToAuth = new Map();
                    this.mutedPlayers = new Map();
                    this.activePlayers = new Map();
                    this.electionTimeouts = new Map();
                    this.window = window;
                    this.config = config;
                    this.initialSettings = initialSettings;
                    this.config = ts_deepmerge_1.default(Instance.defaultConfig, config);
                    if (window.onWLLoaded) {
                        throw 'already loaded';
                    }
                    if (!isStrictInitOptions(initOptions)) {
                        throw 'roomName, maxPlayers, public and token must be set';
                    }
                    if (this.config.configVersion != Instance.configVersion) {
                        throw `Your config is out of date and not compatible with latest digger, check https://gitlab.com/webliero/digger`;
                    }
                    this.initOptions = initOptions;
                    this.validateInitOptions();
                    this.fullRoom = window.WLInit(initOptions);
                    this.room = this.fullRoom;
                    this.room.setSettings(initialSettings);
                    this.serverId = this.initOptions.roomName.replace(/[^A-Z0-9]/gi, '-').toLowerCase();
                    this.instanceId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
                    this.setNewGame();
                    this.eventTarget = new EventTarget();
                    this.registerRoomCallbacks();
                    this.on('gameStart', (e) => { this.setNewGame(); });
                    this.on('playerJoin', ({ detail: player }) => this.playerIdToAuth.set(player.id, player.auth));
                    this.on('playerLeave', ({ detail: player }) => this.playerIdToAuth.delete(player.id));
                    this.on('playerChat', this.handlePlayerChat);
                    this.on('playerTeamChange', this.handleActive);
                    this.on('roomLink', ({ detail: url }) => this.log("Started: `${url}`"));
                    this.on('captcha', () => this.log('Failed to start: Faulty token'));
                    this.on('playerJoin', ({ detail: player }) => this.notify(Instance.motd, player.id));
                    this.registerCommand(['!h', '!help'], 'Display this help', this.handleHelp);
                    this.registerCommand(['!stc', '!stopthecount'], 'Request to stop the count of a vote', this.handleStopTheCount);
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
                            throw 'command already registered';
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
                        timeout: setTimeout(() => this.unMute(playerId), duration)
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
                        this.notify("Another vote is already active, wait your turn", player.id);
                        return;
                    }
                    this.electionTimeouts.set(auth, setTimeout(() => this.electionTimeouts.delete(auth), this.config.voteTimeout));
                    this.currentElection = new election_1.Election(this, name, player, () => {
                        this.currentElection = undefined;
                        callback();
                    });
                }
                enablePlugins() {
                    Object.entries(this.config.plugins).forEach(([name, pluginConfig]) => {
                        if (pluginConfig.enabled) {
                            switch (name) {
                                case 'admin':
                                    new admin_1.Admin(this, this.config.plugins.admin);
                                case 'afk':
                                    new afk_1.AFK(this, this.config.plugins.afk);
                                case 'aliases':
                                    new aliases_1.Aliases(this, this.config.plugins.aliases);
                                case 'connection':
                                    new connection_1.Connection(this, this.config.plugins.connection);
                                case 'list':
                                    new list_1.List(this, this.config.plugins.list);
                                case 'onePlayer':
                                    new one_player_1.OnePlayer(this, this.config.plugins.onePlayer);
                                case 'scores':
                                    new scores_1.Scores(this, this.config.plugins.scores);
                                case 'slurper':
                                    new slurper_1.Slurper(this, this.config.plugins.slurper);
                                case 'voteMutePlayer':
                                    new vote_mute_1.VoteMute(this, this.config.plugins.voteMutePlayer);
                                case 'voteKickPlayer':
                                    new vote_kick_1.VoteKick(this, this.config.plugins.voteKickPlayer);
                                case 'voteRestartMap':
                                    new vote_restart_map_1.VoteRestartMap(this, this.config.plugins.voteRestartMap);
                                case 'voteSkipMap':
                                    new vote_skip_map_1.VoteSkipMap(this, this.config.plugins.voteSkipMap);
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
                handleActive({ detail: { player, byPlayer } }) {
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
                }
                handlePlayerChat(event) {
                    let { player, message } = event.detail;
                    message = message.trim();
                    if (message[0] == '!') {
                        const firstSpaceIndex = message.indexOf(' ');
                        const commandName = firstSpaceIndex == -1 ? message : message.substr(0, firstSpaceIndex);
                        const callback = this.commands.get(commandName);
                        if (callback) {
                            callback(player, message);
                        }
                        else {
                            const response = `"${commandName}" not recognized command`;
                            this.room.sendAnnouncement(response, player.id, 0xFF0000, "bold", 2);
                        }
                        event.preventDefault();
                    }
                    const auth = this.playerIdToAuth.get(player.id);
                    const muteConfig = this.mutedPlayers.get(auth);
                    if (muteConfig) {
                        const minutes = Math.round((muteConfig.time.getTime() - Date.now()) / 1000 / 60);
                        this.room.sendAnnouncement(`You are muted for ${minutes} minutes more`, player.id, 0xFF0000, "bold", 2);
                        event.preventDefault();
                    }
                }
                setNewGame() {
                    this.gameStartTime = new Date();
                    this.gameId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
                }
                handleStopTheCount(player, message) {
                    if (this.currentElection) {
                        this.notify(`${player.name} has requested to stop the count, we of course ignore it and the counting of votes will continue`);
                    }
                    else {
                        this.notify(`${player.name} has requested to stop the count, the vote is over and we ignore it`);
                    }
                }
                registerRoomCallbacks() {
                    this.fullRoom.onPlayerJoin = (player) => { this.emit('playerJoin', player); };
                    this.fullRoom.onPlayerLeave = (player) => { this.emit('playerLeave', player); };
                    this.fullRoom.onPlayerKicked = (player, reason, ban, byPlayer) => {
                        this.emit('playerKicked', { player, reason, ban, byPlayer });
                    };
                    this.fullRoom.onPlayerChat = (player, message) => { return this.emit('playerChat', { player, message }); };
                    this.fullRoom.onPlayerTeamChange = (player, byPlayer) => { this.emit('playerTeamChange', { player, byPlayer }); };
                    this.fullRoom.onPlayerAdminChange = (player, byPlayer) => { this.emit('playerAdminChange', { player, byPlayer }); };
                    this.fullRoom.onGameTick = () => { this.emit('gameTick', null); };
                    this.fullRoom.onPlayerActivity = (player) => { this.emit('playerActivity', player); };
                    this.fullRoom.onRoomLink = (link) => { this.emit('roomLink', link); };
                    this.fullRoom.onGameStart = () => { this.emit('gameStart', null); };
                    this.fullRoom.onGameEnd = () => { this.emit('gameEnd', null); };
                    this.fullRoom.onGameEnd2 = () => { this.emit('gameEnd2', null); };
                    this.fullRoom.onPlayerKilled = (killed, killer) => { this.emit('playerKilled', { killed, killer }); };
                    this.fullRoom.onCaptcha = () => { this.emit('captcha', null); };
                }
                validateInitOptions() {
                    if (!this.initOptions.roomName) {
                        throw 'you must set a roomName';
                    }
                    if (!this.initOptions.maxPlayers) {
                        throw 'you must set maxPlayers';
                    }
                }
                generateId() {
                    return `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
                }
            };
            exports_14("Instance", Instance);
            Instance.configVersion = '0.1.0';
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
        }
    };
});
System.register("election", [], function (exports_15, context_15) {
    "use strict";
    var Election;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [],
        execute: function () {
            Election = class Election {
                constructor(instance, name, initiatingPlayer, callback) {
                    this.votes = new Map();
                    this.ended = false;
                    this.instance = instance;
                    this.callback = callback;
                    const auth = this.instance.playerIdToAuth.get(initiatingPlayer.id);
                    this.votes.set(auth, 'y');
                    this.voteCommandHandler = this.instance.registerCommand(['!y', '!n'], '', this.handleVote);
                    this.instance.on('playerLeave', this.reCount);
                    this.instance.on('playerJoin', this.reCount);
                    this.timeout = setTimeout(() => {
                        this.instance.notify(`Vote: ${name} failed`);
                        this.end();
                    }, this.instance.config.voteTime);
                    this.instance.notify(`Vote: ${name} started, vote with !y or !n, current `);
                    ;
                    this.reCount();
                }
                handleVote(player, message) {
                    const playerAuth = this.instance.playerIdToAuth.get(player.id);
                    if (this.votes.get(playerAuth)) {
                        this.instance.error("You have already voted in this election, you may be interested in !stopthecount", player.id);
                    }
                    else {
                        this.votes.set(playerAuth, message[1]);
                        this.reCount();
                    }
                }
                reCount() {
                    const playerCount = Object.keys(this.instance.playerIdToAuth).length;
                    const neededVotes = playerCount == 2 ? 2 : playerCount / 2;
                    const voteCounts = Array.from(this.votes.values()).reduce((acc, vote) => { acc[vote] += 1; return acc; }, { y: 0, n: 0 });
                    const prefix = `Vote: ${name}, ${voteCounts.y}/${playerCount} in favour, ${voteCounts.n}/${playerCount} against. `;
                    if (voteCounts.y >= neededVotes) {
                        this.instance.notify(`${prefix}Moving ahead with ${name}`);
                        this.end();
                        this.callback();
                    }
                    else if (voteCounts.n >= neededVotes || voteCounts.n + voteCounts.y == playerCount) {
                        this.instance.notify(`${prefix}Dismissed ${name}`);
                        this.end();
                    }
                    else {
                        this.instance.notify(`${prefix}, participate using !y or !n`);
                    }
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
            };
            exports_15("Election", Election);
        }
    };
});
//# sourceMappingURL=digger.js.map