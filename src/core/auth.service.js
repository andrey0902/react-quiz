import axios from 'axios';
const apiKey = 'AIzaSyDabDqZBRMJWgrygYq-YTkDB2ZNxYkEpys';
class AuthService {
  signUp(data) {
    const test = {
      email: data.email,
      password: data.password,
    }
    test.returnSecureToken = true;
    return axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, test
    )
  }

  signIn(data) {
    data.returnSecureToken = true;
    return axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, data
    )
  }
}

export default AuthService;