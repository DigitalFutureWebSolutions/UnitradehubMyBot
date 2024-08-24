const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path: 'backend/config/config.env'});
const connectDatabase = require('./config/database');
const mysqlPool = require('./config/mysql_database');
const PORT = process.env.PORT || 4000;

//handling uncaught exceptions
process.on('uncaughtException', (err) =>{
    console.log('Error: '+err.message);
    console.log('Shutting down the server due to unhandled uncaught exceptions');
    process.exit(1);
})

//console.log(testing);

//connectDatabase();
/*mysqlPool.query('select 1').then((error)=>{
    console.log('mysql connection established');
})*/

mysqlPool.query('SELECT 1')
    .then(([rows, fields]) => {
        console.log('MySQL connection established');
    })
    .catch(err => {
        console.error('Error establishing MySQL connection:', err);
    });

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

// unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.error('Error: ' + err.message);
    console.error('Shutting down the server due to unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    });
});