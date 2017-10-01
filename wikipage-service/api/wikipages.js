'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));
const request = require('request-promise');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const headers = {
  "Access-Control-Allow-Origin": "*", // Required for CORS support to work
  "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
}

const datalog = (metric_name, metric_type='count', metric_value=1, tags=[]) => {
  // MONITORING|unix_epoch_timestamp|metric_value|metric_type|my.metric.name|#tag1:value,tag2
  const timestamp = new Date().getTime();
  tags.push(`service:${process.env.SERVICE}`);
  tags.push(`stage:${process.env.STAGE}`);
  var log_entry = `MONITORING|${timestamp}|${metric_value}|${metric_type}|${process.env.LOG_PREFIX}.${metric_name}|#${tags.join(',')}`;
  console.log(log_entry);
}

// wikipagesSubmit function
//TODO: Refactor to align structure with other functions within the service
module.exports.submit = (event, context, callback) => {
  const start_time = new Date().getTime();
  const requestBody = JSON.parse(event.body);
  const title = requestBody.title;
  const pageid = requestBody.pageid;

  if (typeof title !== 'string' || typeof pageid !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit wikipage because of validation errors.'));
    return;
  }

  //TODO: Avoid storing duplicate pageids; retrieve id and updateItem instead
  submitWikipageP(wikipageInfo(pageid, title))
    .then(res => {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          message: `Sucessfully submitted wikipage with pageid ${pageid} and title ${title}`,
          wikipageId: res.id
        })
      }
      datalog('db.responses', undefined, undefined,['status:200']);
      datalog('db.latency', 'histogram', (new Date().getTime())-start_time);
      callback(null, response);
    })
    .catch(err => {
      console.log(err);
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({
          message: `Unable to submit candidate with pageid ${pageid} and title ${title}`
        })
      };
      datalog('db.responses', undefined, undefined,['status:500'])
      callback(null, response);
    })
};

const submitWikipageP = wikipage => {
  console.log('Submitting wikipage');
  datalog('db.queries.put');
  const wikipageInfo = {
    TableName: process.env.WIKIPAGE_TABLE,
    Item: wikipage,
  };
  return dynamoDb.put(wikipageInfo).promise()
    .then(res => wikipage);
};

const wikipageInfo = (pageid, title) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    title: title,
    pageid: pageid,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};

// wikipagesList function
module.exports.list = (event, context, callback) => {
  const start_time = new Date().getTime();
  var params = {
    TableName: process.env.WIKIPAGE_TABLE,
    ProjectionExpression: "id, pageid, title"
  };

  console.log("Scanning Wikipage table.");
  datalog('db_scans');

  const onScan = (err, data) => {
    if (err) {
      console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
      datalog('db.responses', undefined, undefined,['status:500'])
      callback(err);
    } else {
      console.log("Scan succeeded.");
      datalog('db.responses', undefined, undefined,['status:200']);
      datalog('db.scan_count', 'histogram', data.Count);
      datalog('db.latency', 'histogram', (new Date().getTime())-start_time);
      return callback(null, {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          wikipages: data.Items
        })
      });
    }
  };

  dynamoDb.scan(params, onScan);
}

// wikipagesGet function
module.exports.get = (event, context, callback) => {
  const start_time = new Date().getTime();
  const id = event.pathParameters.id;

  if (typeof id !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t get wikipage because of validation errors.'));
    return;
  }

  var params = {
    TableName: process.env.WIKIPAGE_TABLE,
    Key : { 
      id: id,
    },
  }

  console.log(`Getting Wikipage item with id: ${id}.`);
  datalog('db.queries.get');

  const onGet = (err, data) => {
    if (err) {
      console.log('Get failed to load data. Error JSON:', JSON.stringify(err, null, 2));
      datalog('db.responses', undefined, undefined,['status:500'])
      callback(err);
    } else {
      console.log("Get succeeded.");
      datalog('db.responses', undefined, undefined,['status:200']);
      datalog('db.latency', 'histogram', (new Date().getTime())-start_time);
      return callback(null, {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(data.Item)
      });
    }
  };

  dynamoDb.get(params, onGet);
}

// wikipagesUpdate function
module.exports.update = (event, context, callback) => {
  const start_time = new Date().getTime();
  const id = event.pathParameters.id;

  if (typeof id !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update wikipage because of validation errors.'));
    return;
  }

  const data = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  data.updatedAt = timestamp;

  //TODO: Handle missing attributes in request. Right now they'd cause an error in DynamoDB.update
  var params = {
    TableName: process.env.WIKIPAGE_TABLE,
    Key : { 
      id: id,
    },
    ExpressionAttributeValues: {
      ':title': data.title,
      ':pageid': data.pageid,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET title = :title, pageid = :pageid, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  }

  console.log(`Updating Wikipage item with id: ${id}.`);
  datalog('db.queries.update');

  const onUpdate = (err, data) => {
    if (err) {
      console.log('Put failed to update data. Error JSON:', JSON.stringify(err, null, 2));
      datalog('db.responses', undefined, undefined,['status:500'])
      callback(err);
    } else {
      console.log("Put succeeded.");
      datalog('db.responses', undefined, undefined,['status:200']);
      datalog('db.latency', 'histogram', (new Date().getTime())-start_time);
      return callback(null, {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(data.Attributes),
      });
    }
  };

  dynamoDb.update(params, onUpdate);
}

// wikipagesSearch function
module.exports.search = (event, context, callback) => {
  const start_time = new Date().getTime();
  const word = event.pathParameters.word;

  console.log("Searching Wikipedia by keyword.");
  datalog('search.queries');

  var params = {
    method: 'GET',
    uri: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&generator=search&gsrnamespace=0&gsrsearch=${word}`,
    headers: {
      'User-Agent': 'Wikiskim'
    },
    json: true // Automatically parses the JSON string in the response
  };

  request(params)
  .then(res => {
    console.log("Search succeeded.");
    console.log(`returned data: ${JSON.stringify(res)}`);
    datalog('search.responses', undefined, undefined,['status:200']);
    datalog('search.latency', 'histogram', (new Date().getTime())-start_time);
    return callback(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(res)
    });
  })
  .catch(err => {
    console.log('Search failed to return data. Error JSON:', err);
    datalog('search.responses', undefined, undefined,['status:500']);
    callback(err);
  });
}