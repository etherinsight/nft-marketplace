'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  
  console.log(event.pathParameters.id);
  const params = {
    
     TableName: process.env.DYNAMODB_TABLE,

  KeyConditionExpression: 'OwnerAccountAddress = :hkey',
  ExpressionAttributeValues: {
    ':hkey': event.pathParameters.id
  },
  
  
   
 
  };

  // fetch todo from the database
  dynamoDb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the item.',
      });
      return;
    }
    
    console.log(result);
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
