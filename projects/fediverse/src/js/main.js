/* globals Chart, scrollama, moment */

// global modules
import ready from '/js/modules/ready.min.js';
import loadData from '/js/modules/loadData.min.js';
import getUrlParams from '/js/modules/getUrlParams.min.js';

// local modules
import signIn from './modules/signIn.min.js';
import getData from './modules/getData.min.js';
import showData from './modules/showData.min.js';

let userData;
const signInForm = document.getElementById('sign-in-form');

ready(async () => {
    signInForm.addEventListener('submit', signIn);
    userData = await loadData('fediverseUserData');

    if (userData){
        getUrlParams(true);
        showData(userData);
    } else {
        getData();
    }    
});
