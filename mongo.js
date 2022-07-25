
const mongoose = require('mongoose');
const { uri, options } = {
    uri:
        'mongodb://localhost:27017',
    options: {
        useNewUrlParser: true,
        connectTimeoutMS: 3600000
    }
}

const conn = mongoose.createConnection(uri, options);

conn.on('connected', function () {
    console.log(` default connection is open`);
});

conn.on('error', function (err) {
    console.log(` connection error: ${err}`);
});

conn.on('disconnected', function () {
    console.log(" db connection is closed");
});

const schema = new mongoose.Schema({
    message: {
        type: String
    }
});

//uncomment from here

// const model =  conn.model('test', schema)

// async function saverecord(){
//     const res = await new model({ message:"hiiiiii"}).save();
//     console.log(res);

// }

// saverecord();


//uncomment till here

module.exports = conn.model('test', schema);
