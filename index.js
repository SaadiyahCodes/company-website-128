const http = require('http');
const fs = require('fs');
const path = require('path');

//Creating a server
http.createServer((req, res) => {
    let filePath = '';
    let contentType = 'text/html';

    // Routing logic
    if (req.url === '/') {
        filePath = path.join(__dirname, 'public', 'home.html');
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'public', 'about.html');
    } else if (req.url === '/menu') {
        filePath = path.join(__dirname, 'public', 'menu.html');
    } else if (req.url === '/order') {
        filePath = path.join(__dirname, 'public', 'order.html');
    } else if (req.url === '/contact') {
        filePath = path.join(__dirname, 'public', 'contact.html');
    } else if (req.url === '/styles.css') {
        filePath = path.join(__dirname, 'public', 'styles.css');
        contentType = 'text/css';
    } else if (req.url === '/pizzas.json') {
        filePath = path.join(__dirname, 'pizzas.json');
        contentType = 'application/json';
    } else if (req.url === '/timeline.json') {
        filePath = path.join(__dirname, 'timeline.json');
        contentType = 'application/json';
    } else if (req.url.startsWith('/images/')) {
        filePath = path.join(__dirname, 'public', req.url);
        const ext = path.extname(filePath);
        if (ext === '.png') {
            contentType = 'image/png';
        } else if (ext === '.jpg' || ext === '.jpeg') {
            contentType = 'image/jpeg';
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Error! Image not found.</h1>');
            return;
        }

    } else if (req.url.startsWith('/js/')) { 
        filePath = path.join(__dirname, 'public', req.url);
        contentType = 'application/javascript'; 
        
        // Route to handle feedback submission
    } else if (req.url === '/save-feedback' && req.method === 'POST') {
        
        let body = '';

        // Collect data from POST request
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const feedbackPath = path.join(__dirname, 'feedback.json');
            const newFeedback = JSON.parse(body);

            // Read existing feedback data
            fs.readFile(feedbackPath, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading feedback data.');
                    return;
                }

                const feedbackArray = data ? JSON.parse(data) : [];
                feedbackArray.push(newFeedback);

                // Save updated feedback to the file
                fs.writeFile(feedbackPath, JSON.stringify(feedbackArray, null, 2), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error saving feedback.');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Feedback saved successfully.' }));
                    }
                });
            });
        });
        return;

    }

    else if (req.url === '/save-order' && req.method === 'POST') {
        let body = '';

        // Collect data from POST request
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const orderPath = path.join(__dirname, 'orders.json');
            const newOrder = JSON.parse(body); // Parse the incoming order data

            // Read existing order data
            fs.readFile(orderPath, 'utf-8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading order data.');
                    return;
                }

                // If file exists, parse existing orders; otherwise, create a new array
                const ordersArray = data ? JSON.parse(data) : [];
                ordersArray.push(newOrder); // Add new order to the array

                // Save updated orders to the file
                fs.writeFile(orderPath, JSON.stringify(ordersArray, null, 2), err => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error saving order.');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Order placed successfully.' }));
                    }
                });
            });
        });
        return;
    }
    
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Error! This page is not on the menu sadly.</h1>');
        return;
    }

    // Serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}).listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});


