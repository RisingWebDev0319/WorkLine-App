import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { RegisterPage } from './register/register';
import { LoginPage } from './login/login';
import { ForgotPassPage } from './forgot-pass/forgot-pass';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            { path: '', component: HomePage },
            { path: 'register', component: RegisterPage },
            { path: 'login', component: LoginPage },
            { path: 'forgot-pass', component: ForgotPassPage }
        ]
    }
];

export const AuthRouting = RouterModule.forChild(routes);
