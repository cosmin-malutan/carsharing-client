const default_options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}
const DIRECTIONS_API = "https://maps.googleapis.com/maps/api/directions/json";
const GOOGLE_API_KEY = "AIzaSyDc3Ez57UyPlbJ0glDFF6n1DorZFVjjQnk";

class ApiClass {
  static call(url, options = {}) {
    var options = Object.assign({}, default_options, options);

    return new Promise((resolve, reject) => fetch(url, options)
      .then((response) => {
        return response.json();
      }).then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      }));
  }

  static login(email, password) {
    return ApiClass.call('http://192.168.1.6:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
  }

  static signup(email, name, password) {
    return ApiClass.call('http://192.168.1.6:8080/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          username: name,
          password: password
        })
    });
  }

  static fecthTrip(origin, destination) {
    return ApiClass.call(`${DIRECTIONS_API}?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`);
  }
}

export default ApiClass;