//------------------------
// SERVER JS THAT HANDLES
// API AND SERVER REPSONSES
//------------------------

// CALL UNDERSCORE FOR SHUFFLING
const _ = require('underscore');

//------------------------
// OBJECT FULL OF ROUTINE OBJECTS
//------------------------
const routine = {
  Anna: {
    name: 'Anna',
    skinType: 'Combination',
    skinConcerns: 'Acne, Scars, Dullness',
    cleanser: 'La Roche-Posay Toleriane Hydrating cleanser',
    moisturizer: 'APIEU Madecassoside Cream ',
    sunscreen: 'Purito Centella Sunscreen',
  },
  Matthew: {
    name: 'Matthew',
    skinType: 'Oily',
    skinConcerns: 'Acne, Maintenance',
    cleanser: 'La Roche-Posay Effacler Gel cleanser',
    moisturizer: 'CeraVe Moisturizing Cream',
    sunscreen: 'Blue Lizard Australian Baby Mineral Sunscreen SPF 50+',
  },
  Julie: {
    name: 'Julie',
    skinType: 'Combination',
    skinConcerns: 'Acne, Blackheads, Dullness',
    cleanser: 'Neutrogena Clay Cleanser For Oily Skin',
    moisturizer: 'Neutrogena Pink Grapefruit Oil Free Moisturizer ',
    sunscreen: 'Blue Lizard Australian Baby Mineral Sunscreen SPF 50+',
  },
  Aaron: {
    name: 'Aaron',
    skinType: 'Combination',
    skinConcerns: 'Acne, Maintenance',
    cleanser: 'Neutrogena Oil-Free Acne Wash',
    moisturizer: 'CeraVe Moisturizing Cream',
    sunscreen: 'Blue Lizard Australian Baby Mineral Sunscreen SPF 50+',
  },
};

//------------------------
// ARRAY FILLED WITH ROUTINE OBJECTS
//------------------------
const routineArray = [{
  name: 'Anna',
  skinType: 'Combination',
  skinConcerns: 'Acne, Scars, dullness',
  cleanser: 'La Roche-Posay Toleriane Hydrating cleanser',
  moisturizer: 'APIEU Madecassoside Cream ',
  sunscreen: 'Purito Centella Sunscreen',
},
{
  name: 'Matthew',
  skinType: 'Oily',
  skinConcerns: 'Acne, Maintenance',
  cleanser: 'La Roche-Posay Effacler Gel cleanser',
  moisturizer: 'CeraVe Moisturizing Cream',
  sunscreen: 'Blue Lizard Australian Baby Mineral Sunscreen SPF 50+',
},
{
  name: 'Julie',
  skinType: 'Combination',
  skinConcerns: 'Acne, Blackheads, Dullness',
  cleanser: 'Neutrogena Clay Cleanser For Oily Skin',
  moisturizer: 'Neutrogena Pink Grapefruit Oil Free Moisturizer ',
  sunscreen: 'Blue Lizard Australian Baby Mineral Sunscreen SPF 50+',
},
{
  name: 'Aaron',
  skinType: 'Combination',
  skinConcerns: 'Acne, Maintenance',
  cleanser: 'Neutrogena Oil-Free Acne Wash',
  moisturizer: 'CeraVe Moisturizing Cream',
  sunscreen: 'Blue Lizard Australian Baby Mineral Sunscreen SPF 50+',
},
];

//------------------------
// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
//------------------------
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

//------------------------
// GET JSON
//------------------------
const getRandomJSON = (num) => {
  // Assure num is a number & validate it
  let limit = Number(num);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > routineArray.length ? routineArray.length : limit;

  // Shuffle array of jokes
  const shuffle = _.shuffle(routineArray);
  const temp = [];

  // Fill new array using limit
  for (let i = 0; i < limit; i += 1) {
    temp[i] = shuffle[i];
  }

  // Return joke array
  return JSON.stringify(temp);
};

//------------------------
// GET RANDOM XML
//------------------------
const getRandomXML = (num) => {
  // Assure num is a number & validate it
  let limit = Number(num);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > routineArray.length ? routineArray.length : limit;

  // Shuffle array of jokes
  const shuffle = _.shuffle(routineArray);
  const temp = [];

  // Fill new array using limit
  for (let i = 0; i < limit; i += 1) {
    temp[i] = `<joke><q>${shuffle[i].q}</q><a>${shuffle[i].a}</a></joke>`;
  }

  // Return first joke
  if (limit === 1) return temp[0];

  // Return joke array
  return `<jokes>${temp}</jokes>`;
};

//------------------------
// SEND RESPONSE TO THE SERVER
//------------------------
const getRandomResponse = (request, response, params, acceptedTypes, httpMethod) => {
  // XML Data
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'HEAD') {
      const bytes = getBinarySize(getRandomXML(params));
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': bytes });
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getRandomXML(params));
      response.end();
    }
    // JSON Data
  } else if (httpMethod === 'HEAD') {
    const bytes = getBinarySize(getRandomJSON(params));
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': bytes });
    response.end();
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJSON(params));
    response.end();
  }
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

//------------------------
// API COMMANDS
//------------------------
const getRoutine = (request, response) => {
  const responseJSON = {
    routine,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getNameRoutine = (request, response, body) => {
  const temp = [];

  let responseCode = 204;

  // Filter temp array based off of name
  for (let i = 0; i < routineArray.length; i += 1) {
    // Grab the name
    const { name } = routineArray[i];

    // Sanitize and compare names
    // If a match, push to temp array.
    if (body === name.toLowerCase().trim()) {
      responseCode = 200;
      temp.push({
        name: routineArray[i].name,
        skinType: routineArray[i].skinType,
        skinConcerns: routineArray[i].skinConcerns,
        cleanser: routineArray[i].cleanser,
        moisturizer: routineArray[i].moisturizer,
        sunscreen: routineArray[i].sunscreen,
      });
    }
  }
  const responseJSON = {
    temp,
  };

  // If array has any temp values
  if (responseCode === 200) {
    respondJSON(request, response, responseCode, responseJSON);
  } else { // If not skin types returned
    respondJSON(request, response, responseCode, responseJSON);
  }
};

const getSkinTypeRoutine = (request, response, body) => {
  const temp = [];

  let responseCode = 204;

  // Filter temp array based off of skin type
  for (let i = 0; i < routineArray.length; i += 1) {
    // Grab the skin type
    const { skinType } = routineArray[i];

    // Sanitize and compare skin types
    // If a match, push to temp array.
    if (body === skinType.toLowerCase().trim()) {
      responseCode = 200;
      temp.push({
        name: routineArray[i].name,
        skinType: routineArray[i].skinType,
        skinConcerns: routineArray[i].skinConcerns,
        cleanser: routineArray[i].cleanser,
        moisturizer: routineArray[i].moisturizer,
        sunscreen: routineArray[i].sunscreen,
      });
    }
  }

  const responseJSON = {
    temp,
  };

  // If array has any temp values
  if (responseCode === 200) {
    respondJSON(request, response, responseCode, responseJSON);
  } else { // If not skin types returned
    respondJSON(request, response, responseCode, responseJSON);
  }
};

/*
const editRoutine = (request, response, body) => {
  const responseJSON = {
    message: 'Params are required (MIN: NAME, CLEANSER, MOISTURIZER)',
  };

  // Missing params?
  if (!body.name || !body.cleanser || !body.moisturizer) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON); // 400 = bad request
  }

  routine[body.index] = {
    name: body.name,
    skinType: body.skinType,
    skinConcerns: body.skinConcerns,
    cleanser: body.cleanser,
    moisturizer: body.moisturizer,
    sunscreen: body.sunscreen,
  };

  const responseCode = 204;

  return respondJSONMeta(request, response, responseCode); // this is for 204, a "no content" header
};
*/

const addRoutine = (request, response, body) => {
  const responseJSON = {
    message: 'Params are required (MIN: NAME, CLEANSER, MOISTURIZER)',
  };

  // Missing params?
  if (!body.name || !body.cleanser || !body.moisturizer) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON); // 400 = bad request
  }

  // Params verified
  let responseCode = 201; // "created"
  if (routine[body.name]) { // user exists
    responseCode = 204; // updating, so "no content"
  } else {
    routine[body.name] = {}; // make a new user
  }

  // Update or Initialize values
  routine[body.name].name = body.name;
  routine[body.name].skinType = body.skinType;
  routine[body.name].skinConcerns = body.skinConcerns;
  routine[body.name].cleanser = body.cleanser;
  routine[body.name].moisturizer = body.moisturizer;
  routine[body.name].sunscreen = body.sunscreen;

  if (responseCode === 201) {
    // Push to API
    routineArray.push(routine[body.name]);

    // Send JSON message
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode); // this is for 204, a "no content" header
};

/*
const deleteRoutine = (request, response, body) => {
  const responseJSON = {
    message: "Can't delete routine",
  };

  let responseCode = 200;

  // Grab the routine to delete
  const index = Number(body.index);

  if (routine[index]) { // user exists
    // Deletion success
    responseCode = 200;
  } else {
    // User not found
    responseCode = 404;
  }

  if (responseCode === 200) {
    // Delete it at the index
    routineArray.splice(routine, 1);

    // Update the API
    for (let i = 1; i < routineArray.length; i += 1) {
      routineArray[i].index = i;
    }

    // Send JSON message
    responseJSON.message = 'Deleted Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode); // this is for 404
};
*/

module.exports = {
  getRoutine,
  addRoutine,
  getRandomResponse,
  getSkinTypeRoutine,
  getNameRoutine,
};
