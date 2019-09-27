import axios from 'axios';

class LoginService {
  public static checkLogin(
    username: string,
    password: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios
        .post('http://localhost:8000/api/users/login', { username, password })
        .then(res => {
          if (res.data.success) {
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

  public static isLoggedIn(): Promise<boolean> {
    const token: string = localStorage.getItem('token') || '';
    const userId: number = parseInt(
      localStorage.getItem('userId') || '0',
      undefined
    );
    return new Promise((resolve, reject) => {
      if (!token) {
        resolve(false);
      }
      axios
        .post('http://localhost:8000/api/users/token', { token, userId })
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
