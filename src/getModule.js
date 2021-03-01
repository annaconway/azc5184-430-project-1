const handleResponse = (xhr) => {
  const obj = JSON.parse(xhr.target.response); // turn xhr back into an object
  console.log('obj=', obj);
  console.log(obj.length);

  const container = document.querySelector('#routines');

  for (let i = 1; i < obj.length; i += 1) {
    container.innerHTML += `
              <div class="results">
                <span>Name: ${obj[i].name}</span>
                <span>Skin Type: ${obj[i].skinType}</span>
                <span>Skin Concerns: ${obj[i].skinConcerns}</span>
                <span>Cleanser: ${obj[i].cleanser}</span>
                <span>Moisturizer: ${obj[i].moisturizer}</span>
                <span>Sunscreen: ${obj[i].sunscreen}</span>
                <span><p><button class="editButton">Edit</button></p></span>
                </div>
             `;
  }
};

const downloadRoutines = (e) => {
  const routineURL = '/routines';
  const routinesURL = '/routines?limit=10';
  const xhr = new XMLHttpRequest();
  xhr.onload = handleResponse;

  // Return 1 routine
  if (e.target.id === 'btnRoutine') {
    xhr.open('GET', routineURL);
    // Return multiple
  } else if (e.target.id === 'btnRoutines') {
    xhr.open('GET', routinesURL);
  }

  xhr.setRequestHeader('Accept', 'application/javascript');
  xhr.send();
};

const init = () => {
  if (document.querySelector('#btnRoutine')) document.querySelector('#btnRoutine').addEventListener('click', downloadRoutines);
  if (document.querySelector('#btnRoutines')) document.querySelector('#btnRoutines').addEventListener('click', downloadRoutines);
  downloadRoutines();
};

window.onload = init;
