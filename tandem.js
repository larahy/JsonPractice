const fsExtra = require('fs-extra');
const sourceFile = './storyVariables.json';
const OpenAI = require("openai");
const openai = new OpenAI();

function calculateCost(usage) {
    return JSON.stringify(usage.total_tokens/10)*0.00001
}

async function readJsonData() {
    try {
        return await fsExtra.readJson(sourceFile)
    } catch (error) {
        console.log(error);
    }
}

async function writeJsonData(path, storyResponse) {
    try {
        const storyObject = await fsExtra.readJson(sourceFile)
        const jsonStory = JSON.parse(storyResponse.choices[0].message.content)
        const cost = calculateCost(storyResponse.usage)
        storyObject.storyOutputs.title = jsonStory.title
        storyObject.storyOutputs.text = jsonStory.text
        storyObject.storyOutputs.cost = cost
        storyObject.createdAt = new Date().toISOString();
        await fsExtra.writeJson(path, storyObject);
        console.log('Data written to file successfully ');
    } catch (error) {
        console.log(error);
    }
}

async function callChat(storyObject) {
    let desiredString;
    desiredString = `Write the text for a picture book for a ${storyObject.storyInputs.age} year old child. 
        Make the story a story that ${storyObject.storyInputs.type}.
         Write it in the style of ${storyObject.storyInputs.subtype}.
         Include ${storyObject.storyInputs.characters[0]} and a ${storyObject.storyInputs.objects}.
         Set the story in ${storyObject.storyInputs.location}
         Please respond with a JSON object to represent the story. It should have the fields "title" and "text"`;
    const completion = await openai.chat.completions.create( {
        messages: [
            {
                "role": "system",
                "content": "create a json object using the schema provided"
            },
            {
                "role": "user",
                "content": desiredString
            },
        ],
        model: storyObject.model.name,
        temperature: storyObject.model.temperature,
        max_tokens: storyObject.model.maxTokens,
        top_p: 1,
        frequency_penalty: storyObject.model.frequencyPenalty,
        presence_penalty: storyObject.model.presencePenalty,
    });
    return completion
}

readJsonData()
    .then(storyObject => callChat(storyObject))
    .then(storyResponse => {
        const timestamp = new Date().toISOString();
        const filename = './storyResult' + timestamp + '.json'
        return writeJsonData(filename, storyResponse);
    })