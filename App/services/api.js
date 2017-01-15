const default_options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}

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
    return ApiClass.call('http://192.168.1.3:8080/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    });
  }

  static signup(email, name, password) {
    return ApiClass.call('http://192.168.1.3:8080/signup', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          username: name,
          password: password
        })
      });
    }
}

export default ApiClass;