const mongoose = require('mongoose');


mongoose.connect(DB, { 
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("connection successful")
}).catch((err) => console.log("no connection"));

