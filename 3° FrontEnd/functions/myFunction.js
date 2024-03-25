exports.handler = async function (event, context) {
    const apiUrl = process.env.API_URL;
    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: `API Key: ${apiUrl}` }),
    };
    return response;
};
  
  