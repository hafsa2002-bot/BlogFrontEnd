import mongoose from "mongoose";

const mongoDb_uri = process.env.uri;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;
    if(connectionState === 1){
        console.log("Already connected")
        return;
    }

    if(connectionState === 2){
        console.log("Connecting...")
        return
    }

    try{
        mongoose.connect(mongoDb_uri, {
            dbName: 'my_blog',
            bufferCommands: true
        })
        console.log("MongoDb connected ☺️")
    }catch(err){
        console.log("Error: ", err)
        throw new Error(err)
    }
}

export default connect;