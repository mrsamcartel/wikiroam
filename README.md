# WikiRoam

**Better browsing for Wikipedia**

## Product Management

### Goals

1. Understand where a page fits into a topic
2. Discover adjacent topics

### Non-Goals

* Identify trending articles
* Visualize the user's journey

### Features

* Search articles by keywords
* Preview an article
* Crawl related articles

--- MVP
* Bucketize strongly related articles in topics
* Display a list of topics related to an article
* Display a list of specialized articles within the topic
* Display a list of adjacent topics
* Filter searches by topics
* Star articles within reading lists
* Manage reading lists

### User Flow

1. Launch
2. Intro with demo
3. Search
4. Select one
5. Explore related articles

### Wireframe

* Search - searchbox with list of articles populated dynamically
* Article - Description, with one pane per related topic, containing top articles
* Topic - Top articles within topic and list of sub-topics

## Frontend

TBD

## Backend

### API

* api/wikipages [GET / POST]

### MediaWiki action API

* Get page by pageid: `https://en.wikipedia.org/?curid=736`
* Get pageinfo by pageid: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&pageids=736`
* Get WhatLinksHere by pageid: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=linkshere&pageids=736`
* Get WhatLinksHere by pageid for articles only: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=linkshere&pageids=736&lhnamespace=0`

### [AWS.DynamoDB.DocumentClient](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) API

Get a client with `const dynamoDb = new AWS.DynamoDB.DocumentClient();` then provide callbacks in the form `function(err, data)` and `params` in the form:
```
var params = {
    ExpressionAttributeNames: {
        "AT": "AlbumTitle",
        "ST": "SongTitle"
    },
    ExpressionAttributeValues: {
        ":a": {
            S: "No One You Know"
        }
    },
    FilterExpression: "Artist = :a",
    ProjectionExpression: "#ST, #AT",
    TableName: "Music"
};
```

Key methods:
* `dynamoDb.get(params = {}, callback) ⇒ AWS.Request` returns a set of attributes for the item with the given primary key
* `dynamoDb.scan(params = {}, callback) ⇒ AWS.Request` returns one or more items and item attributes by accessing every item in a table or a secondary index
* `dynamoDb.put(params = {}, callback) ⇒ AWS.Request` creates a new item, or replaces an old item with a new item (entirely!)
* `dynamoDb.update(params = {}, callback) ⇒ AWS.Request` edits an existing item's attributes, or adds a new item to the table if it does not already exist

### AWS Tips, Tricks & Resources

* [Awesome Serverless Master List](https://github.com/anaibol/awesome-serverless)
* [How to setup API Gateway behind a custom name](http://www.davekonopka.com/2016/serverless-aws-lambda-api-gateway.html) (hint: a certificate is required)
* [Hands-on serverless guide](https://github.com/shekhargulati/hands-on-serverless-guide)
* [Fullstack Serverless Guide](http://serverless-stack.com/)
* [Reference Serverless Architecture on AWS](https://www.slideshare.net/mitocgroup/serverless-microservices-real-life-story-of-a-web-app-that-uses-angularjs-aws-lambda-and-more)
* [Serverless Client S3 Plugin](https://github.com/serverless/serverless-client-s3)
* [Serverless REvolution for Everyone](http://thewebivore.com/serverless-revolution-for-everyone/)
* [Bustle Architecture Case Study](https://aws.amazon.com/solutions/case-studies/bustle/)

## Learning Objectives

* Javascript
* Angular
* RxJS for dynamic search
* AWS APIs (DynamoDB | API Gateway)
* Serverless ([github](https://github.com/serverless/serverless) | [website](https://serverless.com/))

## Product Management Learnings

Pyramid of Design: Functional > Reliable > Usable > Emotional.

The MVP should cut across levels, rather than focus on breadth of functionalities.