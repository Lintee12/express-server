const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs')

app.use(express.static(__dirname + '/public'));

//routes
app.get('/', (req, res) => {
    res.send('<link rel="stylesheet" type="text/css" href="../css/global.css">')
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/hello', (req, res) => {
    fs.readFile(__dirname + '/public/hello.html', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(404).end();
        } else {
            data = data.replace('</head>', '<link rel="stylesheet" type="text/css" href="./css/global.css"> <title>Hello World</title></head>');
            res.send(data);
        }
    });
});
//end routes

app.listen(port, (error) => {
    if(error) {
        console.log('something went wrong', error)
    }
    else {
        console.log('server is active on port ' + port)
    }
});
