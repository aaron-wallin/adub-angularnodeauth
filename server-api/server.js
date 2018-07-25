'use strict';


const config = require('./configdata');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const launchDarkly = require('ldclient-node');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const ldclient = launchDarkly.init(config.launchDarklySdkKey());

// jwt middleware
const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.jwksUri()
    }),
   
    audience: config.audience(),
    issuer: config.issuer(),
    algorithms: ['RS256']
});

// feature setup 
var featureEnabled = false;

ldclient.on('ready', function() {
    console.log('in ready of ldclient');

    ldclient.variation('daily-deals-feature', {"key": "user@test.com"}, false,
     function(err, showFeature) {
         console.log('ldclient variation function callback hit');
         featureEnabled = showFeature;
     });
});

app.get('/', (req, res) => {
    res.json(null);
})

// new feature test
app.get('/api/deals/newfeature', (req, res) => {
    console.log('newfeature route accessed');
    console.log('featureEnabled = ' + featureEnabled);

    if (featureEnabled) {
        // application code to show the feature
        res.json(null);
      } else {
        // the code to run if the feature is off
        res.end(res.writeHead(401, 'Feature is not enabled'));
      }
});

// public route
app.get('/api/deals/public', (req, res) =>{

    let deals = [
        {
            id: 1,
            name: "item 1",
            description: "description 1",
            originalPrice: 10.00,
            salePrice: 7.50
        },
        {
            id: 2,
            name: "item 2",
            description: "description 2",
            originalPrice: 13.00,
            salePrice: 8.50
        }
    ];

    res.json(deals);
})

// private route
app.get('/api/deals/private', authCheck, (req, res) =>{
    
    let deals = [
        {
            id: 5,
            name: "item 5",
            description: "description 5",
            originalPrice: 20.00,
            salePrice: 3.50
        },
        {
            id: 6,
            name: "item 6",
            description: "description 6",
            originalPrice: 25.00,
            salePrice: 4.50
        }
    ];

    res.json(deals);
})

app.listen(process.env.PORT || 3001);
console.log('server listening')