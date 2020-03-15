const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res)=>{
    let filePath = path.join(__dirname, 'public', (req.url === '/') ? 'index.html': req.url);
    let contentType = 'text/html';

    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    switch(path.extname(filePath)) {
        case '.css': 
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'jpg';
            break;
        case '.png':
            contentType = 'png';
            break;
        case '.ico':
            contentType = 'ico';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    fs.readFile(filePath, (error, content)=>{
        if (error) {
           const errorFilePath = path.join(__dirname, 'public', 'error.html');

           fs.readFile(errorFilePath, 'utf-8', (error, data)=>{
                if (error) {
                    res.writeHead(500);
                    res.end("Server error");
                }
                else {
                    res.writeHead(200);
                    res.end(data);
                }  
           })
        }
        else {
            res.writeHead(200, {
                'Content-Type': contentType
            })
    
            res.end(content);
        }
    });

});

server.listen(3000, ()=>{
    console.log("Server has been started...");
});