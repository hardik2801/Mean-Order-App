module.exports = {
    port: 5001,
    host: '0.0.0.0',
    solr : {
        uri : 'localhost',
    },
    mongo: {
        uri: 'mongodb://localhost/orderapp'
    },
    es : {
        uri : '127.0.0.1:9200'
    },
};
