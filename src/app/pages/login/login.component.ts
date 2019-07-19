import { Component } from '@angular/core';
import { LoginFormModel } from 'src/app/models/login-form.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})

export class LoginComponent {
  public userLoginForm: LoginFormModel = new LoginFormModel();

  constructor() { }

  onSubmit() {
    console.log(this.userLoginForm);
    // https://limitless-ridge-76594.herokuapp.com/
  }
}
