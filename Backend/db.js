const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const mongoURI = 'mongodb://localhost:27017/my-notes?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'


const connectMongo = () => {
    mongoose.connect(mongoURI).then(()=>{
        console.log("successfully connected");
    }).catch((err) => {
        console.log(err)
    })
} 


module.exports = connectMongo;