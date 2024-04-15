const fsExtra = require('fs-extra');
const sourceFile = './storyVariables.json';
const OpenAI = require("openai");
const openai = new OpenAI();

async function readJsonData() {
    try {
        const storyObject = await fsExtra.readJson(sourceFile);
        // console.log('the story object with stringify' + JSON.stringify(storyObject));
        return storyObject
    } catch (error) {
        console.log(error);
    }
}

async function callChat(storyObject) {
   console.log('the story object in call chat' + storyObject)
   console.log('the story object input age in call chat' + storyObject.storyInputs.age)
   console.log('the story object input location in call chat' + storyObject.storyInputs.location)
   console.log('the story object input characters in call chat' + storyObject.storyInputs.characters[0])

    let desiredString;
    desiredString = `Write the text for a picture book for a ${storyObject.storyInputs.age} year old child. 
        Make the story a story that ${storyObject.storyInputs.type}.
         Write it in the style of ${storyObject.storyInputs.subtype}.
         Include ${storyObject.storyInputs.characters[0]} and a ${storyObject.storyInputs.objects}.
         Set the story in ${storyObject.storyInputs.location}`;

    console.log('the desired string' + desiredString);
    console.log('the story object model name' + storyObject.model.name)
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
    console.log('the usage from gpt' + JSON.stringify(completion.usage))
    return completion
}

readJsonData()
    .then(storyObject => {
        // console.log('the json variables from the file' + JSON.stringify(storyObject))
        return storyObject
    })

readJsonData()
    .then(storyObject => {
        callChat(storyObject)
            .then((storyResponse) => {
                console.log('the response from call chat' + JSON.stringify(storyResponse))
                return storyResponse
            })
            // .then(storyResponse => {
            //     const timestamp = new Date().toISOString();
            //     const filename = './storyResult' + timestamp + '.json'
            //     return writeJsonData(filename, data);
            // })
    })
