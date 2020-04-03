const express = require('express');
const cors = require('cors'); /*Cors permite comunicar el backend y el frontend*/ 
const app = express();
const path = require('path');
const multer = require('multer');

//Settings
app.set('port', process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//middlewares
app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));
// app.use((err,next) => {
//     return console.error("Error: ", err.stack);
//     next(err);
//  });
//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/investment', require('./routes/investment'));
app.use('/api/expenses', require('./routes/expense'));
app.use('/api/income', require('./routes/income'));

module.exports = app;