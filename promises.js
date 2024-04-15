

async function getJobAsync()
{
    let response = await fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`);
    let data = await response.body
    return data;
}
getJobAsync('jobPositionHere')
    .then(data => console.log(data));


const getResult = async (request) => {
    let response = await new Promise((resolve, reject) => {
        request((err, res, body) => {
            if (err) return reject(err);
            try{
                resolve(JSON.parse(body));
            } catch(error) {
                reject(error);
            }
        });
    });

    try{
        console.log(response);
    }
    catch(err){
        console.error(err);
    }
}

getResult();
console.log('This is how to return async JavaScript');