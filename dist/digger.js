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

var Command;
(function (Command) {
    Command["AdminHelp"] = "!a";
    Command["AdminBan"] = "!ab";
    Command["AdminClearBan"] = "!acb";
    Command["AdminDefcon6"] = "!ad6";
    Command["AdminKick"] = "!ak";
    Command["AdminNextMap"] = "!an";
    Command["AdminMute"] = "!am";
    Command["AdminUnMute"] = "!aum";
    Command["AdminRestart"] = "!ar";
    Command["AdminShuffle"] = "!ash";
    Command["AdminSkip"] = "!as";
    Command["Help"] = "!h";
    Command["Info"] = "!i";
    Command["NextMap"] = "!m";
    Command["PlayerList"] = "!l";
    Command["SearchLevels"] = "!s";
    Command["StopTheCount"] = "!stc";
    Command["VoteMute"] = "!vm";
    Command["VoteNo"] = "!n";
    Command["VoteRestart"] = "!vr";
    Command["VoteKick"] = "!vk";
    Command["VoteMap"] = "!vn";
    Command["VoteSkip"] = "!vs";
    Command["VoteYes"] = "!y";
})(Command || (Command = {}));
const Commands = new Map([
    [
        Command.AdminHelp,
        {
            verboseCommand: '!adminhelp',
            description: '!a[s[kip] | r[estart] | d[efcon6] | m[ute] t | u[nmute] t | k[ick] t | b[an] t | c[ban] t], for detailed usage !a kick',
            admin: true,
        }
    ],
    [
        Command.AdminBan,
        {
            verboseCommand: '!adminban',
            description: 'Ban by name or id',
            admin: true,
            hidden: true,
            arguments: true
        }
    ],
    [
        Command.AdminClearBan,
        {
            verboseCommand: '!adminclearban',
            description: 'Clear ban by name or id',
            admin: true,
            hidden: true,
            arguments: true
        }
    ],
    [
        Command.AdminDefcon6,
        {
            verboseCommand: '!admindefcon6',
            description: 'Admin defcon6',
            admin: true,
            hidden: true
        }
    ],
    [
        Command.AdminKick,
        {
            verboseCommand: '!adminkick',
            description: 'Kick by name or id',
            admin: true,
            hidden: true,
            arguments: true
        }
    ],
    [
        Command.AdminNextMap,
        {
            verboseCommand: '!adminnextmap',
            description: 'Set next map, !an 123 or !an *fooo*',
            admin: true,
            hidden: true,
            arguments: true
        }
    ],
    [
        Command.AdminMute,
        {
            verboseCommand: '!adminmute',
            description: 'Mute by name or id',
            admin: true,
            hidden: true,
            arguments: true
        }
    ],
    [
        Command.AdminUnMute,
        {
            verboseCommand: '!adminunmute',
            description: 'Unmute by name or id',
            admin: true,
            hidden: true,
            arguments: true
        }
    ],
    [
        Command.AdminRestart,
        {
            verboseCommand: '!adminrestart',
            description: 'Restart map',
            admin: true,
            hidden: true
        }
    ],
    [
        Command.AdminSkip,
        {
            verboseCommand: '!adminskip',
            description: 'Skip map',
            admin: true,
            hidden: true
        }
    ],
    [
        Command.AdminShuffle,
        {
            verboseCommand: '!adminskip',
            description: 'Shuffle map pool',
            admin: true,
            hidden: true
        }
    ],
    [
        Command.Help,
        {
            verboseCommand: '!help',
            description: 'Display this help'
        }
    ],
    [
        Command.Info,
        {
            verboseCommand: '!info',
            description: 'Check the previously known aliases of a player',
            arguments: true,
        }
    ],
    [
        Command.NextMap,
        {
            verboseCommand: '!map',
            description: 'Check current and next map',
            arguments: true,
        }
    ],
    [
        Command.PlayerList,
        {
            verboseCommand: '!playerlist',
            description: 'List the players showing an id and name'
        }
    ],
    [
        Command.SearchLevels,
        {
            verboseCommand: '!searchlevels',
            description: 'Search level, Usage !s *worm*'
        }
    ],
    [
        Command.StopTheCount,
        {
            verboseCommand: '!stopthecount',
            description: 'Request to stop the count of a vote'
        }
    ],
    [
        Command.VoteMute,
        {
            verboseCommand: '!votemute',
            description: 'Mute player vote, type !vm for Usage'
        }
    ],
    [
        Command.VoteMap,
        {
            verboseCommand: '!votenext',
            description: 'Vote next map, !vn mapname'
        }
    ],
    [
        Command.VoteKick,
        {
            verboseCommand: '!votekick',
            description: 'Kick player vote, type !vk for Usage'
        }
    ],
    [
        Command.VoteNo,
        {
            hidden: true
        }
    ],
    [
        Command.VoteRestart,
        {
            verboseCommand: '!voterestart',
            description: 'Restart map vote'
        }
    ],
    [
        Command.VoteSkip,
        {
            verboseCommand: '!voteskip',
            description: 'Skip map vote'
        }
    ],
    [
        Command.VoteYes,
        {
            hidden: true
        }
    ],
]);
const VerboseToCommand = new Map(Array.from(Commands).filter(([command, definition]) => definition.verboseCommand).map(([command, definition]) => [definition.verboseCommand, command]));
class CommandRegistry {
    constructor(instance) {
        this.activeCommands = new Map();
        this.handleCommand = (player, message) => {
            const firstSpaceIndex = message.indexOf(' ');
            const commandName = firstSpaceIndex == -1 ? message : message.substr(0, firstSpaceIndex);
            const callback = this.activeCommands.get(commandName) || this.activeCommands.get(VerboseToCommand.get(commandName));
            if (callback) {
                callback.apply(this, [player, message]);
            }
            else {
                this.instance.error(`"${commandName}" not recognized command`, player.id);
            }
        };
        this.instance = instance;
    }
    on(command, callback) {
        if (this.activeCommands.get(command)) {
            throw `command already registered ${command}`;
        }
        this.activeCommands.set(command, callback);
        return () => {
            this.activeCommands.delete(command);
        };
    }
}

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
                    this.instance.log('Exception', e);
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
        const handlers = [
            this.instance.onCommand(Command.VoteYes, this.handleVote),
            this.instance.onCommand(Command.VoteNo, this.handleVote)
        ];
        this.voteCommandHandler = () => handlers.forEach(handler => handler());
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

class LevelManager {
    constructor(levelIndex, levelNames) {
        this.position = 0;
        this.levelIndex = levelIndex;
        this.levelNames = levelNames;
        this.shuffle();
    }
    async pop() {
        const name = this.nextOverride ? this.nextOverride : this.sequence[++this.position % this.sequence.length];
        this.nextOverride = undefined;
        return {
            name,
            data: await this.levelIndex.levelData(name)
        };
    }
    setNext(levelName) {
        this.nextOverride = levelName;
    }
    skip() {
        if (this.nextOverride) {
            this.nextOverride = undefined;
        }
        else {
            this.position++;
        }
    }
    currentName() {
        return this.sequence[this.position % this.sequence.length];
    }
    peekName() {
        return this.nextOverride ? this.nextOverride : this.sequence[(this.position + 1) % this.sequence.length];
    }
    shuffle() {
        this.sequence = this.levelNames.slice().sort((a, b) => Math.random() - 0.5);
    }
}

var lunr = createCommonjsModule(function (module, exports) {
(function(){

/**
 * A convenience function for configuring and constructing
 * a new lunr Index.
 *
 * A lunr.Builder instance is created and the pipeline setup
 * with a trimmer, stop word filter and stemmer.
 *
 * This builder object is yielded to the configuration function
 * that is passed as a parameter, allowing the list of fields
 * and other builder parameters to be customised.
 *
 * All documents _must_ be added within the passed config function.
 *
 * @example
 * var idx = lunr(function () {
 *   this.field('title')
 *   this.field('body')
 *   this.ref('id')
 *
 *   documents.forEach(function (doc) {
 *     this.add(doc)
 *   }, this)
 * })
 *
 * @see {@link lunr.Builder}
 * @see {@link lunr.Pipeline}
 * @see {@link lunr.trimmer}
 * @see {@link lunr.stopWordFilter}
 * @see {@link lunr.stemmer}
 * @namespace {function} lunr
 */
var lunr = function (config) {
  var builder = new lunr.Builder;

  builder.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  );

  builder.searchPipeline.add(
    lunr.stemmer
  );

  config.call(builder, builder);
  return builder.build()
};

lunr.version = "2.3.9";
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 * @namespace lunr.utils
 */
lunr.utils = {};

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf lunr.utils
 * @function
 */
lunr.utils.warn = (function (global) {
  /* eslint-disable no-console */
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message);
    }
  }
  /* eslint-enable no-console */
})(this);

/**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf lunr.utils
 */
lunr.utils.asString = function (obj) {
  if (obj === void 0 || obj === null) {
    return ""
  } else {
    return obj.toString()
  }
};

/**
 * Clones an object.
 *
 * Will create a copy of an existing object such that any mutations
 * on the copy cannot affect the original.
 *
 * Only shallow objects are supported, passing a nested object to this
 * function will cause a TypeError.
 *
 * Objects with primitives, and arrays of primitives are supported.
 *
 * @param {Object} obj The object to clone.
 * @return {Object} a clone of the passed object.
 * @throws {TypeError} when a nested object is passed.
 * @memberOf Utils
 */
lunr.utils.clone = function (obj) {
  if (obj === null || obj === undefined) {
    return obj
  }

  var clone = Object.create(null),
      keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i],
        val = obj[key];

    if (Array.isArray(val)) {
      clone[key] = val.slice();
      continue
    }

    if (typeof val === 'string' ||
        typeof val === 'number' ||
        typeof val === 'boolean') {
      clone[key] = val;
      continue
    }

    throw new TypeError("clone is not deep and does not support nested objects")
  }

  return clone
};
lunr.FieldRef = function (docRef, fieldName, stringValue) {
  this.docRef = docRef;
  this.fieldName = fieldName;
  this._stringValue = stringValue;
};

lunr.FieldRef.joiner = "/";

lunr.FieldRef.fromString = function (s) {
  var n = s.indexOf(lunr.FieldRef.joiner);

  if (n === -1) {
    throw "malformed field ref string"
  }

  var fieldRef = s.slice(0, n),
      docRef = s.slice(n + 1);

  return new lunr.FieldRef (docRef, fieldRef, s)
};

lunr.FieldRef.prototype.toString = function () {
  if (this._stringValue == undefined) {
    this._stringValue = this.fieldName + lunr.FieldRef.joiner + this.docRef;
  }

  return this._stringValue
};
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * A lunr set.
 *
 * @constructor
 */
lunr.Set = function (elements) {
  this.elements = Object.create(null);

  if (elements) {
    this.length = elements.length;

    for (var i = 0; i < this.length; i++) {
      this.elements[elements[i]] = true;
    }
  } else {
    this.length = 0;
  }
};

/**
 * A complete set that contains all elements.
 *
 * @static
 * @readonly
 * @type {lunr.Set}
 */
lunr.Set.complete = {
  intersect: function (other) {
    return other
  },

  union: function () {
    return this
  },

  contains: function () {
    return true
  }
};

/**
 * An empty set that contains no elements.
 *
 * @static
 * @readonly
 * @type {lunr.Set}
 */
lunr.Set.empty = {
  intersect: function () {
    return this
  },

  union: function (other) {
    return other
  },

  contains: function () {
    return false
  }
};

/**
 * Returns true if this set contains the specified object.
 *
 * @param {object} object - Object whose presence in this set is to be tested.
 * @returns {boolean} - True if this set contains the specified object.
 */
lunr.Set.prototype.contains = function (object) {
  return !!this.elements[object]
};

/**
 * Returns a new set containing only the elements that are present in both
 * this set and the specified set.
 *
 * @param {lunr.Set} other - set to intersect with this set.
 * @returns {lunr.Set} a new set that is the intersection of this and the specified set.
 */

lunr.Set.prototype.intersect = function (other) {
  var a, b, elements, intersection = [];

  if (other === lunr.Set.complete) {
    return this
  }

  if (other === lunr.Set.empty) {
    return other
  }

  if (this.length < other.length) {
    a = this;
    b = other;
  } else {
    a = other;
    b = this;
  }

  elements = Object.keys(a.elements);

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element in b.elements) {
      intersection.push(element);
    }
  }

  return new lunr.Set (intersection)
};

/**
 * Returns a new set combining the elements of this and the specified set.
 *
 * @param {lunr.Set} other - set to union with this set.
 * @return {lunr.Set} a new set that is the union of this and the specified set.
 */

lunr.Set.prototype.union = function (other) {
  if (other === lunr.Set.complete) {
    return lunr.Set.complete
  }

  if (other === lunr.Set.empty) {
    return this
  }

  return new lunr.Set(Object.keys(this.elements).concat(Object.keys(other.elements)))
};
/**
 * A function to calculate the inverse document frequency for
 * a posting. This is shared between the builder and the index
 *
 * @private
 * @param {object} posting - The posting for a given term
 * @param {number} documentCount - The total number of documents.
 */
lunr.idf = function (posting, documentCount) {
  var documentsWithTerm = 0;

  for (var fieldName in posting) {
    if (fieldName == '_index') continue // Ignore the term index, its not a field
    documentsWithTerm += Object.keys(posting[fieldName]).length;
  }

  var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);

  return Math.log(1 + Math.abs(x))
};

/**
 * A token wraps a string representation of a token
 * as it is passed through the text processing pipeline.
 *
 * @constructor
 * @param {string} [str=''] - The string token being wrapped.
 * @param {object} [metadata={}] - Metadata associated with this token.
 */
lunr.Token = function (str, metadata) {
  this.str = str || "";
  this.metadata = metadata || {};
};

/**
 * Returns the token string that is being wrapped by this object.
 *
 * @returns {string}
 */
lunr.Token.prototype.toString = function () {
  return this.str
};

/**
 * A token update function is used when updating or optionally
 * when cloning a token.
 *
 * @callback lunr.Token~updateFunction
 * @param {string} str - The string representation of the token.
 * @param {Object} metadata - All metadata associated with this token.
 */

/**
 * Applies the given function to the wrapped string token.
 *
 * @example
 * token.update(function (str, metadata) {
 *   return str.toUpperCase()
 * })
 *
 * @param {lunr.Token~updateFunction} fn - A function to apply to the token string.
 * @returns {lunr.Token}
 */
lunr.Token.prototype.update = function (fn) {
  this.str = fn(this.str, this.metadata);
  return this
};

/**
 * Creates a clone of this token. Optionally a function can be
 * applied to the cloned token.
 *
 * @param {lunr.Token~updateFunction} [fn] - An optional function to apply to the cloned token.
 * @returns {lunr.Token}
 */
lunr.Token.prototype.clone = function (fn) {
  fn = fn || function (s) { return s };
  return new lunr.Token (fn(this.str, this.metadata), this.metadata)
};
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * This tokenizer will convert its parameter to a string by calling `toString` and
 * then will split this string on the character in `lunr.tokenizer.separator`.
 * Arrays will have their elements converted to strings and wrapped in a lunr.Token.
 *
 * Optional metadata can be passed to the tokenizer, this metadata will be cloned and
 * added as metadata to every token that is created from the object to be tokenized.
 *
 * @static
 * @param {?(string|object|object[])} obj - The object to convert into tokens
 * @param {?object} metadata - Optional metadata to associate with every token
 * @returns {lunr.Token[]}
 * @see {@link lunr.Pipeline}
 */
lunr.tokenizer = function (obj, metadata) {
  if (obj == null || obj == undefined) {
    return []
  }

  if (Array.isArray(obj)) {
    return obj.map(function (t) {
      return new lunr.Token(
        lunr.utils.asString(t).toLowerCase(),
        lunr.utils.clone(metadata)
      )
    })
  }

  var str = obj.toString().toLowerCase(),
      len = str.length,
      tokens = [];

  for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
    var char = str.charAt(sliceEnd),
        sliceLength = sliceEnd - sliceStart;

    if ((char.match(lunr.tokenizer.separator) || sliceEnd == len)) {

      if (sliceLength > 0) {
        var tokenMetadata = lunr.utils.clone(metadata) || {};
        tokenMetadata["position"] = [sliceStart, sliceLength];
        tokenMetadata["index"] = tokens.length;

        tokens.push(
          new lunr.Token (
            str.slice(sliceStart, sliceEnd),
            tokenMetadata
          )
        );
      }

      sliceStart = sliceEnd + 1;
    }

  }

  return tokens
};

/**
 * The separator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */
lunr.tokenizer.separator = /[\s\-]+/;
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = [];
};

lunr.Pipeline.registeredFunctions = Object.create(null);

/**
 * A pipeline function maps lunr.Token to lunr.Token. A lunr.Token contains the token
 * string as well as all known metadata. A pipeline function can mutate the token string
 * or mutate (or add) metadata for a given token.
 *
 * A pipeline function can indicate that the passed token should be discarded by returning
 * null, undefined or an empty string. This token will not be passed to any downstream pipeline
 * functions and will not be added to the index.
 *
 * Multiple tokens can be returned by returning an array of tokens. Each token will be passed
 * to any downstream pipeline functions and all will returned tokens will be added to the index.
 *
 * Any number of pipeline functions may be chained together using a lunr.Pipeline.
 *
 * @interface lunr.PipelineFunction
 * @param {lunr.Token} token - A token from the document being processed.
 * @param {number} i - The index of this token in the complete list of tokens for this document/field.
 * @param {lunr.Token[]} tokens - All tokens for this document/field.
 * @returns {(?lunr.Token|lunr.Token[])}
 */

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @param {String} label - The label to register this function with
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label);
  }

  fn.label = label;
  lunr.Pipeline.registeredFunctions[fn.label] = fn;
};

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {lunr.PipelineFunction} fn - The function to check for.
 * @private
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions);

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn);
  }
};

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised - The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline;

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName];

    if (fn) {
      pipeline.add(fn);
    } else {
      throw new Error('Cannot load unregistered function: ' + fnName)
    }
  });

  return pipeline
};

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction[]} functions - Any number of functions to add to the pipeline.
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments);

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn);
    this._stack.push(fn);
  }, this);
};

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

  var pos = this._stack.indexOf(existingFn);
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1;
  this._stack.splice(pos, 0, newFn);
};

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {lunr.PipelineFunction} existingFn - A function that already exists in the pipeline.
 * @param {lunr.PipelineFunction} newFn - The new function to add to the pipeline.
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

  var pos = this._stack.indexOf(existingFn);
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn);
};

/**
 * Removes a function from the pipeline.
 *
 * @param {lunr.PipelineFunction} fn The function to remove from the pipeline.
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn);
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1);
};

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var stackLength = this._stack.length;

  for (var i = 0; i < stackLength; i++) {
    var fn = this._stack[i];
    var memo = [];

    for (var j = 0; j < tokens.length; j++) {
      var result = fn(tokens[j], j, tokens);

      if (result === null || result === void 0 || result === '') continue

      if (Array.isArray(result)) {
        for (var k = 0; k < result.length; k++) {
          memo.push(result[k]);
        }
      } else {
        memo.push(result);
      }
    }

    tokens = memo;
  }

  return tokens
};

/**
 * Convenience method for passing a string through a pipeline and getting
 * strings out. This method takes care of wrapping the passed string in a
 * token and mapping the resulting tokens back to strings.
 *
 * @param {string} str - The string to pass through the pipeline.
 * @param {?object} metadata - Optional metadata to associate with the token
 * passed to the pipeline.
 * @returns {string[]}
 */
lunr.Pipeline.prototype.runString = function (str, metadata) {
  var token = new lunr.Token (str, metadata);

  return this.run([token]).map(function (t) {
    return t.toString()
  })
};

/**
 * Resets the pipeline by removing any existing processors.
 *
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = [];
};

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn);

    return fn.label
  })
};
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * A vector is used to construct the vector space of documents and queries. These
 * vectors support operations to determine the similarity between two documents or
 * a document and a query.
 *
 * Normally no parameters are required for initializing a vector, but in the case of
 * loading a previously dumped vector the raw elements can be provided to the constructor.
 *
 * For performance reasons vectors are implemented with a flat array, where an elements
 * index is immediately followed by its value. E.g. [index, value, index, value]. This
 * allows the underlying array to be as sparse as possible and still offer decent
 * performance when being used for vector calculations.
 *
 * @constructor
 * @param {Number[]} [elements] - The flat list of element index and element value pairs.
 */
lunr.Vector = function (elements) {
  this._magnitude = 0;
  this.elements = elements || [];
};


/**
 * Calculates the position within the vector to insert a given index.
 *
 * This is used internally by insert and upsert. If there are duplicate indexes then
 * the position is returned as if the value for that index were to be updated, but it
 * is the callers responsibility to check whether there is a duplicate at that index
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @returns {Number}
 */
lunr.Vector.prototype.positionForIndex = function (index) {
  // For an empty vector the tuple can be inserted at the beginning
  if (this.elements.length == 0) {
    return 0
  }

  var start = 0,
      end = this.elements.length / 2,
      sliceLength = end - start,
      pivotPoint = Math.floor(sliceLength / 2),
      pivotIndex = this.elements[pivotPoint * 2];

  while (sliceLength > 1) {
    if (pivotIndex < index) {
      start = pivotPoint;
    }

    if (pivotIndex > index) {
      end = pivotPoint;
    }

    if (pivotIndex == index) {
      break
    }

    sliceLength = end - start;
    pivotPoint = start + Math.floor(sliceLength / 2);
    pivotIndex = this.elements[pivotPoint * 2];
  }

  if (pivotIndex == index) {
    return pivotPoint * 2
  }

  if (pivotIndex > index) {
    return pivotPoint * 2
  }

  if (pivotIndex < index) {
    return (pivotPoint + 1) * 2
  }
};

/**
 * Inserts an element at an index within the vector.
 *
 * Does not allow duplicates, will throw an error if there is already an entry
 * for this index.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 */
lunr.Vector.prototype.insert = function (insertIdx, val) {
  this.upsert(insertIdx, val, function () {
    throw "duplicate index"
  });
};

/**
 * Inserts or updates an existing index within the vector.
 *
 * @param {Number} insertIdx - The index at which the element should be inserted.
 * @param {Number} val - The value to be inserted into the vector.
 * @param {function} fn - A function that is called for updates, the existing value and the
 * requested value are passed as arguments
 */
lunr.Vector.prototype.upsert = function (insertIdx, val, fn) {
  this._magnitude = 0;
  var position = this.positionForIndex(insertIdx);

  if (this.elements[position] == insertIdx) {
    this.elements[position + 1] = fn(this.elements[position + 1], val);
  } else {
    this.elements.splice(position, 0, insertIdx, val);
  }
};

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude

  var sumOfSquares = 0,
      elementsLength = this.elements.length;

  for (var i = 1; i < elementsLength; i += 2) {
    var val = this.elements[i];
    sumOfSquares += val * val;
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
};

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector - The vector to compute the dot product with.
 * @returns {Number}
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var dotProduct = 0,
      a = this.elements, b = otherVector.elements,
      aLen = a.length, bLen = b.length,
      aVal = 0, bVal = 0,
      i = 0, j = 0;

  while (i < aLen && j < bLen) {
    aVal = a[i], bVal = b[j];
    if (aVal < bVal) {
      i += 2;
    } else if (aVal > bVal) {
      j += 2;
    } else if (aVal == bVal) {
      dotProduct += a[i + 1] * b[j + 1];
      i += 2;
      j += 2;
    }
  }

  return dotProduct
};

/**
 * Calculates the similarity between this vector and another vector.
 *
 * @param {lunr.Vector} otherVector - The other vector to calculate the
 * similarity with.
 * @returns {Number}
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / this.magnitude() || 0
};

/**
 * Converts the vector to an array of the elements within the vector.
 *
 * @returns {Number[]}
 */
lunr.Vector.prototype.toArray = function () {
  var output = new Array (this.elements.length / 2);

  for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
    output[j] = this.elements[i];
  }

  return output
};

/**
 * A JSON serializable representation of the vector.
 *
 * @returns {Number[]}
 */
lunr.Vector.prototype.toJSON = function () {
  return this.elements
};
/* eslint-disable */
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token - The string to stem
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 * @function
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a;
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) { w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return function (token) {
    return token.update(porterStemmer);
  }
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer');
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @function
 * @param {Array} token The token to pass through the filter
 * @returns {lunr.PipelineFunction}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */
lunr.generateStopWordFilter = function (stopWords) {
  var words = stopWords.reduce(function (memo, stopWord) {
    memo[stopWord] = stopWord;
    return memo
  }, {});

  return function (token) {
    if (token && words[token.toString()] !== token.toString()) return token
  }
};

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @function
 * @implements {lunr.PipelineFunction}
 * @params {lunr.Token} token - A token to check for being a stop word.
 * @returns {lunr.Token}
 * @see {@link lunr.Pipeline}
 */
lunr.stopWordFilter = lunr.generateStopWordFilter([
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'least',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'most',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your'
]);

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter');
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the beginning and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @static
 * @implements {lunr.PipelineFunction}
 * @param {lunr.Token} token The token to pass through the filter
 * @returns {lunr.Token}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token.update(function (s) {
    return s.replace(/^\W+/, '').replace(/\W+$/, '')
  })
};

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer');
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * A token set is used to store the unique list of all tokens
 * within an index. Token sets are also used to represent an
 * incoming query to the index, this query token set and index
 * token set are then intersected to find which tokens to look
 * up in the inverted index.
 *
 * A token set can hold multiple tokens, as in the case of the
 * index token set, or it can hold a single token as in the
 * case of a simple query token set.
 *
 * Additionally token sets are used to perform wildcard matching.
 * Leading, contained and trailing wildcards are supported, and
 * from this edit distance matching can also be provided.
 *
 * Token sets are implemented as a minimal finite state automata,
 * where both common prefixes and suffixes are shared between tokens.
 * This helps to reduce the space used for storing the token set.
 *
 * @constructor
 */
lunr.TokenSet = function () {
  this.final = false;
  this.edges = {};
  this.id = lunr.TokenSet._nextId;
  lunr.TokenSet._nextId += 1;
};

/**
 * Keeps track of the next, auto increment, identifier to assign
 * to a new tokenSet.
 *
 * TokenSets require a unique identifier to be correctly minimised.
 *
 * @private
 */
lunr.TokenSet._nextId = 1;

/**
 * Creates a TokenSet instance from the given sorted array of words.
 *
 * @param {String[]} arr - A sorted array of strings to create the set from.
 * @returns {lunr.TokenSet}
 * @throws Will throw an error if the input array is not sorted.
 */
lunr.TokenSet.fromArray = function (arr) {
  var builder = new lunr.TokenSet.Builder;

  for (var i = 0, len = arr.length; i < len; i++) {
    builder.insert(arr[i]);
  }

  builder.finish();
  return builder.root
};

/**
 * Creates a token set from a query clause.
 *
 * @private
 * @param {Object} clause - A single clause from lunr.Query.
 * @param {string} clause.term - The query clause term.
 * @param {number} [clause.editDistance] - The optional edit distance for the term.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.fromClause = function (clause) {
  if ('editDistance' in clause) {
    return lunr.TokenSet.fromFuzzyString(clause.term, clause.editDistance)
  } else {
    return lunr.TokenSet.fromString(clause.term)
  }
};

/**
 * Creates a token set representing a single string with a specified
 * edit distance.
 *
 * Insertions, deletions, substitutions and transpositions are each
 * treated as an edit distance of 1.
 *
 * Increasing the allowed edit distance will have a dramatic impact
 * on the performance of both creating and intersecting these TokenSets.
 * It is advised to keep the edit distance less than 3.
 *
 * @param {string} str - The string to create the token set from.
 * @param {number} editDistance - The allowed edit distance to match.
 * @returns {lunr.Vector}
 */
lunr.TokenSet.fromFuzzyString = function (str, editDistance) {
  var root = new lunr.TokenSet;

  var stack = [{
    node: root,
    editsRemaining: editDistance,
    str: str
  }];

  while (stack.length) {
    var frame = stack.pop();

    // no edit
    if (frame.str.length > 0) {
      var char = frame.str.charAt(0),
          noEditNode;

      if (char in frame.node.edges) {
        noEditNode = frame.node.edges[char];
      } else {
        noEditNode = new lunr.TokenSet;
        frame.node.edges[char] = noEditNode;
      }

      if (frame.str.length == 1) {
        noEditNode.final = true;
      }

      stack.push({
        node: noEditNode,
        editsRemaining: frame.editsRemaining,
        str: frame.str.slice(1)
      });
    }

    if (frame.editsRemaining == 0) {
      continue
    }

    // insertion
    if ("*" in frame.node.edges) {
      var insertionNode = frame.node.edges["*"];
    } else {
      var insertionNode = new lunr.TokenSet;
      frame.node.edges["*"] = insertionNode;
    }

    if (frame.str.length == 0) {
      insertionNode.final = true;
    }

    stack.push({
      node: insertionNode,
      editsRemaining: frame.editsRemaining - 1,
      str: frame.str
    });

    // deletion
    // can only do a deletion if we have enough edits remaining
    // and if there are characters left to delete in the string
    if (frame.str.length > 1) {
      stack.push({
        node: frame.node,
        editsRemaining: frame.editsRemaining - 1,
        str: frame.str.slice(1)
      });
    }

    // deletion
    // just removing the last character from the str
    if (frame.str.length == 1) {
      frame.node.final = true;
    }

    // substitution
    // can only do a substitution if we have enough edits remaining
    // and if there are characters left to substitute
    if (frame.str.length >= 1) {
      if ("*" in frame.node.edges) {
        var substitutionNode = frame.node.edges["*"];
      } else {
        var substitutionNode = new lunr.TokenSet;
        frame.node.edges["*"] = substitutionNode;
      }

      if (frame.str.length == 1) {
        substitutionNode.final = true;
      }

      stack.push({
        node: substitutionNode,
        editsRemaining: frame.editsRemaining - 1,
        str: frame.str.slice(1)
      });
    }

    // transposition
    // can only do a transposition if there are edits remaining
    // and there are enough characters to transpose
    if (frame.str.length > 1) {
      var charA = frame.str.charAt(0),
          charB = frame.str.charAt(1),
          transposeNode;

      if (charB in frame.node.edges) {
        transposeNode = frame.node.edges[charB];
      } else {
        transposeNode = new lunr.TokenSet;
        frame.node.edges[charB] = transposeNode;
      }

      if (frame.str.length == 1) {
        transposeNode.final = true;
      }

      stack.push({
        node: transposeNode,
        editsRemaining: frame.editsRemaining - 1,
        str: charA + frame.str.slice(2)
      });
    }
  }

  return root
};

/**
 * Creates a TokenSet from a string.
 *
 * The string may contain one or more wildcard characters (*)
 * that will allow wildcard matching when intersecting with
 * another TokenSet.
 *
 * @param {string} str - The string to create a TokenSet from.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.fromString = function (str) {
  var node = new lunr.TokenSet,
      root = node;

  /*
   * Iterates through all characters within the passed string
   * appending a node for each character.
   *
   * When a wildcard character is found then a self
   * referencing edge is introduced to continually match
   * any number of any characters.
   */
  for (var i = 0, len = str.length; i < len; i++) {
    var char = str[i],
        final = (i == len - 1);

    if (char == "*") {
      node.edges[char] = node;
      node.final = final;

    } else {
      var next = new lunr.TokenSet;
      next.final = final;

      node.edges[char] = next;
      node = next;
    }
  }

  return root
};

/**
 * Converts this TokenSet into an array of strings
 * contained within the TokenSet.
 *
 * This is not intended to be used on a TokenSet that
 * contains wildcards, in these cases the results are
 * undefined and are likely to cause an infinite loop.
 *
 * @returns {string[]}
 */
lunr.TokenSet.prototype.toArray = function () {
  var words = [];

  var stack = [{
    prefix: "",
    node: this
  }];

  while (stack.length) {
    var frame = stack.pop(),
        edges = Object.keys(frame.node.edges),
        len = edges.length;

    if (frame.node.final) {
      /* In Safari, at this point the prefix is sometimes corrupted, see:
       * https://github.com/olivernn/lunr.js/issues/279 Calling any
       * String.prototype method forces Safari to "cast" this string to what
       * it's supposed to be, fixing the bug. */
      frame.prefix.charAt(0);
      words.push(frame.prefix);
    }

    for (var i = 0; i < len; i++) {
      var edge = edges[i];

      stack.push({
        prefix: frame.prefix.concat(edge),
        node: frame.node.edges[edge]
      });
    }
  }

  return words
};

/**
 * Generates a string representation of a TokenSet.
 *
 * This is intended to allow TokenSets to be used as keys
 * in objects, largely to aid the construction and minimisation
 * of a TokenSet. As such it is not designed to be a human
 * friendly representation of the TokenSet.
 *
 * @returns {string}
 */
lunr.TokenSet.prototype.toString = function () {
  // NOTE: Using Object.keys here as this.edges is very likely
  // to enter 'hash-mode' with many keys being added
  //
  // avoiding a for-in loop here as it leads to the function
  // being de-optimised (at least in V8). From some simple
  // benchmarks the performance is comparable, but allowing
  // V8 to optimize may mean easy performance wins in the future.

  if (this._str) {
    return this._str
  }

  var str = this.final ? '1' : '0',
      labels = Object.keys(this.edges).sort(),
      len = labels.length;

  for (var i = 0; i < len; i++) {
    var label = labels[i],
        node = this.edges[label];

    str = str + label + node.id;
  }

  return str
};

/**
 * Returns a new TokenSet that is the intersection of
 * this TokenSet and the passed TokenSet.
 *
 * This intersection will take into account any wildcards
 * contained within the TokenSet.
 *
 * @param {lunr.TokenSet} b - An other TokenSet to intersect with.
 * @returns {lunr.TokenSet}
 */
lunr.TokenSet.prototype.intersect = function (b) {
  var output = new lunr.TokenSet,
      frame = undefined;

  var stack = [{
    qNode: b,
    output: output,
    node: this
  }];

  while (stack.length) {
    frame = stack.pop();

    // NOTE: As with the #toString method, we are using
    // Object.keys and a for loop instead of a for-in loop
    // as both of these objects enter 'hash' mode, causing
    // the function to be de-optimised in V8
    var qEdges = Object.keys(frame.qNode.edges),
        qLen = qEdges.length,
        nEdges = Object.keys(frame.node.edges),
        nLen = nEdges.length;

    for (var q = 0; q < qLen; q++) {
      var qEdge = qEdges[q];

      for (var n = 0; n < nLen; n++) {
        var nEdge = nEdges[n];

        if (nEdge == qEdge || qEdge == '*') {
          var node = frame.node.edges[nEdge],
              qNode = frame.qNode.edges[qEdge],
              final = node.final && qNode.final,
              next = undefined;

          if (nEdge in frame.output.edges) {
            // an edge already exists for this character
            // no need to create a new node, just set the finality
            // bit unless this node is already final
            next = frame.output.edges[nEdge];
            next.final = next.final || final;

          } else {
            // no edge exists yet, must create one
            // set the finality bit and insert it
            // into the output
            next = new lunr.TokenSet;
            next.final = final;
            frame.output.edges[nEdge] = next;
          }

          stack.push({
            qNode: qNode,
            output: next,
            node: node
          });
        }
      }
    }
  }

  return output
};
lunr.TokenSet.Builder = function () {
  this.previousWord = "";
  this.root = new lunr.TokenSet;
  this.uncheckedNodes = [];
  this.minimizedNodes = {};
};

lunr.TokenSet.Builder.prototype.insert = function (word) {
  var node,
      commonPrefix = 0;

  if (word < this.previousWord) {
    throw new Error ("Out of order word insertion")
  }

  for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
    if (word[i] != this.previousWord[i]) break
    commonPrefix++;
  }

  this.minimize(commonPrefix);

  if (this.uncheckedNodes.length == 0) {
    node = this.root;
  } else {
    node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
  }

  for (var i = commonPrefix; i < word.length; i++) {
    var nextNode = new lunr.TokenSet,
        char = word[i];

    node.edges[char] = nextNode;

    this.uncheckedNodes.push({
      parent: node,
      char: char,
      child: nextNode
    });

    node = nextNode;
  }

  node.final = true;
  this.previousWord = word;
};

lunr.TokenSet.Builder.prototype.finish = function () {
  this.minimize(0);
};

lunr.TokenSet.Builder.prototype.minimize = function (downTo) {
  for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
    var node = this.uncheckedNodes[i],
        childKey = node.child.toString();

    if (childKey in this.minimizedNodes) {
      node.parent.edges[node.char] = this.minimizedNodes[childKey];
    } else {
      // Cache the key for this node since
      // we know it can't change anymore
      node.child._str = childKey;

      this.minimizedNodes[childKey] = node.child;
    }

    this.uncheckedNodes.pop();
  }
};
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * An index contains the built index of all documents and provides a query interface
 * to the index.
 *
 * Usually instances of lunr.Index will not be created using this constructor, instead
 * lunr.Builder should be used to construct new indexes, or lunr.Index.load should be
 * used to load previously built and serialized indexes.
 *
 * @constructor
 * @param {Object} attrs - The attributes of the built search index.
 * @param {Object} attrs.invertedIndex - An index of term/field to document reference.
 * @param {Object<string, lunr.Vector>} attrs.fieldVectors - Field vectors
 * @param {lunr.TokenSet} attrs.tokenSet - An set of all corpus tokens.
 * @param {string[]} attrs.fields - The names of indexed document fields.
 * @param {lunr.Pipeline} attrs.pipeline - The pipeline to use for search terms.
 */
lunr.Index = function (attrs) {
  this.invertedIndex = attrs.invertedIndex;
  this.fieldVectors = attrs.fieldVectors;
  this.tokenSet = attrs.tokenSet;
  this.fields = attrs.fields;
  this.pipeline = attrs.pipeline;
};

/**
 * A result contains details of a document matching a search query.
 * @typedef {Object} lunr.Index~Result
 * @property {string} ref - The reference of the document this result represents.
 * @property {number} score - A number between 0 and 1 representing how similar this document is to the query.
 * @property {lunr.MatchData} matchData - Contains metadata about this match including which term(s) caused the match.
 */

/**
 * Although lunr provides the ability to create queries using lunr.Query, it also provides a simple
 * query language which itself is parsed into an instance of lunr.Query.
 *
 * For programmatically building queries it is advised to directly use lunr.Query, the query language
 * is best used for human entered text rather than program generated text.
 *
 * At its simplest queries can just be a single term, e.g. `hello`, multiple terms are also supported
 * and will be combined with OR, e.g `hello world` will match documents that contain either 'hello'
 * or 'world', though those that contain both will rank higher in the results.
 *
 * Wildcards can be included in terms to match one or more unspecified characters, these wildcards can
 * be inserted anywhere within the term, and more than one wildcard can exist in a single term. Adding
 * wildcards will increase the number of documents that will be found but can also have a negative
 * impact on query performance, especially with wildcards at the beginning of a term.
 *
 * Terms can be restricted to specific fields, e.g. `title:hello`, only documents with the term
 * hello in the title field will match this query. Using a field not present in the index will lead
 * to an error being thrown.
 *
 * Modifiers can also be added to terms, lunr supports edit distance and boost modifiers on terms. A term
 * boost will make documents matching that term score higher, e.g. `foo^5`. Edit distance is also supported
 * to provide fuzzy matching, e.g. 'hello~2' will match documents with hello with an edit distance of 2.
 * Avoid large values for edit distance to improve query performance.
 *
 * Each term also supports a presence modifier. By default a term's presence in document is optional, however
 * this can be changed to either required or prohibited. For a term's presence to be required in a document the
 * term should be prefixed with a '+', e.g. `+foo bar` is a search for documents that must contain 'foo' and
 * optionally contain 'bar'. Conversely a leading '-' sets the terms presence to prohibited, i.e. it must not
 * appear in a document, e.g. `-foo bar` is a search for documents that do not contain 'foo' but may contain 'bar'.
 *
 * To escape special characters the backslash character '\' can be used, this allows searches to include
 * characters that would normally be considered modifiers, e.g. `foo\~2` will search for a term "foo~2" instead
 * of attempting to apply a boost of 2 to the search term "foo".
 *
 * @typedef {string} lunr.Index~QueryString
 * @example <caption>Simple single term query</caption>
 * hello
 * @example <caption>Multiple term query</caption>
 * hello world
 * @example <caption>term scoped to a field</caption>
 * title:hello
 * @example <caption>term with a boost of 10</caption>
 * hello^10
 * @example <caption>term with an edit distance of 2</caption>
 * hello~2
 * @example <caption>terms with presence modifiers</caption>
 * -foo +bar baz
 */

/**
 * Performs a search against the index using lunr query syntax.
 *
 * Results will be returned sorted by their score, the most relevant results
 * will be returned first.  For details on how the score is calculated, please see
 * the {@link https://lunrjs.com/guides/searching.html#scoring|guide}.
 *
 * For more programmatic querying use lunr.Index#query.
 *
 * @param {lunr.Index~QueryString} queryString - A string containing a lunr query.
 * @throws {lunr.QueryParseError} If the passed query string cannot be parsed.
 * @returns {lunr.Index~Result[]}
 */
lunr.Index.prototype.search = function (queryString) {
  return this.query(function (query) {
    var parser = new lunr.QueryParser(queryString, query);
    parser.parse();
  })
};

/**
 * A query builder callback provides a query object to be used to express
 * the query to perform on the index.
 *
 * @callback lunr.Index~queryBuilder
 * @param {lunr.Query} query - The query object to build up.
 * @this lunr.Query
 */

/**
 * Performs a query against the index using the yielded lunr.Query object.
 *
 * If performing programmatic queries against the index, this method is preferred
 * over lunr.Index#search so as to avoid the additional query parsing overhead.
 *
 * A query object is yielded to the supplied function which should be used to
 * express the query to be run against the index.
 *
 * Note that although this function takes a callback parameter it is _not_ an
 * asynchronous operation, the callback is just yielded a query object to be
 * customized.
 *
 * @param {lunr.Index~queryBuilder} fn - A function that is used to build the query.
 * @returns {lunr.Index~Result[]}
 */
lunr.Index.prototype.query = function (fn) {
  // for each query clause
  // * process terms
  // * expand terms from token set
  // * find matching documents and metadata
  // * get document vectors
  // * score documents

  var query = new lunr.Query(this.fields),
      matchingFields = Object.create(null),
      queryVectors = Object.create(null),
      termFieldCache = Object.create(null),
      requiredMatches = Object.create(null),
      prohibitedMatches = Object.create(null);

  /*
   * To support field level boosts a query vector is created per
   * field. An empty vector is eagerly created to support negated
   * queries.
   */
  for (var i = 0; i < this.fields.length; i++) {
    queryVectors[this.fields[i]] = new lunr.Vector;
  }

  fn.call(query, query);

  for (var i = 0; i < query.clauses.length; i++) {
    /*
     * Unless the pipeline has been disabled for this term, which is
     * the case for terms with wildcards, we need to pass the clause
     * term through the search pipeline. A pipeline returns an array
     * of processed terms. Pipeline functions may expand the passed
     * term, which means we may end up performing multiple index lookups
     * for a single query term.
     */
    var clause = query.clauses[i],
        terms = null,
        clauseMatches = lunr.Set.empty;

    if (clause.usePipeline) {
      terms = this.pipeline.runString(clause.term, {
        fields: clause.fields
      });
    } else {
      terms = [clause.term];
    }

    for (var m = 0; m < terms.length; m++) {
      var term = terms[m];

      /*
       * Each term returned from the pipeline needs to use the same query
       * clause object, e.g. the same boost and or edit distance. The
       * simplest way to do this is to re-use the clause object but mutate
       * its term property.
       */
      clause.term = term;

      /*
       * From the term in the clause we create a token set which will then
       * be used to intersect the indexes token set to get a list of terms
       * to lookup in the inverted index
       */
      var termTokenSet = lunr.TokenSet.fromClause(clause),
          expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();

      /*
       * If a term marked as required does not exist in the tokenSet it is
       * impossible for the search to return any matches. We set all the field
       * scoped required matches set to empty and stop examining any further
       * clauses.
       */
      if (expandedTerms.length === 0 && clause.presence === lunr.Query.presence.REQUIRED) {
        for (var k = 0; k < clause.fields.length; k++) {
          var field = clause.fields[k];
          requiredMatches[field] = lunr.Set.empty;
        }

        break
      }

      for (var j = 0; j < expandedTerms.length; j++) {
        /*
         * For each term get the posting and termIndex, this is required for
         * building the query vector.
         */
        var expandedTerm = expandedTerms[j],
            posting = this.invertedIndex[expandedTerm],
            termIndex = posting._index;

        for (var k = 0; k < clause.fields.length; k++) {
          /*
           * For each field that this query term is scoped by (by default
           * all fields are in scope) we need to get all the document refs
           * that have this term in that field.
           *
           * The posting is the entry in the invertedIndex for the matching
           * term from above.
           */
          var field = clause.fields[k],
              fieldPosting = posting[field],
              matchingDocumentRefs = Object.keys(fieldPosting),
              termField = expandedTerm + "/" + field,
              matchingDocumentsSet = new lunr.Set(matchingDocumentRefs);

          /*
           * if the presence of this term is required ensure that the matching
           * documents are added to the set of required matches for this clause.
           *
           */
          if (clause.presence == lunr.Query.presence.REQUIRED) {
            clauseMatches = clauseMatches.union(matchingDocumentsSet);

            if (requiredMatches[field] === undefined) {
              requiredMatches[field] = lunr.Set.complete;
            }
          }

          /*
           * if the presence of this term is prohibited ensure that the matching
           * documents are added to the set of prohibited matches for this field,
           * creating that set if it does not yet exist.
           */
          if (clause.presence == lunr.Query.presence.PROHIBITED) {
            if (prohibitedMatches[field] === undefined) {
              prohibitedMatches[field] = lunr.Set.empty;
            }

            prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);

            /*
             * Prohibited matches should not be part of the query vector used for
             * similarity scoring and no metadata should be extracted so we continue
             * to the next field
             */
            continue
          }

          /*
           * The query field vector is populated using the termIndex found for
           * the term and a unit value with the appropriate boost applied.
           * Using upsert because there could already be an entry in the vector
           * for the term we are working with. In that case we just add the scores
           * together.
           */
          queryVectors[field].upsert(termIndex, clause.boost, function (a, b) { return a + b });

          /**
           * If we've already seen this term, field combo then we've already collected
           * the matching documents and metadata, no need to go through all that again
           */
          if (termFieldCache[termField]) {
            continue
          }

          for (var l = 0; l < matchingDocumentRefs.length; l++) {
            /*
             * All metadata for this term/field/document triple
             * are then extracted and collected into an instance
             * of lunr.MatchData ready to be returned in the query
             * results
             */
            var matchingDocumentRef = matchingDocumentRefs[l],
                matchingFieldRef = new lunr.FieldRef (matchingDocumentRef, field),
                metadata = fieldPosting[matchingDocumentRef],
                fieldMatch;

            if ((fieldMatch = matchingFields[matchingFieldRef]) === undefined) {
              matchingFields[matchingFieldRef] = new lunr.MatchData (expandedTerm, field, metadata);
            } else {
              fieldMatch.add(expandedTerm, field, metadata);
            }

          }

          termFieldCache[termField] = true;
        }
      }
    }

    /**
     * If the presence was required we need to update the requiredMatches field sets.
     * We do this after all fields for the term have collected their matches because
     * the clause terms presence is required in _any_ of the fields not _all_ of the
     * fields.
     */
    if (clause.presence === lunr.Query.presence.REQUIRED) {
      for (var k = 0; k < clause.fields.length; k++) {
        var field = clause.fields[k];
        requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
      }
    }
  }

  /**
   * Need to combine the field scoped required and prohibited
   * matching documents into a global set of required and prohibited
   * matches
   */
  var allRequiredMatches = lunr.Set.complete,
      allProhibitedMatches = lunr.Set.empty;

  for (var i = 0; i < this.fields.length; i++) {
    var field = this.fields[i];

    if (requiredMatches[field]) {
      allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
    }

    if (prohibitedMatches[field]) {
      allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
    }
  }

  var matchingFieldRefs = Object.keys(matchingFields),
      results = [],
      matches = Object.create(null);

  /*
   * If the query is negated (contains only prohibited terms)
   * we need to get _all_ fieldRefs currently existing in the
   * index. This is only done when we know that the query is
   * entirely prohibited terms to avoid any cost of getting all
   * fieldRefs unnecessarily.
   *
   * Additionally, blank MatchData must be created to correctly
   * populate the results.
   */
  if (query.isNegated()) {
    matchingFieldRefs = Object.keys(this.fieldVectors);

    for (var i = 0; i < matchingFieldRefs.length; i++) {
      var matchingFieldRef = matchingFieldRefs[i];
      var fieldRef = lunr.FieldRef.fromString(matchingFieldRef);
      matchingFields[matchingFieldRef] = new lunr.MatchData;
    }
  }

  for (var i = 0; i < matchingFieldRefs.length; i++) {
    /*
     * Currently we have document fields that match the query, but we
     * need to return documents. The matchData and scores are combined
     * from multiple fields belonging to the same document.
     *
     * Scores are calculated by field, using the query vectors created
     * above, and combined into a final document score using addition.
     */
    var fieldRef = lunr.FieldRef.fromString(matchingFieldRefs[i]),
        docRef = fieldRef.docRef;

    if (!allRequiredMatches.contains(docRef)) {
      continue
    }

    if (allProhibitedMatches.contains(docRef)) {
      continue
    }

    var fieldVector = this.fieldVectors[fieldRef],
        score = queryVectors[fieldRef.fieldName].similarity(fieldVector),
        docMatch;

    if ((docMatch = matches[docRef]) !== undefined) {
      docMatch.score += score;
      docMatch.matchData.combine(matchingFields[fieldRef]);
    } else {
      var match = {
        ref: docRef,
        score: score,
        matchData: matchingFields[fieldRef]
      };
      matches[docRef] = match;
      results.push(match);
    }
  }

  /*
   * Sort the results objects by score, highest first.
   */
  return results.sort(function (a, b) {
    return b.score - a.score
  })
};

/**
 * Prepares the index for JSON serialization.
 *
 * The schema for this JSON blob will be described in a
 * separate JSON schema file.
 *
 * @returns {Object}
 */
lunr.Index.prototype.toJSON = function () {
  var invertedIndex = Object.keys(this.invertedIndex)
    .sort()
    .map(function (term) {
      return [term, this.invertedIndex[term]]
    }, this);

  var fieldVectors = Object.keys(this.fieldVectors)
    .map(function (ref) {
      return [ref, this.fieldVectors[ref].toJSON()]
    }, this);

  return {
    version: lunr.version,
    fields: this.fields,
    fieldVectors: fieldVectors,
    invertedIndex: invertedIndex,
    pipeline: this.pipeline.toJSON()
  }
};

/**
 * Loads a previously serialized lunr.Index
 *
 * @param {Object} serializedIndex - A previously serialized lunr.Index
 * @returns {lunr.Index}
 */
lunr.Index.load = function (serializedIndex) {
  var attrs = {},
      fieldVectors = {},
      serializedVectors = serializedIndex.fieldVectors,
      invertedIndex = Object.create(null),
      serializedInvertedIndex = serializedIndex.invertedIndex,
      tokenSetBuilder = new lunr.TokenSet.Builder,
      pipeline = lunr.Pipeline.load(serializedIndex.pipeline);

  if (serializedIndex.version != lunr.version) {
    lunr.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr.version + "' does not match serialized index '" + serializedIndex.version + "'");
  }

  for (var i = 0; i < serializedVectors.length; i++) {
    var tuple = serializedVectors[i],
        ref = tuple[0],
        elements = tuple[1];

    fieldVectors[ref] = new lunr.Vector(elements);
  }

  for (var i = 0; i < serializedInvertedIndex.length; i++) {
    var tuple = serializedInvertedIndex[i],
        term = tuple[0],
        posting = tuple[1];

    tokenSetBuilder.insert(term);
    invertedIndex[term] = posting;
  }

  tokenSetBuilder.finish();

  attrs.fields = serializedIndex.fields;

  attrs.fieldVectors = fieldVectors;
  attrs.invertedIndex = invertedIndex;
  attrs.tokenSet = tokenSetBuilder.root;
  attrs.pipeline = pipeline;

  return new lunr.Index(attrs)
};
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */

/**
 * lunr.Builder performs indexing on a set of documents and
 * returns instances of lunr.Index ready for querying.
 *
 * All configuration of the index is done via the builder, the
 * fields to index, the document reference, the text processing
 * pipeline and document scoring parameters are all set on the
 * builder before indexing.
 *
 * @constructor
 * @property {string} _ref - Internal reference to the document reference field.
 * @property {string[]} _fields - Internal reference to the document fields to index.
 * @property {object} invertedIndex - The inverted index maps terms to document fields.
 * @property {object} documentTermFrequencies - Keeps track of document term frequencies.
 * @property {object} documentLengths - Keeps track of the length of documents added to the index.
 * @property {lunr.tokenizer} tokenizer - Function for splitting strings into tokens for indexing.
 * @property {lunr.Pipeline} pipeline - The pipeline performs text processing on tokens before indexing.
 * @property {lunr.Pipeline} searchPipeline - A pipeline for processing search terms before querying the index.
 * @property {number} documentCount - Keeps track of the total number of documents indexed.
 * @property {number} _b - A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
 * @property {number} _k1 - A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
 * @property {number} termIndex - A counter incremented for each unique term, used to identify a terms position in the vector space.
 * @property {array} metadataWhitelist - A list of metadata keys that have been whitelisted for entry in the index.
 */
lunr.Builder = function () {
  this._ref = "id";
  this._fields = Object.create(null);
  this._documents = Object.create(null);
  this.invertedIndex = Object.create(null);
  this.fieldTermFrequencies = {};
  this.fieldLengths = {};
  this.tokenizer = lunr.tokenizer;
  this.pipeline = new lunr.Pipeline;
  this.searchPipeline = new lunr.Pipeline;
  this.documentCount = 0;
  this._b = 0.75;
  this._k1 = 1.2;
  this.termIndex = 0;
  this.metadataWhitelist = [];
};

/**
 * Sets the document field used as the document reference. Every document must have this field.
 * The type of this field in the document should be a string, if it is not a string it will be
 * coerced into a string by calling toString.
 *
 * The default ref is 'id'.
 *
 * The ref should _not_ be changed during indexing, it should be set before any documents are
 * added to the index. Changing it during indexing can lead to inconsistent results.
 *
 * @param {string} ref - The name of the reference field in the document.
 */
lunr.Builder.prototype.ref = function (ref) {
  this._ref = ref;
};

/**
 * A function that is used to extract a field from a document.
 *
 * Lunr expects a field to be at the top level of a document, if however the field
 * is deeply nested within a document an extractor function can be used to extract
 * the right field for indexing.
 *
 * @callback fieldExtractor
 * @param {object} doc - The document being added to the index.
 * @returns {?(string|object|object[])} obj - The object that will be indexed for this field.
 * @example <caption>Extracting a nested field</caption>
 * function (doc) { return doc.nested.field }
 */

/**
 * Adds a field to the list of document fields that will be indexed. Every document being
 * indexed should have this field. Null values for this field in indexed documents will
 * not cause errors but will limit the chance of that document being retrieved by searches.
 *
 * All fields should be added before adding documents to the index. Adding fields after
 * a document has been indexed will have no effect on already indexed documents.
 *
 * Fields can be boosted at build time. This allows terms within that field to have more
 * importance when ranking search results. Use a field boost to specify that matches within
 * one field are more important than other fields.
 *
 * @param {string} fieldName - The name of a field to index in all documents.
 * @param {object} attributes - Optional attributes associated with this field.
 * @param {number} [attributes.boost=1] - Boost applied to all terms within this field.
 * @param {fieldExtractor} [attributes.extractor] - Function to extract a field from a document.
 * @throws {RangeError} fieldName cannot contain unsupported characters '/'
 */
lunr.Builder.prototype.field = function (fieldName, attributes) {
  if (/\//.test(fieldName)) {
    throw new RangeError ("Field '" + fieldName + "' contains illegal character '/'")
  }

  this._fields[fieldName] = attributes || {};
};

/**
 * A parameter to tune the amount of field length normalisation that is applied when
 * calculating relevance scores. A value of 0 will completely disable any normalisation
 * and a value of 1 will fully normalise field lengths. The default is 0.75. Values of b
 * will be clamped to the range 0 - 1.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */
lunr.Builder.prototype.b = function (number) {
  if (number < 0) {
    this._b = 0;
  } else if (number > 1) {
    this._b = 1;
  } else {
    this._b = number;
  }
};

/**
 * A parameter that controls the speed at which a rise in term frequency results in term
 * frequency saturation. The default value is 1.2. Setting this to a higher value will give
 * slower saturation levels, a lower value will result in quicker saturation.
 *
 * @param {number} number - The value to set for this tuning parameter.
 */
lunr.Builder.prototype.k1 = function (number) {
  this._k1 = number;
};

/**
 * Adds a document to the index.
 *
 * Before adding fields to the index the index should have been fully setup, with the document
 * ref and all fields to index already having been specified.
 *
 * The document must have a field name as specified by the ref (by default this is 'id') and
 * it should have all fields defined for indexing, though null or undefined values will not
 * cause errors.
 *
 * Entire documents can be boosted at build time. Applying a boost to a document indicates that
 * this document should rank higher in search results than other documents.
 *
 * @param {object} doc - The document to add to the index.
 * @param {object} attributes - Optional attributes associated with this document.
 * @param {number} [attributes.boost=1] - Boost applied to all terms within this document.
 */
lunr.Builder.prototype.add = function (doc, attributes) {
  var docRef = doc[this._ref],
      fields = Object.keys(this._fields);

  this._documents[docRef] = attributes || {};
  this.documentCount += 1;

  for (var i = 0; i < fields.length; i++) {
    var fieldName = fields[i],
        extractor = this._fields[fieldName].extractor,
        field = extractor ? extractor(doc) : doc[fieldName],
        tokens = this.tokenizer(field, {
          fields: [fieldName]
        }),
        terms = this.pipeline.run(tokens),
        fieldRef = new lunr.FieldRef (docRef, fieldName),
        fieldTerms = Object.create(null);

    this.fieldTermFrequencies[fieldRef] = fieldTerms;
    this.fieldLengths[fieldRef] = 0;

    // store the length of this field for this document
    this.fieldLengths[fieldRef] += terms.length;

    // calculate term frequencies for this field
    for (var j = 0; j < terms.length; j++) {
      var term = terms[j];

      if (fieldTerms[term] == undefined) {
        fieldTerms[term] = 0;
      }

      fieldTerms[term] += 1;

      // add to inverted index
      // create an initial posting if one doesn't exist
      if (this.invertedIndex[term] == undefined) {
        var posting = Object.create(null);
        posting["_index"] = this.termIndex;
        this.termIndex += 1;

        for (var k = 0; k < fields.length; k++) {
          posting[fields[k]] = Object.create(null);
        }

        this.invertedIndex[term] = posting;
      }

      // add an entry for this term/fieldName/docRef to the invertedIndex
      if (this.invertedIndex[term][fieldName][docRef] == undefined) {
        this.invertedIndex[term][fieldName][docRef] = Object.create(null);
      }

      // store all whitelisted metadata about this token in the
      // inverted index
      for (var l = 0; l < this.metadataWhitelist.length; l++) {
        var metadataKey = this.metadataWhitelist[l],
            metadata = term.metadata[metadataKey];

        if (this.invertedIndex[term][fieldName][docRef][metadataKey] == undefined) {
          this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
        }

        this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
      }
    }

  }
};

/**
 * Calculates the average document length for this index
 *
 * @private
 */
lunr.Builder.prototype.calculateAverageFieldLengths = function () {

  var fieldRefs = Object.keys(this.fieldLengths),
      numberOfFields = fieldRefs.length,
      accumulator = {},
      documentsWithField = {};

  for (var i = 0; i < numberOfFields; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
        field = fieldRef.fieldName;

    documentsWithField[field] || (documentsWithField[field] = 0);
    documentsWithField[field] += 1;

    accumulator[field] || (accumulator[field] = 0);
    accumulator[field] += this.fieldLengths[fieldRef];
  }

  var fields = Object.keys(this._fields);

  for (var i = 0; i < fields.length; i++) {
    var fieldName = fields[i];
    accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
  }

  this.averageFieldLength = accumulator;
};

/**
 * Builds a vector space model of every document using lunr.Vector
 *
 * @private
 */
lunr.Builder.prototype.createFieldVectors = function () {
  var fieldVectors = {},
      fieldRefs = Object.keys(this.fieldTermFrequencies),
      fieldRefsLength = fieldRefs.length,
      termIdfCache = Object.create(null);

  for (var i = 0; i < fieldRefsLength; i++) {
    var fieldRef = lunr.FieldRef.fromString(fieldRefs[i]),
        fieldName = fieldRef.fieldName,
        fieldLength = this.fieldLengths[fieldRef],
        fieldVector = new lunr.Vector,
        termFrequencies = this.fieldTermFrequencies[fieldRef],
        terms = Object.keys(termFrequencies),
        termsLength = terms.length;


    var fieldBoost = this._fields[fieldName].boost || 1,
        docBoost = this._documents[fieldRef.docRef].boost || 1;

    for (var j = 0; j < termsLength; j++) {
      var term = terms[j],
          tf = termFrequencies[term],
          termIndex = this.invertedIndex[term]._index,
          idf, score, scoreWithPrecision;

      if (termIdfCache[term] === undefined) {
        idf = lunr.idf(this.invertedIndex[term], this.documentCount);
        termIdfCache[term] = idf;
      } else {
        idf = termIdfCache[term];
      }

      score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
      score *= fieldBoost;
      score *= docBoost;
      scoreWithPrecision = Math.round(score * 1000) / 1000;
      // Converts 1.23456789 to 1.234.
      // Reducing the precision so that the vectors take up less
      // space when serialised. Doing it now so that they behave
      // the same before and after serialisation. Also, this is
      // the fastest approach to reducing a number's precision in
      // JavaScript.

      fieldVector.insert(termIndex, scoreWithPrecision);
    }

    fieldVectors[fieldRef] = fieldVector;
  }

  this.fieldVectors = fieldVectors;
};

/**
 * Creates a token set of all tokens in the index using lunr.TokenSet
 *
 * @private
 */
lunr.Builder.prototype.createTokenSet = function () {
  this.tokenSet = lunr.TokenSet.fromArray(
    Object.keys(this.invertedIndex).sort()
  );
};

/**
 * Builds the index, creating an instance of lunr.Index.
 *
 * This completes the indexing process and should only be called
 * once all documents have been added to the index.
 *
 * @returns {lunr.Index}
 */
lunr.Builder.prototype.build = function () {
  this.calculateAverageFieldLengths();
  this.createFieldVectors();
  this.createTokenSet();

  return new lunr.Index({
    invertedIndex: this.invertedIndex,
    fieldVectors: this.fieldVectors,
    tokenSet: this.tokenSet,
    fields: Object.keys(this._fields),
    pipeline: this.searchPipeline
  })
};

/**
 * Applies a plugin to the index builder.
 *
 * A plugin is a function that is called with the index builder as its context.
 * Plugins can be used to customise or extend the behaviour of the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied when building the index.
 *
 * The plugin function will be called with the index builder as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index builder as its context.
 *
 * @param {Function} plugin The plugin to apply.
 */
lunr.Builder.prototype.use = function (fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.unshift(this);
  fn.apply(this, args);
};
/**
 * Contains and collects metadata about a matching document.
 * A single instance of lunr.MatchData is returned as part of every
 * lunr.Index~Result.
 *
 * @constructor
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 * @property {object} metadata - A cloned collection of metadata associated with this document.
 * @see {@link lunr.Index~Result}
 */
lunr.MatchData = function (term, field, metadata) {
  var clonedMetadata = Object.create(null),
      metadataKeys = Object.keys(metadata || {});

  // Cloning the metadata to prevent the original
  // being mutated during match data combination.
  // Metadata is kept in an array within the inverted
  // index so cloning the data can be done with
  // Array#slice
  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i];
    clonedMetadata[key] = metadata[key].slice();
  }

  this.metadata = Object.create(null);

  if (term !== undefined) {
    this.metadata[term] = Object.create(null);
    this.metadata[term][field] = clonedMetadata;
  }
};

/**
 * An instance of lunr.MatchData will be created for every term that matches a
 * document. However only one instance is required in a lunr.Index~Result. This
 * method combines metadata from another instance of lunr.MatchData with this
 * objects metadata.
 *
 * @param {lunr.MatchData} otherMatchData - Another instance of match data to merge with this one.
 * @see {@link lunr.Index~Result}
 */
lunr.MatchData.prototype.combine = function (otherMatchData) {
  var terms = Object.keys(otherMatchData.metadata);

  for (var i = 0; i < terms.length; i++) {
    var term = terms[i],
        fields = Object.keys(otherMatchData.metadata[term]);

    if (this.metadata[term] == undefined) {
      this.metadata[term] = Object.create(null);
    }

    for (var j = 0; j < fields.length; j++) {
      var field = fields[j],
          keys = Object.keys(otherMatchData.metadata[term][field]);

      if (this.metadata[term][field] == undefined) {
        this.metadata[term][field] = Object.create(null);
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        if (this.metadata[term][field][key] == undefined) {
          this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
        } else {
          this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
        }

      }
    }
  }
};

/**
 * Add metadata for a term/field pair to this instance of match data.
 *
 * @param {string} term - The term this match data is associated with
 * @param {string} field - The field in which the term was found
 * @param {object} metadata - The metadata recorded about this term in this field
 */
lunr.MatchData.prototype.add = function (term, field, metadata) {
  if (!(term in this.metadata)) {
    this.metadata[term] = Object.create(null);
    this.metadata[term][field] = metadata;
    return
  }

  if (!(field in this.metadata[term])) {
    this.metadata[term][field] = metadata;
    return
  }

  var metadataKeys = Object.keys(metadata);

  for (var i = 0; i < metadataKeys.length; i++) {
    var key = metadataKeys[i];

    if (key in this.metadata[term][field]) {
      this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
    } else {
      this.metadata[term][field][key] = metadata[key];
    }
  }
};
/**
 * A lunr.Query provides a programmatic way of defining queries to be performed
 * against a {@link lunr.Index}.
 *
 * Prefer constructing a lunr.Query using the {@link lunr.Index#query} method
 * so the query object is pre-initialized with the right index fields.
 *
 * @constructor
 * @property {lunr.Query~Clause[]} clauses - An array of query clauses.
 * @property {string[]} allFields - An array of all available fields in a lunr.Index.
 */
lunr.Query = function (allFields) {
  this.clauses = [];
  this.allFields = allFields;
};

/**
 * Constants for indicating what kind of automatic wildcard insertion will be used when constructing a query clause.
 *
 * This allows wildcards to be added to the beginning and end of a term without having to manually do any string
 * concatenation.
 *
 * The wildcard constants can be bitwise combined to select both leading and trailing wildcards.
 *
 * @constant
 * @default
 * @property {number} wildcard.NONE - The term will have no wildcards inserted, this is the default behaviour
 * @property {number} wildcard.LEADING - Prepend the term with a wildcard, unless a leading wildcard already exists
 * @property {number} wildcard.TRAILING - Append a wildcard to the term, unless a trailing wildcard already exists
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with trailing wildcard</caption>
 * query.term('foo', { wildcard: lunr.Query.wildcard.TRAILING })
 * @example <caption>query term with leading and trailing wildcard</caption>
 * query.term('foo', {
 *   wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING
 * })
 */

lunr.Query.wildcard = new String ("*");
lunr.Query.wildcard.NONE = 0;
lunr.Query.wildcard.LEADING = 1;
lunr.Query.wildcard.TRAILING = 2;

/**
 * Constants for indicating what kind of presence a term must have in matching documents.
 *
 * @constant
 * @enum {number}
 * @see lunr.Query~Clause
 * @see lunr.Query#clause
 * @see lunr.Query#term
 * @example <caption>query term with required presence</caption>
 * query.term('foo', { presence: lunr.Query.presence.REQUIRED })
 */
lunr.Query.presence = {
  /**
   * Term's presence in a document is optional, this is the default value.
   */
  OPTIONAL: 1,

  /**
   * Term's presence in a document is required, documents that do not contain
   * this term will not be returned.
   */
  REQUIRED: 2,

  /**
   * Term's presence in a document is prohibited, documents that do contain
   * this term will not be returned.
   */
  PROHIBITED: 3
};

/**
 * A single clause in a {@link lunr.Query} contains a term and details on how to
 * match that term against a {@link lunr.Index}.
 *
 * @typedef {Object} lunr.Query~Clause
 * @property {string[]} fields - The fields in an index this clause should be matched against.
 * @property {number} [boost=1] - Any boost that should be applied when matching this clause.
 * @property {number} [editDistance] - Whether the term should have fuzzy matching applied, and how fuzzy the match should be.
 * @property {boolean} [usePipeline] - Whether the term should be passed through the search pipeline.
 * @property {number} [wildcard=lunr.Query.wildcard.NONE] - Whether the term should have wildcards appended or prepended.
 * @property {number} [presence=lunr.Query.presence.OPTIONAL] - The terms presence in any matching documents.
 */

/**
 * Adds a {@link lunr.Query~Clause} to this query.
 *
 * Unless the clause contains the fields to be matched all fields will be matched. In addition
 * a default boost of 1 is applied to the clause.
 *
 * @param {lunr.Query~Clause} clause - The clause to add to this query.
 * @see lunr.Query~Clause
 * @returns {lunr.Query}
 */
lunr.Query.prototype.clause = function (clause) {
  if (!('fields' in clause)) {
    clause.fields = this.allFields;
  }

  if (!('boost' in clause)) {
    clause.boost = 1;
  }

  if (!('usePipeline' in clause)) {
    clause.usePipeline = true;
  }

  if (!('wildcard' in clause)) {
    clause.wildcard = lunr.Query.wildcard.NONE;
  }

  if ((clause.wildcard & lunr.Query.wildcard.LEADING) && (clause.term.charAt(0) != lunr.Query.wildcard)) {
    clause.term = "*" + clause.term;
  }

  if ((clause.wildcard & lunr.Query.wildcard.TRAILING) && (clause.term.slice(-1) != lunr.Query.wildcard)) {
    clause.term = "" + clause.term + "*";
  }

  if (!('presence' in clause)) {
    clause.presence = lunr.Query.presence.OPTIONAL;
  }

  this.clauses.push(clause);

  return this
};

/**
 * A negated query is one in which every clause has a presence of
 * prohibited. These queries require some special processing to return
 * the expected results.
 *
 * @returns boolean
 */
lunr.Query.prototype.isNegated = function () {
  for (var i = 0; i < this.clauses.length; i++) {
    if (this.clauses[i].presence != lunr.Query.presence.PROHIBITED) {
      return false
    }
  }

  return true
};

/**
 * Adds a term to the current query, under the covers this will create a {@link lunr.Query~Clause}
 * to the list of clauses that make up this query.
 *
 * The term is used as is, i.e. no tokenization will be performed by this method. Instead conversion
 * to a token or token-like string should be done before calling this method.
 *
 * The term will be converted to a string by calling `toString`. Multiple terms can be passed as an
 * array, each term in the array will share the same options.
 *
 * @param {object|object[]} term - The term(s) to add to the query.
 * @param {object} [options] - Any additional properties to add to the query clause.
 * @returns {lunr.Query}
 * @see lunr.Query#clause
 * @see lunr.Query~Clause
 * @example <caption>adding a single term to a query</caption>
 * query.term("foo")
 * @example <caption>adding a single term to a query and specifying search fields, term boost and automatic trailing wildcard</caption>
 * query.term("foo", {
 *   fields: ["title"],
 *   boost: 10,
 *   wildcard: lunr.Query.wildcard.TRAILING
 * })
 * @example <caption>using lunr.tokenizer to convert a string to tokens before using them as terms</caption>
 * query.term(lunr.tokenizer("foo bar"))
 */
lunr.Query.prototype.term = function (term, options) {
  if (Array.isArray(term)) {
    term.forEach(function (t) { this.term(t, lunr.utils.clone(options)); }, this);
    return this
  }

  var clause = options || {};
  clause.term = term.toString();

  this.clause(clause);

  return this
};
lunr.QueryParseError = function (message, start, end) {
  this.name = "QueryParseError";
  this.message = message;
  this.start = start;
  this.end = end;
};

lunr.QueryParseError.prototype = new Error;
lunr.QueryLexer = function (str) {
  this.lexemes = [];
  this.str = str;
  this.length = str.length;
  this.pos = 0;
  this.start = 0;
  this.escapeCharPositions = [];
};

lunr.QueryLexer.prototype.run = function () {
  var state = lunr.QueryLexer.lexText;

  while (state) {
    state = state(this);
  }
};

lunr.QueryLexer.prototype.sliceString = function () {
  var subSlices = [],
      sliceStart = this.start,
      sliceEnd = this.pos;

  for (var i = 0; i < this.escapeCharPositions.length; i++) {
    sliceEnd = this.escapeCharPositions[i];
    subSlices.push(this.str.slice(sliceStart, sliceEnd));
    sliceStart = sliceEnd + 1;
  }

  subSlices.push(this.str.slice(sliceStart, this.pos));
  this.escapeCharPositions.length = 0;

  return subSlices.join('')
};

lunr.QueryLexer.prototype.emit = function (type) {
  this.lexemes.push({
    type: type,
    str: this.sliceString(),
    start: this.start,
    end: this.pos
  });

  this.start = this.pos;
};

lunr.QueryLexer.prototype.escapeCharacter = function () {
  this.escapeCharPositions.push(this.pos - 1);
  this.pos += 1;
};

lunr.QueryLexer.prototype.next = function () {
  if (this.pos >= this.length) {
    return lunr.QueryLexer.EOS
  }

  var char = this.str.charAt(this.pos);
  this.pos += 1;
  return char
};

lunr.QueryLexer.prototype.width = function () {
  return this.pos - this.start
};

lunr.QueryLexer.prototype.ignore = function () {
  if (this.start == this.pos) {
    this.pos += 1;
  }

  this.start = this.pos;
};

lunr.QueryLexer.prototype.backup = function () {
  this.pos -= 1;
};

lunr.QueryLexer.prototype.acceptDigitRun = function () {
  var char, charCode;

  do {
    char = this.next();
    charCode = char.charCodeAt(0);
  } while (charCode > 47 && charCode < 58)

  if (char != lunr.QueryLexer.EOS) {
    this.backup();
  }
};

lunr.QueryLexer.prototype.more = function () {
  return this.pos < this.length
};

lunr.QueryLexer.EOS = 'EOS';
lunr.QueryLexer.FIELD = 'FIELD';
lunr.QueryLexer.TERM = 'TERM';
lunr.QueryLexer.EDIT_DISTANCE = 'EDIT_DISTANCE';
lunr.QueryLexer.BOOST = 'BOOST';
lunr.QueryLexer.PRESENCE = 'PRESENCE';

lunr.QueryLexer.lexField = function (lexer) {
  lexer.backup();
  lexer.emit(lunr.QueryLexer.FIELD);
  lexer.ignore();
  return lunr.QueryLexer.lexText
};

lunr.QueryLexer.lexTerm = function (lexer) {
  if (lexer.width() > 1) {
    lexer.backup();
    lexer.emit(lunr.QueryLexer.TERM);
  }

  lexer.ignore();

  if (lexer.more()) {
    return lunr.QueryLexer.lexText
  }
};

lunr.QueryLexer.lexEditDistance = function (lexer) {
  lexer.ignore();
  lexer.acceptDigitRun();
  lexer.emit(lunr.QueryLexer.EDIT_DISTANCE);
  return lunr.QueryLexer.lexText
};

lunr.QueryLexer.lexBoost = function (lexer) {
  lexer.ignore();
  lexer.acceptDigitRun();
  lexer.emit(lunr.QueryLexer.BOOST);
  return lunr.QueryLexer.lexText
};

lunr.QueryLexer.lexEOS = function (lexer) {
  if (lexer.width() > 0) {
    lexer.emit(lunr.QueryLexer.TERM);
  }
};

// This matches the separator used when tokenising fields
// within a document. These should match otherwise it is
// not possible to search for some tokens within a document.
//
// It is possible for the user to change the separator on the
// tokenizer so it _might_ clash with any other of the special
// characters already used within the search string, e.g. :.
//
// This means that it is possible to change the separator in
// such a way that makes some words unsearchable using a search
// string.
lunr.QueryLexer.termSeparator = lunr.tokenizer.separator;

lunr.QueryLexer.lexText = function (lexer) {
  while (true) {
    var char = lexer.next();

    if (char == lunr.QueryLexer.EOS) {
      return lunr.QueryLexer.lexEOS
    }

    // Escape character is '\'
    if (char.charCodeAt(0) == 92) {
      lexer.escapeCharacter();
      continue
    }

    if (char == ":") {
      return lunr.QueryLexer.lexField
    }

    if (char == "~") {
      lexer.backup();
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM);
      }
      return lunr.QueryLexer.lexEditDistance
    }

    if (char == "^") {
      lexer.backup();
      if (lexer.width() > 0) {
        lexer.emit(lunr.QueryLexer.TERM);
      }
      return lunr.QueryLexer.lexBoost
    }

    // "+" indicates term presence is required
    // checking for length to ensure that only
    // leading "+" are considered
    if (char == "+" && lexer.width() === 1) {
      lexer.emit(lunr.QueryLexer.PRESENCE);
      return lunr.QueryLexer.lexText
    }

    // "-" indicates term presence is prohibited
    // checking for length to ensure that only
    // leading "-" are considered
    if (char == "-" && lexer.width() === 1) {
      lexer.emit(lunr.QueryLexer.PRESENCE);
      return lunr.QueryLexer.lexText
    }

    if (char.match(lunr.QueryLexer.termSeparator)) {
      return lunr.QueryLexer.lexTerm
    }
  }
};

lunr.QueryParser = function (str, query) {
  this.lexer = new lunr.QueryLexer (str);
  this.query = query;
  this.currentClause = {};
  this.lexemeIdx = 0;
};

lunr.QueryParser.prototype.parse = function () {
  this.lexer.run();
  this.lexemes = this.lexer.lexemes;

  var state = lunr.QueryParser.parseClause;

  while (state) {
    state = state(this);
  }

  return this.query
};

lunr.QueryParser.prototype.peekLexeme = function () {
  return this.lexemes[this.lexemeIdx]
};

lunr.QueryParser.prototype.consumeLexeme = function () {
  var lexeme = this.peekLexeme();
  this.lexemeIdx += 1;
  return lexeme
};

lunr.QueryParser.prototype.nextClause = function () {
  var completedClause = this.currentClause;
  this.query.clause(completedClause);
  this.currentClause = {};
};

lunr.QueryParser.parseClause = function (parser) {
  var lexeme = parser.peekLexeme();

  if (lexeme == undefined) {
    return
  }

  switch (lexeme.type) {
    case lunr.QueryLexer.PRESENCE:
      return lunr.QueryParser.parsePresence
    case lunr.QueryLexer.FIELD:
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm
    default:
      var errorMessage = "expected either a field or a term, found " + lexeme.type;

      if (lexeme.str.length >= 1) {
        errorMessage += " with value '" + lexeme.str + "'";
      }

      throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }
};

lunr.QueryParser.parsePresence = function (parser) {
  var lexeme = parser.consumeLexeme();

  if (lexeme == undefined) {
    return
  }

  switch (lexeme.str) {
    case "-":
      parser.currentClause.presence = lunr.Query.presence.PROHIBITED;
      break
    case "+":
      parser.currentClause.presence = lunr.Query.presence.REQUIRED;
      break
    default:
      var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
      throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  var nextLexeme = parser.peekLexeme();

  if (nextLexeme == undefined) {
    var errorMessage = "expecting term or field, found nothing";
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.FIELD:
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm
    default:
      var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
};

lunr.QueryParser.parseField = function (parser) {
  var lexeme = parser.consumeLexeme();

  if (lexeme == undefined) {
    return
  }

  if (parser.query.allFields.indexOf(lexeme.str) == -1) {
    var possibleFields = parser.query.allFields.map(function (f) { return "'" + f + "'" }).join(', '),
        errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;

    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.fields = [lexeme.str];

  var nextLexeme = parser.peekLexeme();

  if (nextLexeme == undefined) {
    var errorMessage = "expecting term, found nothing";
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      return lunr.QueryParser.parseTerm
    default:
      var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
};

lunr.QueryParser.parseTerm = function (parser) {
  var lexeme = parser.consumeLexeme();

  if (lexeme == undefined) {
    return
  }

  parser.currentClause.term = lexeme.str.toLowerCase();

  if (lexeme.str.indexOf("*") != -1) {
    parser.currentClause.usePipeline = false;
  }

  var nextLexeme = parser.peekLexeme();

  if (nextLexeme == undefined) {
    parser.nextClause();
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause();
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause();
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    case lunr.QueryLexer.PRESENCE:
      parser.nextClause();
      return lunr.QueryParser.parsePresence
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
};

lunr.QueryParser.parseEditDistance = function (parser) {
  var lexeme = parser.consumeLexeme();

  if (lexeme == undefined) {
    return
  }

  var editDistance = parseInt(lexeme.str, 10);

  if (isNaN(editDistance)) {
    var errorMessage = "edit distance must be numeric";
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.editDistance = editDistance;

  var nextLexeme = parser.peekLexeme();

  if (nextLexeme == undefined) {
    parser.nextClause();
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause();
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause();
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    case lunr.QueryLexer.PRESENCE:
      parser.nextClause();
      return lunr.QueryParser.parsePresence
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
};

lunr.QueryParser.parseBoost = function (parser) {
  var lexeme = parser.consumeLexeme();

  if (lexeme == undefined) {
    return
  }

  var boost = parseInt(lexeme.str, 10);

  if (isNaN(boost)) {
    var errorMessage = "boost must be numeric";
    throw new lunr.QueryParseError (errorMessage, lexeme.start, lexeme.end)
  }

  parser.currentClause.boost = boost;

  var nextLexeme = parser.peekLexeme();

  if (nextLexeme == undefined) {
    parser.nextClause();
    return
  }

  switch (nextLexeme.type) {
    case lunr.QueryLexer.TERM:
      parser.nextClause();
      return lunr.QueryParser.parseTerm
    case lunr.QueryLexer.FIELD:
      parser.nextClause();
      return lunr.QueryParser.parseField
    case lunr.QueryLexer.EDIT_DISTANCE:
      return lunr.QueryParser.parseEditDistance
    case lunr.QueryLexer.BOOST:
      return lunr.QueryParser.parseBoost
    case lunr.QueryLexer.PRESENCE:
      parser.nextClause();
      return lunr.QueryParser.parsePresence
    default:
      var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
      throw new lunr.QueryParseError (errorMessage, nextLexeme.start, nextLexeme.end)
  }
}

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory();
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }));
})();
});

class LevelIndex {
    constructor(baseURL, levels) {
        this.mapCache = new Map();
        this.baseURL = baseURL;
        this.levels = levels;
        const searchLevels = this.searchLevels = this.levels.map((text, i) => {
            const parts = text.split('/');
            return {
                id: i,
                full: text,
                path: parts[parts.length - 2],
                name: parts[parts.length - 1]
            };
        });
        this.index = lunr(function () {
            this.field('name', { boost: 2 });
            this.field('path', { boost: 1 });
            searchLevels.forEach(searchableLevel => this.add(searchableLevel));
        });
    }
    async levelData(name) {
        let data = this.mapCache.get(name);
        if (data) {
            return data;
        }
        data = await (await fetch(this.baseURL + '/' + name)).arrayBuffer();
        this.mapCache.set(name, data);
        return data;
    }
    search(text) {
        return this.index.search(text).map(searchResult => this.searchLevels[parseInt(searchResult.ref, 10)]);
    }
}

const DefaultPools = new Map([
    [
        "all",
        [
            "hellhole/#139#.LEV",
            "hellhole/1FORT.LEV",
            "hellhole/22.lev",
            "hellhole/4bases.lev",
            "hellhole/AHHHHHH.LEV",
            "hellhole/ARMORED BUNKER.LEV",
            "hellhole/Amasing.lev",
            "hellhole/AntStack.lev",
            "hellhole/Ants.lev",
            "hellhole/Area 51.lev",
            "hellhole/Arena_1.lev",
            "hellhole/ArjenRoc.lev",
            "hellhole/Artic.lev",
            "hellhole/Artillary.lev",
            "hellhole/BATTLE F.LEV",
            "hellhole/BGRock2.lev",
            "hellhole/BLUE 2.LEV",
            "hellhole/BOAT.LEV",
            "hellhole/BOOMERAN.LEV",
            "hellhole/BOOM_1.lev",
            "hellhole/Battleground.lev",
            "hellhole/Blink.lev",
            "hellhole/BlowAway.lev",
            "hellhole/Bone Yard.lev",
            "hellhole/Bot.lev",
            "hellhole/Bridge of Quai.lev",
            "hellhole/CHAOS II.LEV",
            "hellhole/CITY_2.LEV",
            "hellhole/CLONESWR.LEV",
            "hellhole/COMMAND.LEV",
            "hellhole/CRASH.LEV",
            "hellhole/CTFArena.lev",
            "hellhole/Cave_1.lev",
            "hellhole/Cavern.lev",
            "hellhole/Chicken Coop.lev",
            "hellhole/Chip N Dale 1.lev",
            "hellhole/Circulate.lev",
            "hellhole/City_1.lev",
            "hellhole/Clime.lev",
            "hellhole/CommSat1.lev",
            "hellhole/Corey's1st.lev",
            "hellhole/Corey's2nd.lev",
            "hellhole/Court.lev",
            "hellhole/Crash Zone.lev",
            "hellhole/Crater.lev",
            "hellhole/Cross.lev",
            "hellhole/DM - Morpheus.lev",
            "hellhole/DYNO.LEV",
            "hellhole/Desert.lev",
            "hellhole/Dino.lev",
            "hellhole/Disney.lev",
            "hellhole/Egypt_1.lev",
            "hellhole/Egypt_2.lev",
            "hellhole/Elias4.lev",
            "hellhole/FUCKEMUP.LEV",
            "hellhole/FUN_1.LEV",
            "hellhole/Farm.lev",
            "hellhole/Field.lev",
            "hellhole/Fire.lev",
            "hellhole/Forest2.lev",
            "hellhole/Forest_1.lev",
            "hellhole/Fortress.lev",
            "hellhole/GOZONTAI.LEV",
            "hellhole/Galactic Death!.lev",
            "hellhole/Garden.lev",
            "hellhole/Garden_1.lev",
            "hellhole/Ghousthouse.lev",
            "hellhole/Giza.lev",
            "hellhole/Goddy.lev",
            "hellhole/Goku Worm.lev",
            "hellhole/Gollum.lev",
            "hellhole/H2O.lev",
            "hellhole/Haloween.lev",
            "hellhole/Hang gown towers.lev",
            "hellhole/Head.lev",
            "hellhole/Head_1.lev",
            "hellhole/Hitler.lev",
            "hellhole/Hus3.lev",
            "hellhole/ICE Rase.lev",
            "hellhole/Island War.lev",
            "hellhole/JUSSI133.LEV",
            "hellhole/KNAPPPPP.LEV",
            "hellhole/KNASIGGG.LEV",
            "hellhole/KOKKKKO.LEV",
            "hellhole/KillEm.lev",
            "hellhole/LAIR.LEV",
            "hellhole/LATMc.lev",
            "hellhole/LIAM.LEV",
            "hellhole/Labrinth.lev",
            "hellhole/Land-Ho.lev",
            "hellhole/Loadoff.lev",
            "hellhole/MArio Factory.lev",
            "hellhole/MGM1.LEV",
            "hellhole/MGM2.LEV",
            "hellhole/MGM3.LEV",
            "hellhole/MGM4.LEV",
            "hellhole/MGM5.LEV",
            "hellhole/MGM6.LEV",
            "hellhole/MIFFFFO.LEV",
            "hellhole/MUSEUM.lev",
            "hellhole/MYKKO.LEV",
            "hellhole/Metal.lev",
            "hellhole/Mission1.lev",
            "hellhole/Mission2.lev",
            "hellhole/Mission3.lev",
            "hellhole/Mission5.lev",
            "hellhole/Molehole.lev",
            "hellhole/Mujbojin.lev",
            "hellhole/N2O.lev",
            "hellhole/NR1.LEV",
            "hellhole/Nuketest.lev",
            "hellhole/OMEGA G.LEV",
            "hellhole/Office.lev",
            "hellhole/OneWay.lev",
            "hellhole/PATTERN.LEV",
            "hellhole/PILLBOXES.LEV",
            "hellhole/PKiNpow.lev",
            "hellhole/Paris burning.lev",
            "hellhole/Piss.lev",
            "hellhole/Platforms.lev",
            "hellhole/Puzzle.LEV",
            "hellhole/Pyromide.lev",
            "hellhole/RED2.LEV",
            "hellhole/REDLAND.LEV",
            "hellhole/RED_1.LEV",
            "hellhole/RV_city.lev",
            "hellhole/Ring.lev",
            "hellhole/RockTest.lev",
            "hellhole/Roomz.lev",
            "hellhole/S-Arena.lev",
            "hellhole/S.O.B.lev",
            "hellhole/SMILEEE.LEV",
            "hellhole/SNAKE_1.LEV",
            "hellhole/SNIPE.lev",
            "hellhole/SPECIAL.LEV",
            "hellhole/SPIRAL_1.LEV",
            "hellhole/STEE.LEV",
            "hellhole/STONEAGE.LEV",
            "hellhole/STONED.LEV",
            "hellhole/Shadowfax.lev",
            "hellhole/Shaft2.lev",
            "hellhole/Sky.lev",
            "hellhole/Slime.lev",
            "hellhole/Spiral.lev",
            "hellhole/StarNite.lev",
            "hellhole/Statue.lev",
            "hellhole/Stupido.lev",
            "hellhole/Surface.lev",
            "hellhole/TF.LEV",
            "hellhole/THEDRILL.LEV",
            "hellhole/TOMTOM.LEV",
            "hellhole/TORTELIN.LEV",
            "hellhole/TOURNEY.LEV",
            "hellhole/TREECOPY.LEV",
            "hellhole/TRYFFEL.LEV",
            "hellhole/Temple.lev",
            "hellhole/The Next D-Day.lev",
            "hellhole/Tower.lev",
            "hellhole/Trap Map!!!.lev",
            "hellhole/Trenches.lev",
            "hellhole/Turbo.lev",
            "hellhole/Turtle.lev",
            "hellhole/UFO.lev",
            "hellhole/UFO_1.LEV",
            "hellhole/UrLord.lev",
            "hellhole/VILDSVIN.LEV",
            "hellhole/VULKAAN.LEV",
            "hellhole/Vgen.lev",
            "hellhole/Volca.lev",
            "hellhole/Volcano_1.lev",
            "hellhole/VÄLGJORD.lev",
            "hellhole/WG.lev",
            "hellhole/WILD.LEV",
            "hellhole/WORMWARS.LEV",
            "hellhole/Warofworms.lev",
            "hellhole/Water2.lev",
            "hellhole/Whale.lev",
            "hellhole/WinWord.lev",
            "hellhole/Worlddom.lev",
            "hellhole/Worms.lev",
            "hellhole/Wrmfarm.lev",
            "hellhole/X-Mas.lev",
            "hellhole/X.lev",
            "hellhole/ZZ-2000.lev",
            "hellhole/ZanderZ.lev",
            "hellhole/a21.lev",
            "hellhole/aiTest.lev",
            "hellhole/alloutwar2.lev",
            "hellhole/arcorum.lev",
            "hellhole/areninha.lev",
            "hellhole/arina.lev",
            "hellhole/arina_1.lev",
            "hellhole/aswan.lev",
            "hellhole/beach.lev",
            "hellhole/big round fort.lev",
            "hellhole/big.lev",
            "hellhole/bird.lev",
            "hellhole/bloodcity2.lev",
            "hellhole/bloodycircus.lev",
            "hellhole/blowgoat.lev",
            "hellhole/bomb drop.lev",
            "hellhole/bomber roof.lev",
            "hellhole/boom.lev",
            "hellhole/boom2.lev",
            "hellhole/bunkers_2.lev",
            "hellhole/cacoonz.lev",
            "hellhole/cafe.lev",
            "hellhole/cave.lev",
            "hellhole/clans.lev",
            "hellhole/confusing.lev",
            "hellhole/cool_3.lev",
            "hellhole/coolbob.lev",
            "hellhole/coolbob1.lev",
            "hellhole/datkk.lev",
            "hellhole/doogsy.lev",
            "hellhole/dookie.lev",
            "hellhole/door to door war.lev",
            "hellhole/drknark.lev",
            "hellhole/estatua.lev",
            "hellhole/eyeball.lev",
            "hellhole/fargerik.lev",
            "hellhole/feting fett.lev",
            "hellhole/fight.lev",
            "hellhole/fiska.lev",
            "hellhole/fiskboll.lev",
            "hellhole/floors.lev",
            "hellhole/flyluft.lev",
            "hellhole/fork.lev",
            "hellhole/frog.lev",
            "hellhole/frontline.lev",
            "hellhole/fujita.lev",
            "hellhole/funnel.lev",
            "hellhole/funny.lev",
            "hellhole/getebo.lev",
            "hellhole/gorilla.lev",
            "hellhole/gubbs.lev",
            "hellhole/hangon.lev",
            "hellhole/hell.lev",
            "hellhole/highway.lev",
            "hellhole/house_1.lev",
            "hellhole/houses.lev",
            "hellhole/igo eh muito fei.lev",
            "hellhole/igor merda.lev",
            "hellhole/illusion.lev",
            "hellhole/karrrllls.lev",
            "hellhole/kego.lev",
            "hellhole/kenny.lev",
            "hellhole/kettle.lev",
            "hellhole/kgivler1.lev",
            "hellhole/kgivler3.lev",
            "hellhole/kpack1.lev",
            "hellhole/kyle2.lev",
            "hellhole/kyle3.lev",
            "hellhole/labyrint2.lev",
            "hellhole/lamo.lev",
            "hellhole/larvalevel.lev",
            "hellhole/leliero.lev",
            "hellhole/liero500.lev",
            "hellhole/liero_war.lev",
            "hellhole/lieropower.lev",
            "hellhole/lingon.lev",
            "hellhole/medieval.lev",
            "hellhole/megarock.lev",
            "hellhole/mineplus.lev",
            "hellhole/missil2.lev",
            "hellhole/moonstreet.lev",
            "hellhole/mountain.lev",
            "hellhole/multiplicity.lev",
            "hellhole/mystic.lev",
            "hellhole/office_1.lev",
            "hellhole/oro2.lev",
            "hellhole/orofication.lev",
            "hellhole/pipeline.lev",
            "hellhole/pipes.lev",
            "hellhole/pot.lev",
            "hellhole/qmark.lev",
            "hellhole/quake3.lev",
            "hellhole/rcoaster.lev",
            "hellhole/reactor.lev",
            "hellhole/rektum.lev",
            "hellhole/rock.lev",
            "hellhole/rocket.lev",
            "hellhole/rompe.lev",
            "hellhole/round fort.lev",
            "hellhole/rudi.lev",
            "hellhole/scene3.lev",
            "hellhole/screen3.lev",
            "hellhole/sections.lev",
            "hellhole/sheep_1.lev",
            "hellhole/sign.lev",
            "hellhole/skelett.lev",
            "hellhole/skelett_1.lev",
            "hellhole/slide.lev",
            "hellhole/slop.lev",
            "hellhole/slot.lev",
            "hellhole/slottet.lev",
            "hellhole/space_1.lev",
            "hellhole/spike_1.lev",
            "hellhole/stalin.lev",
            "hellhole/starscape.lev",
            "hellhole/station.lev",
            "hellhole/tank.lev",
            "hellhole/tetris.lev",
            "hellhole/time.lev",
            "hellhole/tokara.lev",
            "hellhole/towers.lev",
            "hellhole/trees.lev",
            "hellhole/trench.lev",
            "hellhole/trench_2.lev",
            "hellhole/tunnel_2.lev",
            "hellhole/tunnels_1.lev",
            "hellhole/uoyt.lev",
            "hellhole/viipuri3.lev",
            "hellhole/volcano.lev",
            "hellhole/volcano_2.lev",
            "hellhole/vrak.lev",
            "hellhole/vulcano.lev",
            "hellhole/vulgo.lev",
            "hellhole/warzone2.lev",
            "hellhole/woods.lev",
            "hellhole/words.lev",
            "hellhole/wormstne.lev",
            "hellhole/cavecastles.lev",
            "hellhole/1sttrolsaone.lev",
            "hellhole/666.lev",
            "hellhole/8xwhell.lev",
            "hellhole/ARENA4.LEV",
            "hellhole/Ak.lev",
            "hellhole/Arena911.lev",
            "hellhole/Arena_2.lev",
            "hellhole/BALL.lev",
            "hellhole/Battle-field.lev",
            "hellhole/Bowsers Cave.lev",
            "hellhole/CLIFF.LEV",
            "hellhole/CTF-Facing Worlds.lev",
            "hellhole/CTF.lev",
            "hellhole/Cheesewarz.lev",
            "hellhole/Crecent.lev",
            "hellhole/DM - Phobos Moon.lev",
            "hellhole/DOMETRY.LEV",
            "hellhole/Dome.lev",
            "hellhole/Eclipse.lev",
            "hellhole/FORTRESS_1.LEV",
            "hellhole/Field_1.lev",
            "hellhole/Fly3.lev",
            "hellhole/Guardian.lev",
            "hellhole/Hell_1.lev",
            "hellhole/Ledge.lev",
            "hellhole/Lines.lev",
            "hellhole/MeltDown.lev",
            "hellhole/Open level.lev",
            "hellhole/Playgrou.lev",
            "hellhole/Q3arena1.lev",
            "hellhole/RADIAL.LEV",
            "hellhole/Roper.lev",
            "hellhole/SKELBASE.LEV",
            "hellhole/Seven Dragonballs.lev",
            "hellhole/Smiley.lev",
            "hellhole/Sone Zeta.lev",
            "hellhole/StarBurst.lev",
            "hellhole/Temple2.lev",
            "hellhole/Thewell.lev",
            "hellhole/Tube.lev",
            "hellhole/Underground.lev",
            "hellhole/blank.lev",
            "hellhole/blink_1.lev",
            "hellhole/blob.lev",
            "hellhole/blood.lev",
            "hellhole/brokan.lev",
            "hellhole/bunkers.lev",
            "hellhole/cruiser.lev",
            "hellhole/desrtsun.lev",
            "hellhole/drains.lev",
            "hellhole/dropzone_1.lev",
            "hellhole/dtunnel.lev",
            "hellhole/duelroom1.lev",
            "hellhole/eif.lev",
            "hellhole/fara.lev",
            "hellhole/fmfriend.lev",
            "hellhole/fro.lev",
            "hellhole/gooya.lev",
            "hellhole/graves.lev",
            "hellhole/guns.lev",
            "hellhole/hearcia.lev",
            "hellhole/idiota.lev",
            "hellhole/joltjord.lev",
            "hellhole/kaj.lev",
            "hellhole/l_turbo.lev",
            "hellhole/ladofdef_1.lev",
            "hellhole/mushroom.lev",
            "hellhole/n3.lev",
            "hellhole/nails12.lev",
            "hellhole/ohshit.lev",
            "hellhole/pool.lev",
            "hellhole/pretzel.lev",
            "hellhole/ramp.lev",
            "hellhole/rubble.lev",
            "hellhole/shapeup.lev",
            "hellhole/sheep.lev",
            "hellhole/shotgun.lev",
            "hellhole/shrine.lev",
            "hellhole/simples.lev",
            "hellhole/snowdev.lev",
            "hellhole/spike.lev",
            "hellhole/team-death.lev",
            "hellhole/towers_2.lev",
            "hellhole/yums.lev",
            "hellhole/2Forts.lev",
            "hellhole/5pipe.lev",
            "hellhole/ANT HILL.LEV",
            "hellhole/ANTS1.LEV",
            "hellhole/Afterlife.lev",
            "hellhole/AirForce.lev",
            "hellhole/Alley.lev",
            "hellhole/Area51.lev",
            "hellhole/Assault.lev",
            "hellhole/BGrock.lev",
            "hellhole/BIN LADE.LEV",
            "hellhole/BOMBARD.LEV",
            "hellhole/BORDOM.LEV",
            "hellhole/BOWSERPL.LEV",
            "hellhole/BellCity.lev",
            "hellhole/BellFun.lev",
            "hellhole/Big X.lev",
            "hellhole/BigCity.lev",
            "hellhole/Bizzare.lev",
            "hellhole/Blades Liero Resort.lev",
            "hellhole/Bubbles.lev",
            "hellhole/Building.lev",
            "hellhole/CS HardCore.lev",
            "hellhole/CTF - Red October.lev",
            "hellhole/Carvings.LEV",
            "hellhole/CastV2.lev",
            "hellhole/Castle2.lev",
            "hellhole/Chook Arena.lev",
            "hellhole/Chump.lev",
            "hellhole/City Assualt.lev",
            "hellhole/Computer.lev",
            "hellhole/D-day.lev",
            "hellhole/D11base.lev",
            "hellhole/Dog.lev",
            "hellhole/FREE.LEV",
            "hellhole/FURUKEL.LEV",
            "hellhole/Flojo.lev",
            "hellhole/Follow the White Rabbit.lev",
            "hellhole/Fort1.lev",
            "hellhole/Fortress_2.lev",
            "hellhole/GMT3beta32.lev",
            "hellhole/GreyUFO.lev",
            "hellhole/HiddenCove.lev",
            "hellhole/Hive.lev",
            "hellhole/House.lev",
            "hellhole/IMLOST.LEV",
            "hellhole/JANNU.LEV",
            "hellhole/JANNU133.LEV",
            "hellhole/JUSSI999.LEV",
            "hellhole/Jee.lev",
            "hellhole/Krig.lev",
            "hellhole/LAB!.lev",
            "hellhole/LABRATH.LEV",
            "hellhole/Leaking.lev",
            "hellhole/Lightning volcano.lev",
            "hellhole/Lines_1.lev",
            "hellhole/Lost.lev",
            "hellhole/MY HOUSES.LEV",
            "hellhole/MarioLnd.lev",
            "hellhole/Maze2.lev",
            "hellhole/Maze_1.lev",
            "hellhole/Maze_2.lev",
            "hellhole/Mission.lev",
            "hellhole/Nukecore.lev",
            "hellhole/PERFECT.LEV",
            "hellhole/PaakALLO.LEV",
            "hellhole/Phantosams castle.lev",
            "hellhole/Port.lev",
            "hellhole/ROCKDUDE.LEV",
            "hellhole/Rescue thoos hostage.lev",
            "hellhole/Roburky1.lev",
            "hellhole/RockCity.lev",
            "hellhole/Rock_1.lev",
            "hellhole/S.LEV",
            "hellhole/Snow.lev",
            "hellhole/Street.lev",
            "hellhole/Stripes.lev",
            "hellhole/TOXIC.LEV",
            "hellhole/TRICKYCL.LEV",
            "hellhole/TUNNELS_2.lev",
            "hellhole/TechnoForts.lev",
            "hellhole/TerriostScum.lev",
            "hellhole/TheCave.lev",
            "hellhole/Tiger's Warzone.lev",
            "hellhole/TooMuch.lev",
            "hellhole/Train.lev",
            "hellhole/Training.lev",
            "hellhole/Transit.lev",
            "hellhole/UA-PARK.LEV",
            "hellhole/UA-STREETS.LEV",
            "hellhole/UH OH OH.LEV",
            "hellhole/VAINU.LEV",
            "hellhole/VILLE.LEV",
            "hellhole/Vault city.LEV",
            "hellhole/Volcano_3.lev",
            "hellhole/Water System.lev",
            "hellhole/X-treme Forts.lev",
            "hellhole/Xvz.lev",
            "hellhole/aaa.lev",
            "hellhole/aftermath.lev",
            "hellhole/bloodprk.lev",
            "hellhole/bones.lev",
            "hellhole/boxwar.lev",
            "hellhole/butterfly.lev",
            "hellhole/casino final.lev",
            "hellhole/castle.lev",
            "hellhole/castle_4.lev",
            "hellhole/caves of doom.lev",
            "hellhole/cells.lev",
            "hellhole/conduit.lev",
            "hellhole/contruction.lev",
            "hellhole/cool.lev",
            "hellhole/dcastle.lev",
            "hellhole/deck18.lev",
            "hellhole/derek1.lev",
            "hellhole/derek2.lev",
            "hellhole/destroy2.lev",
            "hellhole/doublebase.lev",
            "hellhole/dump.lev",
            "hellhole/dump2.lev",
            "hellhole/fools.lev",
            "hellhole/gigaworm.lev",
            "hellhole/heaven.lev",
            "hellhole/hell_2.lev",
            "hellhole/hubba.lev",
            "hellhole/kgivler4.lev",
            "hellhole/kgivler6.lev",
            "hellhole/kors.lev",
            "hellhole/kyle4.lev",
            "hellhole/little town.lev",
            "hellhole/oneside.lev",
            "hellhole/onlyoneway.lev",
            "hellhole/rally.lev",
            "hellhole/redmonster.lev",
            "hellhole/redrock.lev",
            "hellhole/scuba.lev",
            "hellhole/silo attack.lev",
            "hellhole/snigel.lev",
            "hellhole/sokkelo.lev",
            "hellhole/spacestation.lev",
            "hellhole/spring.lev",
            "hellhole/tower_1.lev",
            "hellhole/towerwar.lev",
            "hellhole/tri fort.lev",
            "hellhole/two buildings.lev",
            "hellhole/u96.lev",
            "hellhole/war.lev",
            "hellhole/AirCastleZ.lev",
            "hellhole/Lost Base.lev",
            "hellhole/Mines.lev",
            "hellhole/fun.lev",
            "hellhole/2Ninjas.lev",
            "hellhole/BALTIC.lev",
            "hellhole/BEAM2.LEV",
            "hellhole/BUNKERS_1.LEV",
            "hellhole/BUNKRY.LEV",
            "hellhole/Cross Walls.lev",
            "hellhole/Curves.lev",
            "hellhole/DEADLYFL.LEV",
            "hellhole/DEATH BO.LEV",
            "hellhole/DIAMOND.LEV",
            "hellhole/DM-1.lev",
            "hellhole/Damned.lev",
            "hellhole/Dzuma.lev",
            "hellhole/Elegant.lev",
            "hellhole/Ice cave.lev",
            "hellhole/Kewk.lev",
            "hellhole/Kitchen.lev",
            "hellhole/Line.lev",
            "hellhole/MAZEOFDTH.lev",
            "hellhole/Passage.lev",
            "hellhole/Q3basin.lev",
            "hellhole/ROCK1.LEV",
            "hellhole/RUSH.LEV",
            "hellhole/TEMPLE_1.LEV",
            "hellhole/Tightwad.lev",
            "hellhole/VermisPit.lev",
            "hellhole/ZIMM.LEV",
            "hellhole/Zeppelin.lev",
            "hellhole/arena.lev",
            "hellhole/blastpit.lev",
            "hellhole/bunnycat.lev",
            "hellhole/cathode2.lev",
            "hellhole/crazy_1.lev",
            "hellhole/death.lev",
            "hellhole/diagonal.lev",
            "hellhole/dojo.lev",
            "hellhole/dotty.lev",
            "hellhole/finlfigt.lev",
            "hellhole/flyndie.lev",
            "hellhole/handz.lev",
            "hellhole/hardwrld.lev",
            "hellhole/hill.lev",
            "hellhole/hvymetal.lev",
            "hellhole/jumpbase.lev",
            "hellhole/jungle2.lev",
            "hellhole/kickass.lev",
            "hellhole/king.lev",
            "hellhole/nav_dm.lev",
            "hellhole/nike.lev",
            "hellhole/openjump.lev",
            "hellhole/quake2.lev",
            "hellhole/teraz3.lev",
            "hellhole/thorn.lev",
            "hellhole/walls.lev",
            "hellhole/war_1.lev",
            "hellhole/wcav.lev",
            "hellhole/zimmarea.lev",
            "hellhole/$MUMEY$.LEV",
            "hellhole/007.lev",
            "hellhole/2BASES.LEV",
            "hellhole/@AT@.LEV",
            "hellhole/Ak22.lev",
            "hellhole/BATTLEDM.LEV",
            "hellhole/BIGHOUSE.LEV",
            "hellhole/Block.lev",
            "hellhole/CASTLE_1.LEV",
            "hellhole/CTFArena_1.lev",
            "hellhole/CVICISTE.LEV",
            "hellhole/Carnival.lev",
            "hellhole/Chaos I.LEV",
            "hellhole/Church.lev",
            "hellhole/City.lev",
            "hellhole/Commando.lev",
            "hellhole/DIRTFACT.LEV",
            "hellhole/DIRTHOLE.LEV",
            "hellhole/Elevate.lev",
            "hellhole/FORTFAN.LEV",
            "hellhole/Fallout.lev",
            "hellhole/Fight Eyes.lev",
            "hellhole/Forest.lev",
            "hellhole/GreyFort.lev",
            "hellhole/HELLRAIN.LEV",
            "hellhole/Haunted.lev",
            "hellhole/HighRock.lev",
            "hellhole/Hotel 2.lev",
            "hellhole/Hotel.lev",
            "hellhole/Hq.lev",
            "hellhole/Ice Station.lev",
            "hellhole/Interlierobattles.lev",
            "hellhole/JIPEE.LEV",
            "hellhole/JUSSI2.LEV",
            "hellhole/Jnglenight.lev",
            "hellhole/JoeMac.lev",
            "hellhole/Joes2.lev",
            "hellhole/KUBLA.LEV",
            "hellhole/LEVaYTYS.LEV",
            "hellhole/Light.lev",
            "hellhole/MarcMaze.lev",
            "hellhole/Metro.lev",
            "hellhole/Mine.lev",
            "hellhole/Missile.lev",
            "hellhole/Mission6.lev",
            "hellhole/Mob.lev",
            "hellhole/Mofoc2.lev",
            "hellhole/MoonTown.lev",
            "hellhole/Moonbase.lev",
            "hellhole/Mountain_2.lev",
            "hellhole/Mt.Kewl.lev",
            "hellhole/NAABRID2.LEV",
            "hellhole/NUKESITE.lev",
            "hellhole/Neon.lev",
            "hellhole/Nfactory.lev",
            "hellhole/Nofly.lev",
            "hellhole/Paras2.lev",
            "hellhole/Pleasegod.lev",
            "hellhole/Q3arena2.lev",
            "hellhole/SPcsupp.lev",
            "hellhole/StarTown.lev",
            "hellhole/Supply depot.lev",
            "hellhole/TOWERS_1.LEV",
            "hellhole/The Base.lev",
            "hellhole/The D11-Base.lev",
            "hellhole/The arena.lev",
            "hellhole/ToraBora.lev",
            "hellhole/Training_1.lev",
            "hellhole/Tunnels.LEV",
            "hellhole/Twister.lev",
            "hellhole/UA-FORT.LEV",
            "hellhole/UA-METRO.LEV",
            "hellhole/VERSION.LEV",
            "hellhole/WW2.LEV",
            "hellhole/WWI.lev",
            "hellhole/Warehaus.lev",
            "hellhole/Warforts.lev",
            "hellhole/Wormhouse.lev",
            "hellhole/adelanto.lev",
            "hellhole/base1.lev",
            "hellhole/building_3.lev",
            "hellhole/castle2_1.lev",
            "hellhole/castle_2.lev",
            "hellhole/castle_3.lev",
            "hellhole/castlez.lev",
            "hellhole/cow.lev",
            "hellhole/crazy.lev",
            "hellhole/downtown.lev",
            "hellhole/esko.lev",
            "hellhole/gaper.lev",
            "hellhole/gard towers.lev",
            "hellhole/hornillo.lev",
            "hellhole/house2.lev",
            "hellhole/house_2.lev",
            "hellhole/impossbl.lev",
            "hellhole/jungle1.lev",
            "hellhole/keep.lev",
            "hellhole/kgivler2.lev",
            "hellhole/kgivler5.lev",
            "hellhole/klex.lev",
            "hellhole/lb_vulcn.lev",
            "hellhole/led.lev",
            "hellhole/lego.lev",
            "hellhole/lift.lev",
            "hellhole/mine_1.lev",
            "hellhole/mining.lev",
            "hellhole/misile.lev",
            "hellhole/mount ki.lev",
            "hellhole/munchoz.lev",
            "hellhole/neighbours.lev",
            "hellhole/oilraft.lev",
            "hellhole/place.lev",
            "hellhole/planetz.lev",
            "hellhole/podzemi.lev",
            "hellhole/prison.lev",
            "hellhole/psycho.lev",
            "hellhole/raid.lev",
            "hellhole/rebels.lev",
            "hellhole/rockar.lev",
            "hellhole/rockar3.lev",
            "hellhole/rooms.lev",
            "hellhole/scity.lev",
            "hellhole/scud.lev",
            "hellhole/serial.lev",
            "hellhole/sfactory.lev",
            "hellhole/shroomz.lev",
            "hellhole/splat.lev",
            "hellhole/storage.lev",
            "hellhole/stygg.lev",
            "hellhole/style.lev",
            "hellhole/sun.lev",
            "hellhole/takta.lev",
            "hellhole/treehaus.lev",
            "hellhole/tunnel.lev",
            "hellhole/tunnel_1.lev",
            "hellhole/ultrar.lev",
            "hellhole/ulvenstn.lev",
            "hellhole/war Bubbles of doom.lev",
            "hellhole/warfield.lev",
            "hellhole/weekyear.lev",
            "hellhole/winning cup.lev",
            "hellhole/winter.lev",
            "hellhole/winter_1.lev",
            "hellhole/wormatras.lev",
            "hellhole/1337.lev",
            "hellhole/2xcathode.lev",
            "hellhole/2xkross-s.lev",
            "hellhole/2zamki3.lev",
            "hellhole/6xwheel.lev",
            "hellhole/Agave.lev",
            "hellhole/Circling.lev",
            "hellhole/Fin.lev",
            "hellhole/Jump.lev",
            "hellhole/Kross3.lev",
            "hellhole/Kross4.lev",
            "hellhole/MyLevel2.lev",
            "hellhole/Owl.lev",
            "hellhole/RGB.LEV",
            "hellhole/RU.LEV",
            "hellhole/SNight.lev",
            "hellhole/Shelves.lev",
            "hellhole/Simple.lev",
            "hellhole/aqueducts.lev",
            "hellhole/canyon.lev",
            "hellhole/dethruw3.lev",
            "hellhole/egypt.lev",
            "hellhole/gears.lev",
            "hellhole/glasscup.lev",
            "hellhole/illyria.lev",
            "hellhole/kross31-s.lev",
            "hellhole/manson.lev",
            "hellhole/meander.lev",
            "hellhole/miazga.lev",
            "hellhole/navarona.lev",
            "hellhole/quickdef.lev",
            "hellhole/shadowr.lev",
            "hellhole/shayss.lev",
            "hellhole/stronghold.lev",
            "hellhole/tdk3.lev",
            "hellhole/tiger-s.lev",
            "hellhole/2worm4ya.lev",
            "hellhole/AfricanBonanza2.lev",
            "hellhole/Bunkier2.lev",
            "hellhole/COOL_1.LEV",
            "hellhole/Domes.lev",
            "hellhole/Dropzone.lev",
            "hellhole/DvDmanDT.lev",
            "hellhole/FORTISAR.LEV",
            "hellhole/Fort2.lev",
            "hellhole/LABRIN.LEV",
            "hellhole/Laardi2.lev",
            "hellhole/Labra.lev",
            "hellhole/LodeRun.LEV",
            "hellhole/LodeRun2.lev",
            "hellhole/Mountain_1.lev",
            "hellhole/MyLevel1.lev",
            "hellhole/MyLevel3.lev",
            "hellhole/Nfuel.lev",
            "hellhole/ROCKBASE.LEV",
            "hellhole/Ramm.lev",
            "hellhole/RealTime.lev",
            "hellhole/ST-1.lev",
            "hellhole/TheMine.lev",
            "hellhole/Warfare.lev",
            "hellhole/albatros.lev",
            "hellhole/amplify.lev",
            "hellhole/crazy_2.lev",
            "hellhole/face.lev",
            "hellhole/flame.lev",
            "hellhole/forrest.lev",
            "hellhole/galleon.lev",
            "hellhole/holy.lev",
            "hellhole/kulon-q8.lev",
            "hellhole/labyrint.lev",
            "hellhole/lavina.lev",
            "hellhole/lvl0003.lev",
            "hellhole/marocko6.lev",
            "hellhole/mega.lev",
            "hellhole/park8.lev",
            "hellhole/planetx.lev",
            "hellhole/qaverns.lev",
            "hellhole/rainyday.lev",
            "hellhole/serpent.lev",
            "hellhole/sludgestastion.lev",
            "hellhole/spikcavn.lev",
            "hellhole/tunnel2.lev",
            "hellhole/warloops.lev",
            "hellhole/warzone.lev",
            "hellhole/Bridge.lev",
            "hellhole/CHAOSI~T.LEV",
            "hellhole/2xkross2.lev",
            "hellhole/4squares.lev",
            "hellhole/Cathode_1.lev",
            "hellhole/Cheese.lev",
            "hellhole/DUEL.LEV",
            "hellhole/HUSK.LEV",
            "hellhole/INDIA2.LEV",
            "hellhole/Likwid.lev",
            "hellhole/MITH.lev",
            "hellhole/Memory.lev",
            "hellhole/Owl-2.lev",
            "hellhole/Owl-3.lev",
            "hellhole/Saloon.lev",
            "hellhole/Sancti.lev",
            "hellhole/Simple2.lev",
            "hellhole/TEMPLE27.LEV",
            "hellhole/angel.lev",
            "hellhole/arena711.lev",
            "hellhole/arkham.lev",
            "hellhole/atr.lev",
            "hellhole/badger.lev",
            "hellhole/bj4wilq.lev",
            "hellhole/cathode.lev",
            "hellhole/deathruw.lev",
            "hellhole/fallout2.lev",
            "hellhole/ghostrider_platforms.lev",
            "hellhole/izbla.lev",
            "hellhole/panther-s.lev",
            "hellhole/pokol2.lev",
            "hellhole/pyramid_1.lev",
            "hellhole/qflight.lev",
            "hellhole/tune-l.lev",
            "hellhole/unite.lev",
            "hellhole/BATTLEGR.LEV",
            "hellhole/SMB.lev",
            "hellhole/THE HUNTERS.lev",
            "hellhole/TOWER_2.LEV",
            "hellhole/Tomb.lev",
            "hellhole/baricade.lev",
            "hellhole/building_2.lev",
            "hellhole/circles.lev",
            "hellhole/lb_cmplx.lev",
            "hellhole/lb_infst.lev",
            "hellhole/lvl0005.lev",
            "hellhole/osamabase.lev",
            "hellhole/phobos.lev",
            "hellhole/qmark_1.lev",
            "hellhole/the cave.lev",
            "hellhole/tunnel2_1.lev",
            "hellhole/wormhole_1.lev",
            "hellhole/bloody.lev",
            "hellhole/Qrampage.lev"
        ]
    ],
    [
        "allBest",
        [
            "hellhole/2xkross2.lev",
            "hellhole/4squares.lev",
            "hellhole/Cathode_1.lev",
            "hellhole/Cheese.lev",
            "hellhole/DUEL.LEV",
            "hellhole/HUSK.LEV",
            "hellhole/INDIA2.LEV",
            "hellhole/Likwid.lev",
            "hellhole/MITH.lev",
            "hellhole/Memory.lev",
            "hellhole/Owl-2.lev",
            "hellhole/Owl-3.lev",
            "hellhole/Saloon.lev",
            "hellhole/Sancti.lev",
            "hellhole/Simple2.lev",
            "hellhole/TEMPLE27.LEV",
            "hellhole/angel.lev",
            "hellhole/arena711.lev",
            "hellhole/arkham.lev",
            "hellhole/atr.lev",
            "hellhole/badger.lev",
            "hellhole/bj4wilq.lev",
            "hellhole/cathode.lev",
            "hellhole/deathruw.lev",
            "hellhole/fallout2.lev",
            "hellhole/ghostrider_platforms.lev",
            "hellhole/izbla.lev",
            "hellhole/panther-s.lev",
            "hellhole/pokol2.lev",
            "hellhole/pyramid_1.lev",
            "hellhole/qflight.lev",
            "hellhole/tune-l.lev",
            "hellhole/unite.lev",
            "hellhole/BATTLEGR.LEV",
            "hellhole/SMB.lev",
            "hellhole/THE HUNTERS.lev",
            "hellhole/TOWER_2.LEV",
            "hellhole/Tomb.lev",
            "hellhole/baricade.lev",
            "hellhole/building_2.lev",
            "hellhole/circles.lev",
            "hellhole/lb_cmplx.lev",
            "hellhole/lb_infst.lev",
            "hellhole/lvl0005.lev",
            "hellhole/osamabase.lev",
            "hellhole/phobos.lev",
            "hellhole/qmark_1.lev",
            "hellhole/the cave.lev",
            "hellhole/tunnel2_1.lev",
            "hellhole/wormhole_1.lev",
            "hellhole/bloody.lev",
            "hellhole/Qrampage.lev"
        ]
    ],
    [
        "arenasBest",
        [
            "hellhole/2xkross2.lev",
            "hellhole/4squares.lev",
            "hellhole/Cathode_1.lev",
            "hellhole/Cheese.lev",
            "hellhole/DUEL.LEV",
            "hellhole/HUSK.LEV",
            "hellhole/INDIA2.LEV",
            "hellhole/Likwid.lev",
            "hellhole/MITH.lev",
            "hellhole/Memory.lev",
            "hellhole/Owl-2.lev",
            "hellhole/Owl-3.lev",
            "hellhole/Saloon.lev",
            "hellhole/Sancti.lev",
            "hellhole/Simple2.lev",
            "hellhole/TEMPLE27.LEV",
            "hellhole/angel.lev",
            "hellhole/arena711.lev",
            "hellhole/arkham.lev",
            "hellhole/atr.lev",
            "hellhole/badger.lev",
            "hellhole/bj4wilq.lev",
            "hellhole/cathode.lev",
            "hellhole/deathruw.lev",
            "hellhole/fallout2.lev",
            "hellhole/ghostrider_platforms.lev",
            "hellhole/izbla.lev",
            "hellhole/panther-s.lev",
            "hellhole/pokol2.lev",
            "hellhole/pyramid_1.lev",
            "hellhole/qflight.lev",
            "hellhole/tune-l.lev",
            "hellhole/unite.lev"
        ]
    ],
    [
        "arenasGood",
        [
            "hellhole/1337.lev",
            "hellhole/2xcathode.lev",
            "hellhole/2xkross-s.lev",
            "hellhole/2zamki3.lev",
            "hellhole/6xwheel.lev",
            "hellhole/Agave.lev",
            "hellhole/Circling.lev",
            "hellhole/Fin.lev",
            "hellhole/Jump.lev",
            "hellhole/Kross3.lev",
            "hellhole/Kross4.lev",
            "hellhole/MyLevel2.lev",
            "hellhole/Owl.lev",
            "hellhole/RGB.LEV",
            "hellhole/RU.LEV",
            "hellhole/SNight.lev",
            "hellhole/Shelves.lev",
            "hellhole/Simple.lev",
            "hellhole/aqueducts.lev",
            "hellhole/dethruw3.lev",
            "hellhole/egypt.lev",
            "hellhole/gears.lev",
            "hellhole/glasscup.lev",
            "hellhole/kross31-s.lev",
            "hellhole/manson.lev",
            "hellhole/meander.lev",
            "hellhole/miazga.lev",
            "hellhole/navarona.lev",
            "hellhole/quickdef.lev",
            "hellhole/shadowr.lev",
            "hellhole/shayss.lev",
            "hellhole/stronghold.lev",
            "hellhole/tdk3.lev",
            "hellhole/tiger-s.lev",
            "hellhole/2xkross2.lev",
            "hellhole/4squares.lev",
            "hellhole/Cathode_1.lev",
            "hellhole/Cheese.lev",
            "hellhole/DUEL.LEV",
            "hellhole/HUSK.LEV",
            "hellhole/INDIA2.LEV",
            "hellhole/Likwid.lev",
            "hellhole/MITH.lev",
            "hellhole/Memory.lev",
            "hellhole/Owl-2.lev",
            "hellhole/Owl-3.lev",
            "hellhole/Saloon.lev",
            "hellhole/Sancti.lev",
            "hellhole/Simple2.lev",
            "hellhole/TEMPLE27.LEV",
            "hellhole/angel.lev",
            "hellhole/arena711.lev",
            "hellhole/arkham.lev",
            "hellhole/atr.lev",
            "hellhole/badger.lev",
            "hellhole/bj4wilq.lev",
            "hellhole/cathode.lev",
            "hellhole/deathruw.lev",
            "hellhole/fallout2.lev",
            "hellhole/ghostrider_platforms.lev",
            "hellhole/izbla.lev",
            "hellhole/panther-s.lev",
            "hellhole/pokol2.lev",
            "hellhole/pyramid_1.lev",
            "hellhole/qflight.lev",
            "hellhole/tune-l.lev",
            "hellhole/unite.lev"
        ]
    ],
    [
        "arenasOk",
        [
            "hellhole/2Ninjas.lev",
            "hellhole/BALTIC.lev",
            "hellhole/BEAM2.LEV",
            "hellhole/BUNKERS_1.LEV",
            "hellhole/BUNKRY.LEV",
            "hellhole/Cross Walls.lev",
            "hellhole/Curves.lev",
            "hellhole/DEADLYFL.LEV",
            "hellhole/DEATH BO.LEV",
            "hellhole/DIAMOND.LEV",
            "hellhole/DM-1.lev",
            "hellhole/Damned.lev",
            "hellhole/Dzuma.lev",
            "hellhole/Ice cave.lev",
            "hellhole/Kewk.lev",
            "hellhole/Kitchen.lev",
            "hellhole/Line.lev",
            "hellhole/MAZEOFDTH.lev",
            "hellhole/Passage.lev",
            "hellhole/Q3basin.lev",
            "hellhole/ROCK1.LEV",
            "hellhole/RUSH.LEV",
            "hellhole/TEMPLE_1.LEV",
            "hellhole/Tightwad.lev",
            "hellhole/VermisPit.lev",
            "hellhole/ZIMM.LEV",
            "hellhole/Zeppelin.lev",
            "hellhole/arena.lev",
            "hellhole/blastpit.lev",
            "hellhole/bunnycat.lev",
            "hellhole/cathode2.lev",
            "hellhole/crazy_1.lev",
            "hellhole/death.lev",
            "hellhole/diagonal.lev",
            "hellhole/dojo.lev",
            "hellhole/dotty.lev",
            "hellhole/finlfigt.lev",
            "hellhole/flyndie.lev",
            "hellhole/handz.lev",
            "hellhole/hardwrld.lev",
            "hellhole/hill.lev",
            "hellhole/hvymetal.lev",
            "hellhole/jumpbase.lev",
            "hellhole/jungle2.lev",
            "hellhole/kickass.lev",
            "hellhole/king.lev",
            "hellhole/nav_dm.lev",
            "hellhole/nike.lev",
            "hellhole/openjump.lev",
            "hellhole/quake2.lev",
            "hellhole/teraz3.lev",
            "hellhole/thorn.lev",
            "hellhole/walls.lev",
            "hellhole/war_1.lev",
            "hellhole/wcav.lev",
            "hellhole/zimmarea.lev",
            "hellhole/Q3arena2.lev",
            "hellhole/1337.lev",
            "hellhole/2xcathode.lev",
            "hellhole/2xkross-s.lev",
            "hellhole/2zamki3.lev",
            "hellhole/6xwheel.lev",
            "hellhole/Agave.lev",
            "hellhole/Circling.lev",
            "hellhole/Fin.lev",
            "hellhole/Jump.lev",
            "hellhole/Kross3.lev",
            "hellhole/Kross4.lev",
            "hellhole/MyLevel2.lev",
            "hellhole/Owl.lev",
            "hellhole/RGB.LEV",
            "hellhole/RU.LEV",
            "hellhole/SNight.lev",
            "hellhole/Shelves.lev",
            "hellhole/Simple.lev",
            "hellhole/aqueducts.lev",
            "hellhole/dethruw3.lev",
            "hellhole/egypt.lev",
            "hellhole/gears.lev",
            "hellhole/glasscup.lev",
            "hellhole/kross31-s.lev",
            "hellhole/manson.lev",
            "hellhole/meander.lev",
            "hellhole/miazga.lev",
            "hellhole/navarona.lev",
            "hellhole/quickdef.lev",
            "hellhole/shadowr.lev",
            "hellhole/shayss.lev",
            "hellhole/stronghold.lev",
            "hellhole/tdk3.lev",
            "hellhole/tiger-s.lev",
            "hellhole/2xkross2.lev",
            "hellhole/4squares.lev",
            "hellhole/Cathode_1.lev",
            "hellhole/Cheese.lev",
            "hellhole/DUEL.LEV",
            "hellhole/HUSK.LEV",
            "hellhole/INDIA2.LEV",
            "hellhole/Likwid.lev",
            "hellhole/MITH.lev",
            "hellhole/Memory.lev",
            "hellhole/Owl-2.lev",
            "hellhole/Owl-3.lev",
            "hellhole/Saloon.lev",
            "hellhole/Sancti.lev",
            "hellhole/Simple2.lev",
            "hellhole/TEMPLE27.LEV",
            "hellhole/angel.lev",
            "hellhole/arena711.lev",
            "hellhole/arkham.lev",
            "hellhole/atr.lev",
            "hellhole/badger.lev",
            "hellhole/bj4wilq.lev",
            "hellhole/cathode.lev",
            "hellhole/deathruw.lev",
            "hellhole/fallout2.lev",
            "hellhole/ghostrider_platforms.lev",
            "hellhole/izbla.lev",
            "hellhole/panther-s.lev",
            "hellhole/pokol2.lev",
            "hellhole/pyramid_1.lev",
            "hellhole/qflight.lev",
            "hellhole/tune-l.lev",
            "hellhole/unite.lev"
        ]
    ],
    [
        "arenas",
        [
            "hellhole/cavecastles.lev",
            "hellhole/1sttrolsaone.lev",
            "hellhole/666.lev",
            "hellhole/8xwhell.lev",
            "hellhole/ARENA4.LEV",
            "hellhole/Ak.lev",
            "hellhole/Arena911.lev",
            "hellhole/Arena_2.lev",
            "hellhole/BALL.lev",
            "hellhole/Battle-field.lev",
            "hellhole/Bowsers Cave.lev",
            "hellhole/CLIFF.LEV",
            "hellhole/CTF-Facing Worlds.lev",
            "hellhole/CTF.lev",
            "hellhole/Cheesewarz.lev",
            "hellhole/Crecent.lev",
            "hellhole/DM - Phobos Moon.lev",
            "hellhole/DOMETRY.LEV",
            "hellhole/Dome.lev",
            "hellhole/Eclipse.lev",
            "hellhole/FORTRESS_1.LEV",
            "hellhole/Field_1.lev",
            "hellhole/Fly3.lev",
            "hellhole/Guardian.lev",
            "hellhole/Hell_1.lev",
            "hellhole/Ledge.lev",
            "hellhole/Lines.lev",
            "hellhole/MeltDown.lev",
            "hellhole/Open level.lev",
            "hellhole/Playgrou.lev",
            "hellhole/Q3arena1.lev",
            "hellhole/RADIAL.LEV",
            "hellhole/Roper.lev",
            "hellhole/SKELBASE.LEV",
            "hellhole/Seven Dragonballs.lev",
            "hellhole/Smiley.lev",
            "hellhole/Sone Zeta.lev",
            "hellhole/StarBurst.lev",
            "hellhole/Temple2.lev",
            "hellhole/Thewell.lev",
            "hellhole/Tube.lev",
            "hellhole/Underground.lev",
            "hellhole/blank.lev",
            "hellhole/blink_1.lev",
            "hellhole/blob.lev",
            "hellhole/blood.lev",
            "hellhole/brokan.lev",
            "hellhole/bunkers.lev",
            "hellhole/cruiser.lev",
            "hellhole/desrtsun.lev",
            "hellhole/drains.lev",
            "hellhole/dropzone_1.lev",
            "hellhole/dtunnel.lev",
            "hellhole/duelroom1.lev",
            "hellhole/eif.lev",
            "hellhole/fara.lev",
            "hellhole/fmfriend.lev",
            "hellhole/fro.lev",
            "hellhole/gooya.lev",
            "hellhole/graves.lev",
            "hellhole/guns.lev",
            "hellhole/hearcia.lev",
            "hellhole/idiota.lev",
            "hellhole/joltjord.lev",
            "hellhole/kaj.lev",
            "hellhole/l_turbo.lev",
            "hellhole/ladofdef_1.lev",
            "hellhole/mushroom.lev",
            "hellhole/n3.lev",
            "hellhole/nails12.lev",
            "hellhole/ohshit.lev",
            "hellhole/pool.lev",
            "hellhole/pretzel.lev",
            "hellhole/ramp.lev",
            "hellhole/rubble.lev",
            "hellhole/shapeup.lev",
            "hellhole/sheep.lev",
            "hellhole/shotgun.lev",
            "hellhole/shrine.lev",
            "hellhole/simples.lev",
            "hellhole/snowdev.lev",
            "hellhole/spike.lev",
            "hellhole/team-death.lev",
            "hellhole/towers_2.lev",
            "hellhole/yums.lev",
            "hellhole/2Ninjas.lev",
            "hellhole/BALTIC.lev",
            "hellhole/BEAM2.LEV",
            "hellhole/BUNKERS_1.LEV",
            "hellhole/BUNKRY.LEV",
            "hellhole/Cross Walls.lev",
            "hellhole/Curves.lev",
            "hellhole/DEADLYFL.LEV",
            "hellhole/DEATH BO.LEV",
            "hellhole/DIAMOND.LEV",
            "hellhole/DM-1.lev",
            "hellhole/Damned.lev",
            "hellhole/Dzuma.lev",
            "hellhole/Ice cave.lev",
            "hellhole/Kewk.lev",
            "hellhole/Kitchen.lev",
            "hellhole/Line.lev",
            "hellhole/MAZEOFDTH.lev",
            "hellhole/Passage.lev",
            "hellhole/Q3basin.lev",
            "hellhole/ROCK1.LEV",
            "hellhole/RUSH.LEV",
            "hellhole/TEMPLE_1.LEV",
            "hellhole/Tightwad.lev",
            "hellhole/VermisPit.lev",
            "hellhole/ZIMM.LEV",
            "hellhole/Zeppelin.lev",
            "hellhole/arena.lev",
            "hellhole/blastpit.lev",
            "hellhole/bunnycat.lev",
            "hellhole/cathode2.lev",
            "hellhole/crazy_1.lev",
            "hellhole/death.lev",
            "hellhole/diagonal.lev",
            "hellhole/dojo.lev",
            "hellhole/dotty.lev",
            "hellhole/finlfigt.lev",
            "hellhole/flyndie.lev",
            "hellhole/handz.lev",
            "hellhole/hardwrld.lev",
            "hellhole/hill.lev",
            "hellhole/hvymetal.lev",
            "hellhole/jumpbase.lev",
            "hellhole/jungle2.lev",
            "hellhole/kickass.lev",
            "hellhole/king.lev",
            "hellhole/nav_dm.lev",
            "hellhole/nike.lev",
            "hellhole/openjump.lev",
            "hellhole/quake2.lev",
            "hellhole/teraz3.lev",
            "hellhole/thorn.lev",
            "hellhole/walls.lev",
            "hellhole/war_1.lev",
            "hellhole/wcav.lev",
            "hellhole/zimmarea.lev",
            "hellhole/Q3arena2.lev",
            "hellhole/1337.lev",
            "hellhole/2xcathode.lev",
            "hellhole/2xkross-s.lev",
            "hellhole/2zamki3.lev",
            "hellhole/6xwheel.lev",
            "hellhole/Agave.lev",
            "hellhole/Circling.lev",
            "hellhole/Fin.lev",
            "hellhole/Jump.lev",
            "hellhole/Kross3.lev",
            "hellhole/Kross4.lev",
            "hellhole/MyLevel2.lev",
            "hellhole/Owl.lev",
            "hellhole/RGB.LEV",
            "hellhole/RU.LEV",
            "hellhole/SNight.lev",
            "hellhole/Shelves.lev",
            "hellhole/Simple.lev",
            "hellhole/aqueducts.lev",
            "hellhole/dethruw3.lev",
            "hellhole/egypt.lev",
            "hellhole/gears.lev",
            "hellhole/glasscup.lev",
            "hellhole/kross31-s.lev",
            "hellhole/manson.lev",
            "hellhole/meander.lev",
            "hellhole/miazga.lev",
            "hellhole/navarona.lev",
            "hellhole/quickdef.lev",
            "hellhole/shadowr.lev",
            "hellhole/shayss.lev",
            "hellhole/stronghold.lev",
            "hellhole/tdk3.lev",
            "hellhole/tiger-s.lev",
            "hellhole/2xkross2.lev",
            "hellhole/4squares.lev",
            "hellhole/Cathode_1.lev",
            "hellhole/Cheese.lev",
            "hellhole/DUEL.LEV",
            "hellhole/HUSK.LEV",
            "hellhole/INDIA2.LEV",
            "hellhole/Likwid.lev",
            "hellhole/MITH.lev",
            "hellhole/Memory.lev",
            "hellhole/Owl-2.lev",
            "hellhole/Owl-3.lev",
            "hellhole/Saloon.lev",
            "hellhole/Sancti.lev",
            "hellhole/Simple2.lev",
            "hellhole/TEMPLE27.LEV",
            "hellhole/angel.lev",
            "hellhole/arena711.lev",
            "hellhole/arkham.lev",
            "hellhole/atr.lev",
            "hellhole/badger.lev",
            "hellhole/bj4wilq.lev",
            "hellhole/cathode.lev",
            "hellhole/deathruw.lev",
            "hellhole/fallout2.lev",
            "hellhole/ghostrider_platforms.lev",
            "hellhole/izbla.lev",
            "hellhole/panther-s.lev",
            "hellhole/pokol2.lev",
            "hellhole/pyramid_1.lev",
            "hellhole/qflight.lev",
            "hellhole/tune-l.lev",
            "hellhole/unite.lev"
        ]
    ],
    [
        "crampedBest",
        [
            "hellhole/Likwid.lev",
            "hellhole/BATTLEGR.LEV",
            "hellhole/SMB.lev",
            "hellhole/THE HUNTERS.lev",
            "hellhole/TOWER_2.LEV",
            "hellhole/Tomb.lev",
            "hellhole/baricade.lev",
            "hellhole/building_2.lev",
            "hellhole/circles.lev",
            "hellhole/lb_cmplx.lev",
            "hellhole/lb_infst.lev",
            "hellhole/lvl0005.lev",
            "hellhole/osamabase.lev",
            "hellhole/phobos.lev",
            "hellhole/qmark_1.lev",
            "hellhole/the cave.lev",
            "hellhole/tunnel2_1.lev",
            "hellhole/wormhole_1.lev",
            "hellhole/bloody.lev",
            "hellhole/Qrampage.lev"
        ]
    ],
    [
        "crampedGood",
        [
            "hellhole/aqueducts.lev",
            "hellhole/canyon.lev",
            "hellhole/gears.lev",
            "hellhole/illyria.lev",
            "hellhole/stronghold.lev",
            "hellhole/2worm4ya.lev",
            "hellhole/AfricanBonanza2.lev",
            "hellhole/Bunkier2.lev",
            "hellhole/COOL_1.LEV",
            "hellhole/Domes.lev",
            "hellhole/Dropzone.lev",
            "hellhole/DvDmanDT.lev",
            "hellhole/FORTISAR.LEV",
            "hellhole/Fort2.lev",
            "hellhole/LABRIN.LEV",
            "hellhole/Laardi2.lev",
            "hellhole/Labra.lev",
            "hellhole/LodeRun.LEV",
            "hellhole/LodeRun2.lev",
            "hellhole/Mountain_1.lev",
            "hellhole/MyLevel1.lev",
            "hellhole/MyLevel3.lev",
            "hellhole/Nfuel.lev",
            "hellhole/ROCKBASE.LEV",
            "hellhole/Ramm.lev",
            "hellhole/RealTime.lev",
            "hellhole/ST-1.lev",
            "hellhole/TheMine.lev",
            "hellhole/Warfare.lev",
            "hellhole/albatros.lev",
            "hellhole/amplify.lev",
            "hellhole/crazy_2.lev",
            "hellhole/face.lev",
            "hellhole/flame.lev",
            "hellhole/forrest.lev",
            "hellhole/galleon.lev",
            "hellhole/holy.lev",
            "hellhole/kulon-q8.lev",
            "hellhole/labyrint.lev",
            "hellhole/lvl0003.lev",
            "hellhole/marocko6.lev",
            "hellhole/mega.lev",
            "hellhole/park8.lev",
            "hellhole/planetx.lev",
            "hellhole/qaverns.lev",
            "hellhole/rainyday.lev",
            "hellhole/serpent.lev",
            "hellhole/sludgestastion.lev",
            "hellhole/spikcavn.lev",
            "hellhole/tunnel2.lev",
            "hellhole/warloops.lev",
            "hellhole/warzone.lev",
            "hellhole/Bridge.lev",
            "hellhole/CHAOSI~T.LEV",
            "hellhole/Likwid.lev",
            "hellhole/BATTLEGR.LEV",
            "hellhole/SMB.lev",
            "hellhole/THE HUNTERS.lev",
            "hellhole/TOWER_2.LEV",
            "hellhole/Tomb.lev",
            "hellhole/baricade.lev",
            "hellhole/building_2.lev",
            "hellhole/circles.lev",
            "hellhole/lb_cmplx.lev",
            "hellhole/lb_infst.lev",
            "hellhole/lvl0005.lev",
            "hellhole/osamabase.lev",
            "hellhole/phobos.lev",
            "hellhole/qmark_1.lev",
            "hellhole/the cave.lev",
            "hellhole/tunnel2_1.lev",
            "hellhole/wormhole_1.lev",
            "hellhole/bloody.lev",
            "hellhole/Qrampage.lev"
        ]
    ],
    [
        "crampedOk",
        [
            "hellhole/AirCastleZ.lev",
            "hellhole/Lost Base.lev",
            "hellhole/Mines.lev",
            "hellhole/fun.lev",
            "hellhole/Cross Walls.lev",
            "hellhole/Elegant.lev",
            "hellhole/ZIMM.LEV",
            "hellhole/bunnycat.lev",
            "hellhole/crazy_1.lev",
            "hellhole/death.lev",
            "hellhole/jungle2.lev",
            "hellhole/king.lev",
            "hellhole/$MUMEY$.LEV",
            "hellhole/007.lev",
            "hellhole/2BASES.LEV",
            "hellhole/@AT@.LEV",
            "hellhole/Ak22.lev",
            "hellhole/BATTLEDM.LEV",
            "hellhole/BIGHOUSE.LEV",
            "hellhole/Block.lev",
            "hellhole/CASTLE_1.LEV",
            "hellhole/CTFArena_1.lev",
            "hellhole/CVICISTE.LEV",
            "hellhole/Carnival.lev",
            "hellhole/Chaos I.LEV",
            "hellhole/Church.lev",
            "hellhole/City.lev",
            "hellhole/Commando.lev",
            "hellhole/DIRTFACT.LEV",
            "hellhole/DIRTHOLE.LEV",
            "hellhole/Elevate.lev",
            "hellhole/FORTFAN.LEV",
            "hellhole/Fallout.lev",
            "hellhole/Fight Eyes.lev",
            "hellhole/Forest.lev",
            "hellhole/GreyFort.lev",
            "hellhole/HELLRAIN.LEV",
            "hellhole/Haunted.lev",
            "hellhole/HighRock.lev",
            "hellhole/Hotel 2.lev",
            "hellhole/Hotel.lev",
            "hellhole/Hq.lev",
            "hellhole/Ice Station.lev",
            "hellhole/Interlierobattles.lev",
            "hellhole/JIPEE.LEV",
            "hellhole/JUSSI2.LEV",
            "hellhole/Jnglenight.lev",
            "hellhole/JoeMac.lev",
            "hellhole/Joes2.lev",
            "hellhole/KUBLA.LEV",
            "hellhole/LEVaYTYS.LEV",
            "hellhole/Light.lev",
            "hellhole/MarcMaze.lev",
            "hellhole/Metro.lev",
            "hellhole/Mine.lev",
            "hellhole/Missile.lev",
            "hellhole/Mission6.lev",
            "hellhole/Mob.lev",
            "hellhole/Mofoc2.lev",
            "hellhole/MoonTown.lev",
            "hellhole/Moonbase.lev",
            "hellhole/Mountain_2.lev",
            "hellhole/Mt.Kewl.lev",
            "hellhole/NAABRID2.LEV",
            "hellhole/NUKESITE.lev",
            "hellhole/Neon.lev",
            "hellhole/Nfactory.lev",
            "hellhole/Nofly.lev",
            "hellhole/Paras2.lev",
            "hellhole/Pleasegod.lev",
            "hellhole/SPcsupp.lev",
            "hellhole/StarTown.lev",
            "hellhole/Supply depot.lev",
            "hellhole/TOWERS_1.LEV",
            "hellhole/The Base.lev",
            "hellhole/The D11-Base.lev",
            "hellhole/The arena.lev",
            "hellhole/ToraBora.lev",
            "hellhole/Training_1.lev",
            "hellhole/Tunnels.LEV",
            "hellhole/Twister.lev",
            "hellhole/UA-FORT.LEV",
            "hellhole/UA-METRO.LEV",
            "hellhole/VERSION.LEV",
            "hellhole/WW2.LEV",
            "hellhole/WWI.lev",
            "hellhole/Warehaus.lev",
            "hellhole/Warforts.lev",
            "hellhole/Wormhouse.lev",
            "hellhole/adelanto.lev",
            "hellhole/base1.lev",
            "hellhole/building_3.lev",
            "hellhole/castle2_1.lev",
            "hellhole/castle_2.lev",
            "hellhole/castle_3.lev",
            "hellhole/castlez.lev",
            "hellhole/cow.lev",
            "hellhole/crazy.lev",
            "hellhole/downtown.lev",
            "hellhole/esko.lev",
            "hellhole/gaper.lev",
            "hellhole/gard towers.lev",
            "hellhole/hornillo.lev",
            "hellhole/house2.lev",
            "hellhole/house_2.lev",
            "hellhole/impossbl.lev",
            "hellhole/jungle1.lev",
            "hellhole/keep.lev",
            "hellhole/kgivler2.lev",
            "hellhole/kgivler5.lev",
            "hellhole/klex.lev",
            "hellhole/lb_vulcn.lev",
            "hellhole/led.lev",
            "hellhole/lego.lev",
            "hellhole/lift.lev",
            "hellhole/mine_1.lev",
            "hellhole/mining.lev",
            "hellhole/misile.lev",
            "hellhole/mount ki.lev",
            "hellhole/munchoz.lev",
            "hellhole/neighbours.lev",
            "hellhole/oilraft.lev",
            "hellhole/place.lev",
            "hellhole/planetz.lev",
            "hellhole/podzemi.lev",
            "hellhole/prison.lev",
            "hellhole/psycho.lev",
            "hellhole/raid.lev",
            "hellhole/rebels.lev",
            "hellhole/rockar.lev",
            "hellhole/rockar3.lev",
            "hellhole/rooms.lev",
            "hellhole/scity.lev",
            "hellhole/scud.lev",
            "hellhole/serial.lev",
            "hellhole/sfactory.lev",
            "hellhole/shroomz.lev",
            "hellhole/splat.lev",
            "hellhole/storage.lev",
            "hellhole/stygg.lev",
            "hellhole/style.lev",
            "hellhole/sun.lev",
            "hellhole/takta.lev",
            "hellhole/treehaus.lev",
            "hellhole/tunnel.lev",
            "hellhole/tunnel_1.lev",
            "hellhole/ultrar.lev",
            "hellhole/ulvenstn.lev",
            "hellhole/war Bubbles of doom.lev",
            "hellhole/warfield.lev",
            "hellhole/weekyear.lev",
            "hellhole/winning cup.lev",
            "hellhole/winter.lev",
            "hellhole/winter_1.lev",
            "hellhole/wormatras.lev",
            "hellhole/aqueducts.lev",
            "hellhole/canyon.lev",
            "hellhole/gears.lev",
            "hellhole/illyria.lev",
            "hellhole/stronghold.lev",
            "hellhole/2worm4ya.lev",
            "hellhole/AfricanBonanza2.lev",
            "hellhole/Bunkier2.lev",
            "hellhole/COOL_1.LEV",
            "hellhole/Domes.lev",
            "hellhole/Dropzone.lev",
            "hellhole/DvDmanDT.lev",
            "hellhole/FORTISAR.LEV",
            "hellhole/Fort2.lev",
            "hellhole/LABRIN.LEV",
            "hellhole/Laardi2.lev",
            "hellhole/Labra.lev",
            "hellhole/LodeRun.LEV",
            "hellhole/LodeRun2.lev",
            "hellhole/Mountain_1.lev",
            "hellhole/MyLevel1.lev",
            "hellhole/MyLevel3.lev",
            "hellhole/Nfuel.lev",
            "hellhole/ROCKBASE.LEV",
            "hellhole/Ramm.lev",
            "hellhole/RealTime.lev",
            "hellhole/ST-1.lev",
            "hellhole/TheMine.lev",
            "hellhole/Warfare.lev",
            "hellhole/albatros.lev",
            "hellhole/amplify.lev",
            "hellhole/crazy_2.lev",
            "hellhole/face.lev",
            "hellhole/flame.lev",
            "hellhole/forrest.lev",
            "hellhole/galleon.lev",
            "hellhole/holy.lev",
            "hellhole/kulon-q8.lev",
            "hellhole/labyrint.lev",
            "hellhole/lavina.lev",
            "hellhole/lvl0003.lev",
            "hellhole/marocko6.lev",
            "hellhole/mega.lev",
            "hellhole/park8.lev",
            "hellhole/planetx.lev",
            "hellhole/qaverns.lev",
            "hellhole/rainyday.lev",
            "hellhole/serpent.lev",
            "hellhole/sludgestastion.lev",
            "hellhole/spikcavn.lev",
            "hellhole/tunnel2.lev",
            "hellhole/warloops.lev",
            "hellhole/warzone.lev",
            "hellhole/Bridge.lev",
            "hellhole/CHAOSI~T.LEV",
            "hellhole/Likwid.lev",
            "hellhole/BATTLEGR.LEV",
            "hellhole/SMB.lev",
            "hellhole/THE HUNTERS.lev",
            "hellhole/TOWER_2.LEV",
            "hellhole/Tomb.lev",
            "hellhole/baricade.lev",
            "hellhole/building_2.lev",
            "hellhole/circles.lev",
            "hellhole/lb_cmplx.lev",
            "hellhole/lb_infst.lev",
            "hellhole/lvl0005.lev",
            "hellhole/osamabase.lev",
            "hellhole/phobos.lev",
            "hellhole/qmark_1.lev",
            "hellhole/the cave.lev",
            "hellhole/tunnel2_1.lev",
            "hellhole/wormhole_1.lev",
            "hellhole/bloody.lev",
            "hellhole/Qrampage.lev"
        ]
    ],
    [
        "cramped",
        [
            "hellhole/drains.lev",
            "hellhole/dropzone_1.lev",
            "hellhole/2Forts.lev",
            "hellhole/5pipe.lev",
            "hellhole/ANT HILL.LEV",
            "hellhole/ANTS1.LEV",
            "hellhole/Afterlife.lev",
            "hellhole/AirForce.lev",
            "hellhole/Alley.lev",
            "hellhole/Area51.lev",
            "hellhole/Assault.lev",
            "hellhole/BGrock.lev",
            "hellhole/BIN LADE.LEV",
            "hellhole/BOMBARD.LEV",
            "hellhole/BORDOM.LEV",
            "hellhole/BOWSERPL.LEV",
            "hellhole/BellCity.lev",
            "hellhole/BellFun.lev",
            "hellhole/Big X.lev",
            "hellhole/BigCity.lev",
            "hellhole/Bizzare.lev",
            "hellhole/Blades Liero Resort.lev",
            "hellhole/Bubbles.lev",
            "hellhole/Building.lev",
            "hellhole/CS HardCore.lev",
            "hellhole/CTF - Red October.lev",
            "hellhole/Carvings.LEV",
            "hellhole/CastV2.lev",
            "hellhole/Castle2.lev",
            "hellhole/Chook Arena.lev",
            "hellhole/Chump.lev",
            "hellhole/City Assualt.lev",
            "hellhole/Computer.lev",
            "hellhole/D-day.lev",
            "hellhole/D11base.lev",
            "hellhole/Dog.lev",
            "hellhole/FREE.LEV",
            "hellhole/FURUKEL.LEV",
            "hellhole/Flojo.lev",
            "hellhole/Follow the White Rabbit.lev",
            "hellhole/Fort1.lev",
            "hellhole/Fortress_2.lev",
            "hellhole/GMT3beta32.lev",
            "hellhole/GreyUFO.lev",
            "hellhole/HiddenCove.lev",
            "hellhole/Hive.lev",
            "hellhole/House.lev",
            "hellhole/IMLOST.LEV",
            "hellhole/JANNU.LEV",
            "hellhole/JANNU133.LEV",
            "hellhole/JUSSI999.LEV",
            "hellhole/Jee.lev",
            "hellhole/Krig.lev",
            "hellhole/LAB!.lev",
            "hellhole/LABRATH.LEV",
            "hellhole/Leaking.lev",
            "hellhole/Lightning volcano.lev",
            "hellhole/Lines_1.lev",
            "hellhole/Lost.lev",
            "hellhole/MY HOUSES.LEV",
            "hellhole/MarioLnd.lev",
            "hellhole/Maze2.lev",
            "hellhole/Maze_1.lev",
            "hellhole/Maze_2.lev",
            "hellhole/Mission.lev",
            "hellhole/Nukecore.lev",
            "hellhole/PERFECT.LEV",
            "hellhole/PaakALLO.LEV",
            "hellhole/Phantosams castle.lev",
            "hellhole/Port.lev",
            "hellhole/ROCKDUDE.LEV",
            "hellhole/Rescue thoos hostage.lev",
            "hellhole/Roburky1.lev",
            "hellhole/RockCity.lev",
            "hellhole/Rock_1.lev",
            "hellhole/S.LEV",
            "hellhole/Snow.lev",
            "hellhole/Street.lev",
            "hellhole/Stripes.lev",
            "hellhole/TOXIC.LEV",
            "hellhole/TRICKYCL.LEV",
            "hellhole/TUNNELS_2.lev",
            "hellhole/TechnoForts.lev",
            "hellhole/TerriostScum.lev",
            "hellhole/TheCave.lev",
            "hellhole/Tiger's Warzone.lev",
            "hellhole/TooMuch.lev",
            "hellhole/Train.lev",
            "hellhole/Training.lev",
            "hellhole/Transit.lev",
            "hellhole/UA-PARK.LEV",
            "hellhole/UA-STREETS.LEV",
            "hellhole/UH OH OH.LEV",
            "hellhole/VAINU.LEV",
            "hellhole/VILLE.LEV",
            "hellhole/Vault city.LEV",
            "hellhole/Volcano_3.lev",
            "hellhole/Water System.lev",
            "hellhole/X-treme Forts.lev",
            "hellhole/Xvz.lev",
            "hellhole/aaa.lev",
            "hellhole/aftermath.lev",
            "hellhole/bloodprk.lev",
            "hellhole/bones.lev",
            "hellhole/boxwar.lev",
            "hellhole/butterfly.lev",
            "hellhole/casino final.lev",
            "hellhole/castle.lev",
            "hellhole/castle_4.lev",
            "hellhole/caves of doom.lev",
            "hellhole/cells.lev",
            "hellhole/conduit.lev",
            "hellhole/contruction.lev",
            "hellhole/cool.lev",
            "hellhole/dcastle.lev",
            "hellhole/deck18.lev",
            "hellhole/derek1.lev",
            "hellhole/derek2.lev",
            "hellhole/destroy2.lev",
            "hellhole/doublebase.lev",
            "hellhole/dump.lev",
            "hellhole/dump2.lev",
            "hellhole/fools.lev",
            "hellhole/gigaworm.lev",
            "hellhole/heaven.lev",
            "hellhole/hell_2.lev",
            "hellhole/hubba.lev",
            "hellhole/kgivler4.lev",
            "hellhole/kgivler6.lev",
            "hellhole/kors.lev",
            "hellhole/kyle4.lev",
            "hellhole/little town.lev",
            "hellhole/oneside.lev",
            "hellhole/onlyoneway.lev",
            "hellhole/rally.lev",
            "hellhole/redmonster.lev",
            "hellhole/redrock.lev",
            "hellhole/scuba.lev",
            "hellhole/silo attack.lev",
            "hellhole/snigel.lev",
            "hellhole/sokkelo.lev",
            "hellhole/spacestation.lev",
            "hellhole/spring.lev",
            "hellhole/tower_1.lev",
            "hellhole/towerwar.lev",
            "hellhole/tri fort.lev",
            "hellhole/two buildings.lev",
            "hellhole/u96.lev",
            "hellhole/war.lev",
            "hellhole/AirCastleZ.lev",
            "hellhole/Lost Base.lev",
            "hellhole/Mines.lev",
            "hellhole/fun.lev",
            "hellhole/Cross Walls.lev",
            "hellhole/Elegant.lev",
            "hellhole/ZIMM.LEV",
            "hellhole/bunnycat.lev",
            "hellhole/crazy_1.lev",
            "hellhole/death.lev",
            "hellhole/jungle2.lev",
            "hellhole/king.lev",
            "hellhole/$MUMEY$.LEV",
            "hellhole/007.lev",
            "hellhole/2BASES.LEV",
            "hellhole/@AT@.LEV",
            "hellhole/Ak22.lev",
            "hellhole/BATTLEDM.LEV",
            "hellhole/BIGHOUSE.LEV",
            "hellhole/Block.lev",
            "hellhole/CASTLE_1.LEV",
            "hellhole/CTFArena_1.lev",
            "hellhole/CVICISTE.LEV",
            "hellhole/Carnival.lev",
            "hellhole/Chaos I.LEV",
            "hellhole/Church.lev",
            "hellhole/City.lev",
            "hellhole/Commando.lev",
            "hellhole/DIRTFACT.LEV",
            "hellhole/DIRTHOLE.LEV",
            "hellhole/Elevate.lev",
            "hellhole/FORTFAN.LEV",
            "hellhole/Fallout.lev",
            "hellhole/Fight Eyes.lev",
            "hellhole/Forest.lev",
            "hellhole/GreyFort.lev",
            "hellhole/HELLRAIN.LEV",
            "hellhole/Haunted.lev",
            "hellhole/HighRock.lev",
            "hellhole/Hotel 2.lev",
            "hellhole/Hotel.lev",
            "hellhole/Hq.lev",
            "hellhole/Ice Station.lev",
            "hellhole/Interlierobattles.lev",
            "hellhole/JIPEE.LEV",
            "hellhole/JUSSI2.LEV",
            "hellhole/Jnglenight.lev",
            "hellhole/JoeMac.lev",
            "hellhole/Joes2.lev",
            "hellhole/KUBLA.LEV",
            "hellhole/LEVaYTYS.LEV",
            "hellhole/Light.lev",
            "hellhole/MarcMaze.lev",
            "hellhole/Metro.lev",
            "hellhole/Mine.lev",
            "hellhole/Missile.lev",
            "hellhole/Mission6.lev",
            "hellhole/Mob.lev",
            "hellhole/Mofoc2.lev",
            "hellhole/MoonTown.lev",
            "hellhole/Moonbase.lev",
            "hellhole/Mountain_2.lev",
            "hellhole/Mt.Kewl.lev",
            "hellhole/NAABRID2.LEV",
            "hellhole/NUKESITE.lev",
            "hellhole/Neon.lev",
            "hellhole/Nfactory.lev",
            "hellhole/Nofly.lev",
            "hellhole/Paras2.lev",
            "hellhole/Pleasegod.lev",
            "hellhole/SPcsupp.lev",
            "hellhole/StarTown.lev",
            "hellhole/Supply depot.lev",
            "hellhole/TOWERS_1.LEV",
            "hellhole/The Base.lev",
            "hellhole/The D11-Base.lev",
            "hellhole/The arena.lev",
            "hellhole/ToraBora.lev",
            "hellhole/Training_1.lev",
            "hellhole/Tunnels.LEV",
            "hellhole/Twister.lev",
            "hellhole/UA-FORT.LEV",
            "hellhole/UA-METRO.LEV",
            "hellhole/VERSION.LEV",
            "hellhole/WW2.LEV",
            "hellhole/WWI.lev",
            "hellhole/Warehaus.lev",
            "hellhole/Warforts.lev",
            "hellhole/Wormhouse.lev",
            "hellhole/adelanto.lev",
            "hellhole/base1.lev",
            "hellhole/building_3.lev",
            "hellhole/castle2_1.lev",
            "hellhole/castle_2.lev",
            "hellhole/castle_3.lev",
            "hellhole/castlez.lev",
            "hellhole/cow.lev",
            "hellhole/crazy.lev",
            "hellhole/downtown.lev",
            "hellhole/esko.lev",
            "hellhole/gaper.lev",
            "hellhole/gard towers.lev",
            "hellhole/hornillo.lev",
            "hellhole/house2.lev",
            "hellhole/house_2.lev",
            "hellhole/impossbl.lev",
            "hellhole/jungle1.lev",
            "hellhole/keep.lev",
            "hellhole/kgivler2.lev",
            "hellhole/kgivler5.lev",
            "hellhole/klex.lev",
            "hellhole/lb_vulcn.lev",
            "hellhole/led.lev",
            "hellhole/lego.lev",
            "hellhole/lift.lev",
            "hellhole/mine_1.lev",
            "hellhole/mining.lev",
            "hellhole/misile.lev",
            "hellhole/mount ki.lev",
            "hellhole/munchoz.lev",
            "hellhole/neighbours.lev",
            "hellhole/oilraft.lev",
            "hellhole/place.lev",
            "hellhole/planetz.lev",
            "hellhole/podzemi.lev",
            "hellhole/prison.lev",
            "hellhole/psycho.lev",
            "hellhole/raid.lev",
            "hellhole/rebels.lev",
            "hellhole/rockar.lev",
            "hellhole/rockar3.lev",
            "hellhole/rooms.lev",
            "hellhole/scity.lev",
            "hellhole/scud.lev",
            "hellhole/serial.lev",
            "hellhole/sfactory.lev",
            "hellhole/shroomz.lev",
            "hellhole/splat.lev",
            "hellhole/storage.lev",
            "hellhole/stygg.lev",
            "hellhole/style.lev",
            "hellhole/sun.lev",
            "hellhole/takta.lev",
            "hellhole/treehaus.lev",
            "hellhole/tunnel.lev",
            "hellhole/tunnel_1.lev",
            "hellhole/ultrar.lev",
            "hellhole/ulvenstn.lev",
            "hellhole/war Bubbles of doom.lev",
            "hellhole/warfield.lev",
            "hellhole/weekyear.lev",
            "hellhole/winning cup.lev",
            "hellhole/winter.lev",
            "hellhole/winter_1.lev",
            "hellhole/wormatras.lev",
            "hellhole/aqueducts.lev",
            "hellhole/canyon.lev",
            "hellhole/gears.lev",
            "hellhole/illyria.lev",
            "hellhole/stronghold.lev",
            "hellhole/2worm4ya.lev",
            "hellhole/AfricanBonanza2.lev",
            "hellhole/Bunkier2.lev",
            "hellhole/COOL_1.LEV",
            "hellhole/Domes.lev",
            "hellhole/Dropzone.lev",
            "hellhole/DvDmanDT.lev",
            "hellhole/FORTISAR.LEV",
            "hellhole/Fort2.lev",
            "hellhole/LABRIN.LEV",
            "hellhole/Laardi2.lev",
            "hellhole/Labra.lev",
            "hellhole/LodeRun.LEV",
            "hellhole/LodeRun2.lev",
            "hellhole/Mountain_1.lev",
            "hellhole/MyLevel1.lev",
            "hellhole/MyLevel3.lev",
            "hellhole/Nfuel.lev",
            "hellhole/ROCKBASE.LEV",
            "hellhole/Ramm.lev",
            "hellhole/RealTime.lev",
            "hellhole/ST-1.lev",
            "hellhole/TheMine.lev",
            "hellhole/Warfare.lev",
            "hellhole/albatros.lev",
            "hellhole/amplify.lev",
            "hellhole/crazy_2.lev",
            "hellhole/face.lev",
            "hellhole/flame.lev",
            "hellhole/forrest.lev",
            "hellhole/galleon.lev",
            "hellhole/holy.lev",
            "hellhole/kulon-q8.lev",
            "hellhole/labyrint.lev",
            "hellhole/lavina.lev",
            "hellhole/lvl0003.lev",
            "hellhole/marocko6.lev",
            "hellhole/mega.lev",
            "hellhole/park8.lev",
            "hellhole/planetx.lev",
            "hellhole/qaverns.lev",
            "hellhole/rainyday.lev",
            "hellhole/serpent.lev",
            "hellhole/sludgestastion.lev",
            "hellhole/spikcavn.lev",
            "hellhole/tunnel2.lev",
            "hellhole/warloops.lev",
            "hellhole/warzone.lev",
            "hellhole/Bridge.lev",
            "hellhole/CHAOSI~T.LEV",
            "hellhole/Likwid.lev",
            "hellhole/BATTLEGR.LEV",
            "hellhole/SMB.lev",
            "hellhole/THE HUNTERS.lev",
            "hellhole/TOWER_2.LEV",
            "hellhole/Tomb.lev",
            "hellhole/baricade.lev",
            "hellhole/building_2.lev",
            "hellhole/circles.lev",
            "hellhole/lb_cmplx.lev",
            "hellhole/lb_infst.lev",
            "hellhole/lvl0005.lev",
            "hellhole/osamabase.lev",
            "hellhole/phobos.lev",
            "hellhole/qmark_1.lev",
            "hellhole/the cave.lev",
            "hellhole/tunnel2_1.lev",
            "hellhole/wormhole_1.lev",
            "hellhole/bloody.lev",
            "hellhole/Qrampage.lev"
        ]
    ]
]);

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
    onCommand(command, callback) {
        const handler = this.instance.onCommand(command, callback);
        this.commandHandlers.push(handler);
        return handler;
    }
    onCommandWithTarget(command, callback) {
        return this.onCommand(command, (player, message) => {
            const [commandName, target, ...args] = message.split(' ');
            const targetPlayer = this.instance.findPlayer(target);
            if (!targetPlayer) {
                this.instance.error(`Could not find targetPlayer: ${target}, use !list`, player.id);
                const definition = Commands.get(commandName);
                if (definition.description) {
                    this.instance.error(definition.description, player.id);
                }
                return;
            }
            callback(player, targetPlayer, args);
        });
    }
}

class Admin extends Plugin {
    constructor(instance, config) {
        super(instance, config);
        this.mute = (admin, targetPlayer) => {
            const minutes = this.config.muteDuration / 1000 / 60;
            this.instance.notify(`${targetPlayer.name} has been muted for ${minutes} minutes, use "!a unmute ${this.instance.shortId(targetPlayer.id)}" to unmute`, admin.id);
            this.instance.mute(targetPlayer.id, this.config.muteDuration);
        };
        this.unMute = (admin, targetPlayer) => {
            this.instance.notify(`${targetPlayer.name} has been ungagged`, admin.id);
            this.instance.unMute(targetPlayer.id);
        };
        this.handleJoin = ({ detail: player }) => {
            if (this.auths.has(player.auth)) {
                this.instance.room.setPlayerAdmin(player.id, true);
            }
        };
        this.auths = new Set(config.auths);
    }
    onCommand(command, callback) {
        return super.onCommand(command, (player, message) => {
            if (!player.admin) {
                this.instance.error('Not admin', player.id);
                return;
            }
            callback(player, message);
        });
    }
    activate() {
        this.on('playerJoin', this.handleJoin);
        this.onCommand(Command.AdminHelp, (player, message) => {
            this.respondWithUsage(player.id);
        });
        this.onCommand(Command.AdminSkip, (player, message) => {
            this.instance.room.endGame();
            this.instance.notify(`Admin: ${player.name}, ended game`);
        });
        this.onCommand(Command.AdminShuffle, (player, message) => {
            this.instance.notify(`Admin: ${player.name}, shuffled map pool`);
            this.instance.levelManager.shuffle();
        });
        this.onCommand(Command.AdminRestart, (player, message) => {
            this.instance.room.endGame();
            this.instance.notify(`Admin: ${player.name}, restared game`);
        });
        this.onCommand(Command.AdminDefcon6, (player, message) => {
            this.instance.error('Not yet implemented', player.id);
        });
        this.onCommand(Command.AdminNextMap, (player, message) => {
            const token = message.substr(message.indexOf(' ') + 1);
            const level = this.instance.findLevel(token);
            if (!level) {
                this.instance.error(`${token} not found`, player.id);
                return;
            }
            this.instance.notify(`Admin ${player.name} set next map: ${level}`);
            this.instance.levelManager.setNext(level);
        });
        this.onCommandWithTarget(Command.AdminClearBan, (player, targetPlayer) => {
            this.instance.room.clearBan(targetPlayer.id);
            this.instance.notify(`Clearing ban for player with previous id ${targetPlayer.id}`);
        });
        this.onCommandWithTarget(Command.AdminMute, this.mute);
        this.onCommandWithTarget(Command.AdminUnMute, this.unMute);
        this.onCommandWithTarget(Command.AdminKick, (player, targetPlayer, args) => {
            this.instance.room.kickPlayer(targetPlayer.id, `You have been kicked ${args[0] || ''}`, false);
        });
        this.onCommandWithTarget(Command.AdminBan, (player, targetPlayer, args) => {
            this.instance.temporaryBan(targetPlayer, `You have been kicked for ${Math.round(this.config.kickDuration / 1000 / 60)} minutes ${args[0] || ''}`, this.config.kickDuration);
        });
    }
    respondWithUsage(playerId) {
        this.instance.notify(`Usage:`, playerId);
        Array.from(this.instance.commandRegistry.activeCommands.keys()).sort().forEach((command) => {
            const definition = Commands.get(command);
            if (!definition.hidden && definition.admin) {
                if (definition.description) {
                    if (definition.arguments) {
                        this.instance.notify(`${command} 123 ${definition.verboseCommand ? `or ${definition.verboseCommand} 123` : ''}`);
                    }
                    else {
                        this.instance.notify(`${command} ${definition.verboseCommand ? `or ${definition.verboseCommand}` : ''}`);
                    }
                }
            }
        });
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
        this.onCommandWithTarget(Command.Info, (player, targetPlayer, args) => {
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
        this.onCommand(Command.PlayerList, (commandPlayer, message) => {
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

class NextMap extends Plugin {
    activate() {
        this.onCommand(Command.NextMap, (player, message) => {
            this.instance.notify(`Current map: ${this.instance.levelManager.currentName()}, Next map: ${this.instance.levelManager.peekName()}`, player.id);
        });
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

class SearchLevels extends Plugin {
    activate() {
        this.onCommand(Command.SearchLevels, (commandPlayer, message) => {
            const results = this.instance.levelIndex.search(message.substr(message.indexOf(' ') + 1));
            this.instance.notify(`Searching ${message.substr(message.indexOf(' ') + 1)}`);
            this.instance.notify(`Found: ${results.length} showing ${Math.min(results.length, this.config.resultSize)}`, commandPlayer.id);
            this.instance.notify('Levels: id, level', commandPlayer.id);
            results.slice(0, this.config.resultSize).forEach(result => {
                this.instance.notify(`${result.id},\t ${result.full}`, commandPlayer.id);
            });
        });
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

class VoteMap extends Plugin {
    activate() {
        this.onCommand(Command.VoteMap, (player, message) => {
            const token = message.substr(message.indexOf(' ') + 1);
            const level = this.instance.findLevel(token);
            if (!level) {
                this.instance.error(`No such level: ${token}`, player.id);
                return;
            }
            this.instance.election(`Next map ${level}`, player, () => {
                this.instance.notify(`Next map set to ${level}`);
                this.instance.levelManager.setNext(level);
            });
        });
    }
}

class VoteMute extends Plugin {
    activate() {
        const minutes = this.config.muteDuration / 1000 / 60;
        this.onCommandWithTarget(Command.VoteMute, (player, targetPlayer, args) => {
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
        this.onCommandWithTarget(Command.VoteKick, (player, targetPlayer, args) => {
            this.instance.election(`Kick ${targetPlayer.name} for ${minutes} minutes`, player, () => {
                if (targetPlayer.admin) {
                    this.instance.error(`${targetPlayer.name} is admin, will not kick`);
                }
                else {
                    this.instance.temporaryBan(targetPlayer, "Vote kick", this.config.kickDuration);
                }
            });
        });
    }
}

class VoteRestartMap extends Plugin {
    activate() {
        this.onCommand(Command.VoteRestart, (player, message) => {
            this.instance.election('Skip map', player, () => {
                this.instance.room.restartGame();
                this.instance.notify('Game restarted');
            });
        });
    }
}

class VoteSkipMap extends Plugin {
    activate() {
        this.onCommand(Command.VoteSkip, (player, message) => {
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
    EventEnum[EventEnum["loadLevel"] = 6] = "loadLevel";
    EventEnum[EventEnum["newPlayer"] = 7] = "newPlayer";
    EventEnum[EventEnum["playerActive"] = 8] = "playerActive";
    EventEnum[EventEnum["playerActivity"] = 9] = "playerActivity";
    EventEnum[EventEnum["playerAdminChange"] = 10] = "playerAdminChange";
    EventEnum[EventEnum["playerChat"] = 11] = "playerChat";
    EventEnum[EventEnum["playerInactive"] = 12] = "playerInactive";
    EventEnum[EventEnum["playerJoin"] = 13] = "playerJoin";
    EventEnum[EventEnum["playerKicked"] = 14] = "playerKicked";
    EventEnum[EventEnum["playerKilled"] = 15] = "playerKilled";
    EventEnum[EventEnum["playerLeave"] = 16] = "playerLeave";
    EventEnum[EventEnum["playerScores"] = 17] = "playerScores";
    EventEnum[EventEnum["playerTeamChange"] = 18] = "playerTeamChange";
    EventEnum[EventEnum["roomLink"] = 19] = "roomLink";
    EventEnum[EventEnum["teamScores"] = 20] = "teamScores";
})(EventEnum || (EventEnum = {}));
function isStrictInitOptions(options) {
    const so = options;
    return !!so.roomName && !!so.maxPlayers && so.public !== undefined && !!so.token;
}
class Instance extends EventTarget {
    constructor(window, initOptions, initialSettings, config) {
        super();
        this.commands = new Map();
        this.playerIdToAuth = new Map();
        this.mutedPlayers = new Map();
        this.activePlayers = new Map();
        this.electionTimeouts = new Map();
        this.plugins = new Map();
        this.handleHelp = (player, message) => {
            this.notify("Available commands:", player.id);
            Array.from(this.commandRegistry.activeCommands.keys()).sort().forEach((command) => {
                const definition = Commands.get(command);
                if (!definition.hidden && (!definition.admin || player.admin)) {
                    if (definition.description) {
                        this.notify(`${command}, ${definition.verboseCommand} ${definition.description}`, player.id);
                    }
                }
            });
        };
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
                this.commandRegistry.handleCommand(player, message);
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
        window.digger = this;
        this.commandRegistry = new CommandRegistry(this);
        this.levelIndex = new LevelIndex(this.config.levelBaseURL, this.config.levels);
        this.serverId = this.initOptions.roomName.replace(/[^A-Z0-9]/gi, '-').toLowerCase();
        this.instanceId = `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
        this.eventTarget = this;
        this.setNewGame();
        if (config.levels.length == 0) {
            throw 'You must set levels to await (await fetch("https://webliero.gitlab.io/webliero-maps/pools/index.json").json()';
        }
        if (initialSettings.levelPool) {
            const pool = DefaultPools.get(initialSettings.levelPool);
            if (!pool) {
                throw `levelPool not found: ${initialSettings.levelPool}`;
            }
            this.levelManager = new LevelManager(this.levelIndex, pool);
        }
        else {
            if (!this.config.pool) {
                throw 'Missing levelManager pool in digger config';
            }
            this.levelManager = new LevelManager(this.levelIndex, this.config.pool);
        }
        this.on('gameStart', this.setNewGame);
        this.on('playerJoin', ({ detail: player }) => this.playerIdToAuth.set(player.id, player.auth));
        this.on('playerLeave', ({ detail: player }) => this.playerIdToAuth.delete(player.id));
        this.on('playerChat', this.handlePlayerChat);
        this.on('playerTeamChange', this.handleActive);
        this.on('roomLink', ({ detail: url }) => this.log(`Started: ${url}`));
        this.on('captcha', () => this.log('Failed to start: Faulty token'));
        this.on('playerJoin', ({ detail: player }) => this.notify(Instance.motd, player.id));
        this.onCommand(Command.Help, this.handleHelp);
        this.onCommand(Command.StopTheCount, this.handleStopTheCount);
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
    onCommand(command, callback) {
        return this.commandRegistry.on(command, callback);
    }
    findPlayer(token) {
        const players = this.room.getPlayerList();
        const playerById = players.find(player => this.shortId(player.id).toString() == token);
        return playerById || players.find(player => player.name == token);
    }
    findLevel(token) {
        if (this.levelIndex.levels.indexOf(token) != -1) {
            return token;
        }
        else if (token.match(/^\d+$/)) {
            const index = parseInt(token, 10);
            return this.levelIndex.levels[index];
        }
        else {
            const firstMatch = this.levelIndex.search(token)[0];
            if (firstMatch) {
                return firstMatch.full;
            }
        }
    }
    setPool(pool, baseURL) {
        this.levelManager = new LevelManager(this.levelIndex, pool);
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
                    case 'nextMap':
                        this.registerPlugin(name, new NextMap(this, this.config.plugins.nextMap));
                        break;
                    case 'searchLevels':
                        this.registerPlugin(name, new SearchLevels(this, this.config.plugins.searchLevels));
                        break;
                    case 'scores':
                        this.registerPlugin(name, new Scores(this, this.config.plugins.scores));
                        break;
                    case 'slurper':
                        this.registerPlugin(name, new Slurper(this, this.config.plugins.slurper));
                        break;
                    case 'voteMap':
                        this.registerPlugin(name, new VoteMap(this, this.config.plugins.voteMap));
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
    async handleGameEnd2() {
        const next = this.levelManager.peekName();
        try {
            const level = await this.levelManager.pop();
            this.emit('loadLevel', level.name);
            this.room.loadLev(level.name, level.data);
        }
        catch (e) {
            this.error(`Failed to load ${next}, restarting current level, next level will be: ${this.levelManager.peekName()}`);
            this.room.restartGame();
        }
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
        room.onGameTick = () => this.emit('gameTick');
        room.onPlayerActivity = (player) => this.emit('playerActivity', player);
        room.onRoomLink = (link) => this.emit('roomLink', link);
        room.onGameStart = () => this.emit('gameStart', room.getSettings());
        room.onGameEnd = () => this.emit('gameEnd');
        const originalGameEnd2 = room.onGameEnd2;
        room.onGameEnd2 = () => {
            this.handleGameEnd2().then(() => this.emit('gameEnd2'));
        };
        room.onPlayerKilled = (killed, killer) => this.emit('playerKilled', { killed, killer });
        room.onCaptcha = () => this.emit('captcha');
    }
    generateId() {
        return `${Date.now().toString(36)}#${Math.round(Math.random() * Math.pow(36, 3)).toString(36)}`;
    }
}
Instance.configVersion = 1;
Instance.spectatorTeam = 0;
Instance.motd = `Digger loaded, write !h or !help in chat for commands`;
Instance.defaultConfig = {
    configVersion: Instance.configVersion,
    voteTime: 30000,
    voteTimeout: 45000,
    levels: [],
    levelBaseURL: "https://webliero.gitlab.io/webliero-maps",
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
        nextMap: { enabled: true },
        onePlayer: { enabled: true },
        searchLevels: {
            enabled: true,
            resultSize: 4
        },
        scores: { enabled: true },
        slurper: {
            enabled: true,
            events: [
                'captcha',
                'changePlayerName',
                'gameEnd',
                'gameEnd2',
                'gameStart',
                'loadLevel',
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
        voteMap: { enabled: true },
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
