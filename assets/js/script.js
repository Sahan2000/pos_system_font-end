$(document).ready(function (){
    $('#signUpBtn').eq(0).on('click',function (){
        const loadingScreen = document.querySelector('#sign_up_page');
        loadingScreen.style.display = 'block';

        const loadingScreen1 = document.querySelector('#login_page');
        loadingScreen1.style.display = 'none';

        const loadingScreen2 = document.querySelector('#dashboard_page');
        loadingScreen2.style.display = 'none';
    });

    $('#signInBtn').eq(0).on('click',function (){
        const loadingScreen = document.querySelector('#sign_up_page');
        loadingScreen.style.display = 'none';

        const loadingScreen1 = document.querySelector('#login_page');
        loadingScreen1.style.display = 'block';

        const loadingScreen2 = document.querySelector('#dashboard_page');
        loadingScreen2.style.display = 'none';
    });

    $('#')

});
window.addEventListener('load',function (){
    const loadingScreen = document.querySelector('#sign_up_page');
    loadingScreen.style.display = 'none';

    const loadingScreen1 = document.querySelector('#login_page');
    loadingScreen1.style.display = 'block';

    const loadingScreen2 = document.querySelector('#dashboard_page');
    loadingScreen2.style.display = 'none';
});
