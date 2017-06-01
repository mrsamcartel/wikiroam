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

### MediaWiki action API

* Get page by pageid: `https://en.wikipedia.org/?curid=736`
* Get WhatLinksHere by pageid: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=linkshere&pageids=736`
* Get WhatLinksHere by pageid for articles only: `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=linkshere&pageids=736&lhnamespace=0`

### AWS Tips and Tricks

* [How to setup API Gateway behind a custom name](http://www.davekonopka.com/2016/serverless-aws-lambda-api-gateway.html) (hint: a certificate is required)

## Learning Objectives

* Javascript
* Angular
* RxJS for dynamic search
* Mongo
* [Serverless](https://github.com/serverless/serverless)

## Product Management Learnings

Pyramid of Design: Functional > Reliable > Usable > Emotional.

The MVP should cut across levels, rather than focus on breadth of functionalities.