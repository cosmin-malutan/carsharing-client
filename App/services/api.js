
class ApiClass {
  static call(url, options = {}) {
    return new Promise((resolve, reject) => fetch(url, options)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      }));
  }
  static login(email, password) {
    return new Promise((resolve, reject) => {
      ApiClass.call('http://10.0.2.2:8080/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }).then((response) => {
        return response.json();
      }).then((response) => {
        resolve(response);
      }).catch(err => reject(err));
    });
  }
}

export default ApiClass;