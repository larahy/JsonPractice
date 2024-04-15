const { writeFile, readFile } = require('fs');
const path = './config.json';
const newFilePath = './storyObject.json'

// readFile(path, (error, data) => {
//     if (error) {
//         console.log(error);
//         return;
//     }
//     console.log(data)
//     const parsedData = JSON.parse(data);
//     parsedData.createdAt = new Date().toISOString();
//     writeFile(newFilePath, JSON.stringify(parsedData, null, 2), (err) => {
//         if (err) {
//             console.log('Failed to write updated data to file');
//             return;
//         }
//         console.log('Updated file successfully');
//     });
// });

const usage = {"prompt_tokens":110,"completion_tokens":237,"total_tokens":347}

function calculateCost(usage) {
    return (usage.total_tokens/10)*0.00001
}

const total = calculateCost(usage)
console.log(total)

// (token cost per input token * input tokens) +(completion token costs * completion tokens)
// gpt-3.5-turbo-0125	$0.50 / 1M tokens	$1.50 / 1M tokens
