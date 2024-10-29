const fs = require('fs');
const path = require('path');

const logErrorToFile = (message) => {
    const logFilePath = path.join(__dirname, 'error.json');

    console.log('Logging error to:', logFilePath)

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });

    // Create an error object
    const logMessage = {
        timestamp: new Date().toISOString(),
        message: message.trim().replace(/\n/g, '\\n'),
    };

    // Read existing log data
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        let logs = [];
        if (!err && data) {
            try {
                logs = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON log file:', parseErr);
            }
        }

        // Append new error log
        logs.push(logMessage);

        // Write back to the file
        fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Failed to write to log file', writeErr);
            } else {
                console.log('Error logged successfully:', logMessage);
            }
        });
    });
};

const errorHandler = (err, req, res, next) => {
    const errorDetail = `
        Error message: ${err.message}
        Stack trace: ${err.stack}
        Request URL: ${req.url}
        Request method: ${req.method}
        Timestamp: ${new Date().toISOString()}
    `;

    console.error(errorDetail);

    logErrorToFile(errorDetail); // Log the formatted error detail
    res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;