const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

var state = {
    db: null
};

exports.get = () => {
    return state.db;
};
exports.connect = new Promise((resolve, reject) => {
    MongoClient.connect(
        url,
        { useNewUrlParser: true }
    )
        .then(db => resolve((state.db = db.db('HR-portal'))))
        .catch(err => reject(err));
});
