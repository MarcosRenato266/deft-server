'use strict';
/**
 * MongoDB promise library.
 * @namespace yarp.db
 * @see https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
 */

const MongoClient = require('mongodb').MongoClient;
let _url = 'mongodb://localhost:27017/yarp';
let _db = null;
let mongo = {};

/**
 * Connects to MongoDB.
 * @function connect
 * @memberof yarp.db
 * @param {string} [url='mongodb://localhost:27017/yarp'] - Connection URL.
 * @returns {Promise<object>} - A promise that returns the MongoDB object if resolved.
 */
mongo.connect = (url) => {
  return new Promise((resolve, reject) => {
    if (url && (_url != url) && _db){
      mongo.close();
      _url = url;
    }
    if (_db) {
      resolve(_db);
    } else {
      MongoClient.connect(_url, function (err, client) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        _db = client.db('yarp');
        console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Connected to '+_url);
        resolve(_db);
      });
    }
  });
}

/**
 * Inserts a single document or a an array of documents into MongoDB.
 * @function insert
 * @memberof yarp.db
 * @param {string} collection - The collection of the documents.
 * @param {Array} docs - Array of objects.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.insert = (collection,docs,options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).insert(docs, options, function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Removes documents specified by selector from MongoDB.
 * @function remove
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @param {object} selector - Filter the document by parameter.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.remove = (collection,selector,options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).remove(selector, options, function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Save a document. Simple full document replacement function.
 * @function save
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @param {object} doc - The object to save.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.save = (collection,doc,options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).save(doc, options, function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Updates documents.
 * @function update
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @param {object} selector - Filter documents by parameter.
 * @param {object} doc - The fields/values to be updated.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.update = (collection,selector,doc,options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).save(selector, doc, options, function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * The distinct command returns returns a list of distinct values for the given key across a collection.
 * @function destinct
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @param {string} key - Key to run distinct against.
 * @param {object} [query] - Filter results.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.destinct = (collection,key,query,option) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).destinct(key,query,option, function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Count number of matching documents in MongoDB to a query.
 * @function count
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @param {object} [query] - Filter results.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.count = (collection,query,option) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).count(query,option, function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Creates a cursor for a query that can be used to iterate over results from MongoDB.
 * @function find
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @param {object} query - Query to locate the document.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<Array>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.find = (collection,query,options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).find(query,options).toArray(function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Retrieve all the indexes on the collection.
 * @function indexes
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.indexes = (collection) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).indexes(function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Execute an aggregation framework pipeline against the collection.
 * @function aggregate
 * @memberof yarp.db
 * @param {string} collection - The collection of the document.
 * @param {Array} query - Contain all the aggregation framework commands for the execution.
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.aggregate = (collection,query,options) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).aggregate(query,options,function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

/**
 * Get all the collection statistics.
 * @function stats
 * @memberof yarp.db
 * @param {object} [options] - MongoDB options.
 * @returns {Promise<object>} - A promise that returns the result from MongoDB if resolved.
 */
mongo.stats = (collection) => {
  return new Promise((resolve, reject) => {
    mongo.connect().then((_db) => {
      _db.collection(collection).stats(function(err, res) {
        if (err) console.log(chalk.redBright('[LEGACY] ')+err);
        resolve(res);
      });
    });
  });
}

module.exports = mongo;
