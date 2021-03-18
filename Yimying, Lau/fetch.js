
const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method, 
    body: JSON.stringify(data),
    headers: data ? {'Content-Type': 'application/json'} : {}
  }).then(response => {
    if (response.status >= 400) {
      return response.json().then(errResData => {
        const error = new Error('Error');
        error.data = errResData;
        throw error; 
      });
    }
    return response.json();
  });
};

const getData = () => {
  sendHttpRequest('GET', 'http://127.0.0.1:5500/Client%20Profile.html')
  .then(responseData => {
    console.log(responseData);
  });
  /*
  const profile = new XMLHttpRequest();
  profile.open('GET', 'https://CilentProfile.html');

  profile.onload = () => {
    console.log(profile.response);
  };
  profile.send();
  */
};

const sentData = () => {
  sendHttpRequest('POST', 'http://127.0.0.1:5500/Fuel%20Quote%20History.html', {
    name: 'Max', 
   // password: 'Max'
  })
  .then((responseData) => {
    console.log(responseData);
  })
  .catch(err => {
    console.log(err, err.data);
  });
};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sentData);
