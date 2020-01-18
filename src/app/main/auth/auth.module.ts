
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AuthRouting } from './auth.routing';
import { AuthComponent } from './auth.component';
import { HomePage } from './home/home.page';
import { RegisterPage } from './register/register';
import { LoginPage } from './login/login';
import { ForgotPassPage } from './forgot-pass/forgot-pass';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthRouting,
  ],
  declarations: [
    AuthComponent,
    HomePage,
    RegisterPage,
    LoginPage,
    ForgotPassPage
  ],
  providers: [
    UserService,
    UtilService
  ]
})

export class AuthModule { }
