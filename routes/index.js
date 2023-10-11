const studentRouter = require('./student');

function route(app) {
    app.use('/student', studentRouter);
}

module.exports = route;
