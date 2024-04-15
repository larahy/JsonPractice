const { writeFile, readFile } = require('fs');
const path = './config.json';
const newFilePath = './storyObject.json'

readFile(path, (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(data)
    const parsedData = JSON.parse(data);
    parsedData.createdAt = new Date().toISOString();
    writeFile(newFilePath, JSON.stringify(parsedData, null, 2), (err) => {
        if (err) {
            console.log('Failed to write updated data to file');
            return;
        }
        console.log('Updated file successfully');
    });
});

