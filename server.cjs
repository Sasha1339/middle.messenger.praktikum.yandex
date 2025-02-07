const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(express.static('./dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));

    res.status(200);
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`)).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Try using another port.`);
        process.exit(1);
    } else {
        throw err;
    }
});;
