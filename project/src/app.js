import { getUserData } from './utilies.js';

import { logout } from './api/api.js';
import { page, render } from './libra.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { dashboardPage } from './views/dashboard.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';



const root = document.getElementById('content')
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', onLogout)

page(decarateContext);

import *as api from'./api/data.js';
window.api=api;

page('/',homePage)
page('/login', loginPage);
page('/register',registerPage)
page('/dashboard',dashboardPage);
page('/create',createPage)
page('/details/:id',detailsPage);
page('/edit/:id',editPage)


updateUserNav();
page.start();

function decarateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');

}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('onlyUser').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block'
        document.getElementById('onlyGLogin').style.display = 'none';
        document.getElementById('onlyGRegister').style.display = 'none'
    } else {
        document.getElementById('onlyUser').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none'
        document.getElementById('onlyGLogin').style.display = 'block';
        document.getElementById('onlyGRegister').style.display = 'block'
    }
}