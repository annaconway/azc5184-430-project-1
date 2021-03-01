//------------------------
// AJAX MODULE JS THAT
// HANDLES DOWNLOADING AND
// GRABBING ROUTINES
//------------------------
// ATTACHED TO ADMIN.HTML
//------------------------


//------------------------
// DOWNLOAD FROM JSON
//------------------------
const downloadRoutines = (e) => {
    // Grab URLs to download from
    const routineURL = '/routines';
    const routinesURL = '/routines?limit=10';
    const xhr = new XMLHttpRequest();
    xhr.onload = handleResponse;

    // Return 1 or >1 routine
    if (e.target.id === 'btnRoutine') {
        xhr.open('GET', routineURL);
    } else if (e.target.id === 'btnRoutines') {
        xhr.open('GET', routinesURL);
    }

    xhr.setRequestHeader('Accept', 'application/javascript');
    xhr.send();
};


//------------------------
// INITIALIZE ELEMENTS
//------------------------
const init = () => {
    if (document.querySelector('#btnRoutine')) {
        document.querySelector('#btnRoutine').addEventListener('click', downloadRoutines);
    }
    if (document.querySelector('#btnRoutines')) {
        document.querySelector('#btnRoutines').addEventListener('click', downloadRoutines);
    }
};


//------------------------
// PARSE JSON SO ITS 
// READABLE
//------------------------
const handleResponse = (xhr) => {
    // Turn xhr into JSON object that can be made readable
    const obj = JSON.parse(xhr.target.response);
    console.log('obj=', obj);
    console.log(obj.length);

    // Store container for AJAX call
    const container = document.querySelector('#routines');

    // Format into HTML
    if (obj.length === 1) {
        container.innerHTML = `
    <hr>
    <p><b>Name:</b> ${obj[0].name}</p>
    <p><b>Skin Type:</b> ${obj[0].skinType}</p>
    <p><b>Skin Concerns:</b> ${obj[0].skinConcerns}</p>
    <p><b>Cleanser:</b> ${obj[0].cleanser}</p>
    <p><b>Moisturizer:</b> ${obj[0].moisturizer}</p>
    <p><b>Sunscreen:</b> ${obj[0].sunscreen}</p>
    <p><button class="editButton">Edit</button></p>`;

    } else if (obj.length > 1) {
        container.innerHTML = "";
        for (let i = 0; i < obj.length; i += 1) {
            document.querySelector('#jokesContainer').innerHTML +=
                `<hr>
            <p><b>Name:</b> ${obj[i].name}</p>
            <p><b>Skin Type:</b> ${obj[i].skinType}</p>
            <p><b>Skin Concerns:</b> ${obj[i].skinConcerns}</p>
            <p><b>Cleanser:</b> ${obj[i].cleanser}</p>
            <p><b>Moisturizer:</b> ${obj[i].moisturizer}</p>
            <p><b>Sunscreen:</b> ${obj[i].sunscreen}</p>
            <p><button class="editButton">Edit</button></p>`;
        }
    }
};

window.onload = init;