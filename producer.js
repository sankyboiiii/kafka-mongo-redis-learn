const {Kafka} = require("kafkajs");
const mongocon = require("./mongo");

sendMessage();
async function sendMessage(){
    try
    {
         const kafka = new Kafka({
              "clientId": "myapp",
              "brokers" :["localhost:9092"]
         })

        const producer = kafka.producer();
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")
        const msg = await mongocon.find({});
        const partition = msg[0].message[0] < "N" ? 0 : 1;
        const result =  await producer.send({
            "topic": "wassup",
            "messages": [
                {
                    "value": JSON.stringify(msg),
                    "partition": partition
                }
            ]
        })

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch(ex)
    {
        console.error(`Error ${ex}`)
    }
    finally{
        process.exit(0);
    }


}

module.exports = { sendMessage }