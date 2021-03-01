//------------------------
// AJAX MODULE JS THAT
// HANDLES POSTING ROUTINES
//------------------------
// ATTACHED TO INPUT.HTML
//------------------------

//------------------------
// PARSE JSON CONTENT
//------------------------
const parseJSON = (xhr, content) => {
    if (xhr.response && xhr.getResponseHeader('Content-Type') === 'application/json') {
        const obj = JSON.parse(xhr.response);
        console.dir(obj);
        if (obj.message) {
            content.innerHTML += `<p>${obj.message}</p>`;
        }
    }
};

//------------------------
// HANDLE RESPONSE CODES
//------------------------
const handleResponse = (xhr) => {
    const codes = document.querySelector('#responseCodes');

    switch (xhr.status) {
        case 200:
            codes.innerHTML = '<p><b>Success!</b></p>';
            break;
        case 201:
            codes.innerHTML = '<p><b>Created!</b></p>';
            break;
        case 204:
            codes.innerHTML = '<p><b>Updated (No Content)!</b></p>';
            break;
        case 400:
            codes.innerHTML = '<p><b>Bad Request!</b></p>';
            break;
        default:
            codes.innerHTML = '<p><b>Error code not implemented by client</b></p>';
    }

    parseJSON(xhr, codes);
};

//------------------------
// RECEIVE FORM ATTRIBUTES
// AND SEND THEM TO BE 
// PARSED INTO JSON
//------------------------
const sendPost = (e, form) => {
    e.preventDefault();

    // Grab form attributes
    const formAction = form.getAttribute('action');
    const formMethod = form.getAttribute('method');

    // Grab input types
    const nameField = form.querySelector('#nameField');
    const cleanserField = form.querySelector('#cleanserField');
    const moisturizerField = form.querySelector('#moisturizerField');
    const sunscreenField = form.querySelector('#sunscreenField');

    // Request data
    const xhr = new XMLHttpRequest();
    xhr.open(formMethod, formAction); // NEW - in the past we've been using "GET"

    // Set headers (encode them in the URL)
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = () => handleResponse(xhr);

    // Create data string
    const formData = `name=${nameField.value}&cleanser=${cleanserField.value}&moisturizer=${moisturizerField.value}&sunscreenField=${sunscreenField.value}`;

    // Send the data string to the URL
    xhr.send(formData);

    return false; // prevents event bubbling
};

//------------------------
// INITALIZE ELEMENTS
//------------------------
const init = () => {
    // Grab the html element of the form
    const personalForm = document.querySelector('#personalForm');

    // Set up the post method
    const addRoutine = (e) => sendPost(e, personalForm);

    // Attach post method to submit button
    personalForm.addEventListener('submit', addRoutine);
};

window.onload = init;