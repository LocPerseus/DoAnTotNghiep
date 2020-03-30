const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({ path: './config/config.env' });

const DB = process.env.DATABASE_LOCAL;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB connection successful!'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
})