import axios from 'axios';

class LoginService {
  // Url
  public static url = 'http://localhost:8000/api';

  // Logout
  public static logout(): Promise<any> {
    // Get user id
    const userId: number = parseInt(
      localStorage.getItem('userId') || '0',
      undefined
    );
    // Get token
    const token: string = localStorage.getItem('token') || '';

    // Logout from the database
    return new Promise((resolve, reject) => {
      axios
        .post(`${LoginService.url}/users/logout`, { userId, token })
        .then(res => {
          resolve();
        })
        .catch(err => reject());
    });
  }

  // Check user input and login if these are correct
  public static checkLogin(
    username: string,
    password: string
  ): Promise<boolean> {
    // Login
    return new Promise((resolve, reject) => {
      axios
        .post(`${LoginService.url}/users/login`, { username, password })
        .then(res => {
          if (res.data.success) {
            // Set token and user id into the local storage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => resolve(false));
    });
  }

  // User is logged in
  public static isLoggedIn(): Promise<boolean> {
    // Get token and user id from the local storage
    const token: string = localStorage.getItem('token') || '';
    const userId: number = parseInt(
      localStorage.getItem('userId') || '0',
      undefined
    );
    // Checking
    return new Promise((resolve, reject) => {
      if (!token) {
        resolve(false);
      }
      axios
        .post(`${LoginService.url}/users/token`, { token, userId })
        .then(res => {
          resolve(res.data.valid);
        })
        .catch(err => {
          resolve(false);
        });
    });
  }
}

export default LoginService;
