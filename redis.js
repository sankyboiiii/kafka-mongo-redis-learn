const Redis = require('ioredis');

let redisdb;



function connect(name, uri) {
    redisdb = new Redis(uri, {
        reconnectOnError: function (err) {
            var targetError = 'EAI_AGAIN';
            if (err.message.includes(targetError)) {
                return true;
            }
        },
    });
    redisdb.on('connect', () => {
        console.log(`Redis ${name} connected.`);
    });
    redisdb.on('ready', () => {
        console.log(`Redis ${name} is ready`);
    });
    redisdb.on('error', () => {
        console.log(`Redis ${name} got error`);
    });
    redisdb.on('close', () => {
        console.log(`Redis ${name} is closed`);
    });
    redisdb.on('reconnecting', () => {
        console.log(`Redis ${name} got error`);
    });
    return redisdb;
}



module.exports = connect('Host Read Write', {
    doc: 'test',
    format: String,
    default: 'redis://localhost:6379/0',
})


