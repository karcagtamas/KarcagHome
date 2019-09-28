<template>
  <div class="frame">
    <div class="login">
      <div class="title">Bejelentkezés</div>
      <div class="error alert alert-danger mt-4" v-if="error">
        <strong>HIBA!</strong>
        {{error}}
      </div>
      <div class="form-group">
        <label>Felhasználónév:</label>
        <input class="form-control" type="text" name="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Jelszó:</label>
        <input class="form-control" type="password" name="password" v-model="password" />
      </div>
      <button class="btn btn-primary" @click="login">Bejelentkezés</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LoginService from '../services/LoginService';
import router from '../router';

@Component({})
export default class Login extends Vue {
  private username: string = '';
  private password: string = '';
  private error: string = '';

  public login(): void {
    if (!this.username) {
      this.setAlert('A felhasználó név megadás kötelező!');
      return;
    }
    if (!this.password) {
      this.setAlert('A jelszó megadása kötelező!');
      return;
    }
    LoginService.checkLogin(this.username, this.password).then(res => {
      if (res) {
        router.replace('/');
      } else {
        this.setAlert('A belépési adatok hibásak!');
      }
    });
  }

  public setAlert(alert: string): void {
    this.error = alert;
    setTimeout(() => {
      this.error = '';
    }, 2000);
  }
}
</script>

<style scoped>
.frame {
  padding: 10rem 20rem;
}
.login {
  border-radius: 10px;
  border: 1px solid #333;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px 1px #000;
}

.login .title {
  text-align: center;
  margin: auto;
  background-color: #6a2cfa;
  color: white;
  border-radius: 10px;
  padding: 1rem 3rem;
  width: max-content;
  font-size: 2rem;
  font-weight: bold;
  box-shadow: 0 0 10px 1px #000;
  transition-duration: 0.5s;
}

.login .title:hover {
  transform: scale(1.3, 1.3);
  transition-duration: 0.5s;
}

.login label {
  font-weight: bold;
  font-size: 1.2rem;
}
button {
  display: block;
  margin: auto;
  font-size: 1.4rem;
  background-color: #9569fd;
  border: 1px solid #9569fd;
  transition-duration: 0.5s;
}
button:hover {
  transition-duration: 0.5s;
  background-color: #6a2cfa;
  transform: scale(1.2, 1.2);
}
</style>