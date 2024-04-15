const fsExtra = require('fs-extra');
const sourceFile = './config.json';
const resultFile = './storyResult.json'
const OpenAI = require("openai");
const openai = new OpenAI();

async function callChat(data) {
    const completion = await openai.chat.completions.create( {
        messages: [
            {
                "role": "system",
                "content": "create a json object using the schema provided"
            },
            {
                "role": "user",
                "content": data.desiredString
            },
        ],
        model: "gpt-3.5-turbo",
        temperature: 1,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return completion.choices[0].message.content
}


async function readJsonData(data) {
    try {
        const data = await fsExtra.readJson(sourceFile  );
        let desiredString = `Write the text for a picture book for a ${data.age} year old child. 
        Make the story a story that ${data.type}.
         Write it in the style of ${data.subtype}.
         Include ${data.character} and a ${data.objects}.
         Set the story in ${data.location}`
        console.log('the desired string ' + desiredString);
        data.desiredString = desiredString;
        return data
    } catch (error) {
        console.log(error);
    }
}

async function writeJsonData(path, data) {
    try {
        const prompts = await fsExtra.readJson(sourceFile)
        const jsonData = JSON.parse(data);
        console.log(' the response from chatgpt'+ JSON.stringify(jsonData, null, 2));
        jsonData.prompts = JSON.stringify(prompts)
        jsonData.createdAt = new Date().toISOString();
        await fsExtra.writeJson(path, jsonData);
        console.log('Data written to file successfully ');
        return data
    } catch (error) {
        console.log(error);
    }
}

readJsonData()
    .then(data => {
        callChat(data)
            .then((data) => {
                return data
            })
            .then(data => {
                const timestamp = new Date().toISOString();
                const filename = './storyResult' + timestamp + '.json'
                return writeJsonData(filename, data);
            })
    })




