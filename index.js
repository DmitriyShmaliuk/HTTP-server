const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res)=>{
    let filePath = path.join(__dirname, 'public', (req.url === '/') ? 'index.html': req.url);
    const contentType = getContentType(filePath);

    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    fs.readFile(filePath, (error, content)=>{
        if (error) {
           showErrorPage(res);
        }
        else {
           showContentPage(content, contentType, res);
        }
    });
});

function getContentType(file){
    switch(path.extname(file)) {
        case '.css': 
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.jpg':
        case '.jpeg':
            return 'jpg';
        case '.png':
            return 'png';
        case '.ico':
            return 'ico';
        default:
            return 'text/html';
    }
}

function showErrorPage (res){
    const errorPath = path.join(__dirname, 'public', 'error.html');

    fs.readFile(errorPath, 'utf-8', (error, data)=>{
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

function showContentPage(content, type, res){
    res.writeHead(200, {
        'Content-Type': type
    })

    res.end(content);
}

server.listen(PORT, ()=>{
    console.log(`Server has been started on ${PORT}...`);
});
