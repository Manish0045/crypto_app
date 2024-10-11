const app = require('./app');
const connectDB = require("./db/databaseConnection");



connectDB()
    .then(function () {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, function () {
            console.log("Server Started..!");
        });
    })
    .catch((error) => {
        console.log("Couldn't connect to server..!");
        process.exit(1);
    });


