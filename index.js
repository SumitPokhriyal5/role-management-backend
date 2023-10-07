const express = require('express');
const cors = require('cors');

const { connectDB } = require('./db/db');
const { router } = require('./routes/Routes');

const app = express();

app.use(cors())
app.use(express.json());


// user routes
app.use("/", router);



// App listener
app.listen(process.env.PORT || 8080, async () => {
    try {
         console.log(`Server is running on http://localhost:${process.env.PORT || 8080}`);
         console.log('⏳ Database connecting...');
         await connectDB;
         console.log('✅ Database connected.');
    } catch (error) {
         console.log('❌ Error:', error);
    }
});
