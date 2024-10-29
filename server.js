const app = require('./src/app');
const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}/`);
});