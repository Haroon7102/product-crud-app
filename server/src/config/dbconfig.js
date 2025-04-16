const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDb Connected");
    } catch (error) {
        console.log("MongoDb Connection unsuccessful please try again");
        process.exit(1);
    }
};

module.exports = connectDb;
