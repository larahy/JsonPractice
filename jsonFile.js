const jsonfile = require('jsonfile');
const { writeFile } = require('fs');
const path = './config.json';
const newPath = './storyResult.json'
// jsonfile.readFile(path, (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(data);
//     console.log(JSON.stringify(data));
// });

jsonfile
    .readFile(path)
    .then((data) => {
        console.log(data);
        //create string to send to open ai
        let desiredString = `Write the text for a picture book for a ${data.age} year old child. 
        Make the story a story that ${data.style}.
         Write it in the style of ${data.genre}.
         Include ${data.character} and ${data.objects}.
         Set the story in ${data.location}`
        console.log('the desired string' + desiredString);
        data.desiredString = desiredString;
        return data;
    })
    .then((data) => {
        console.log("age of reader" + data.age);
        data.age = 5
        data.colour = "blue"
        console.log("age of reader" + data.age);
        console.log("colour of reader" + data.colour);
        console.log("type of object" + JSON.stringify(data.colour));
        //create string to send to open ai

        return writeFile(newPath, JSON.stringify(data, null, 2), (err) => {
        console.log("in write file successfully");
        })
    })
    .catch((err) => {
        console.log(err);
    });