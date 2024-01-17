export class UserApi{
    saveUser(user){
        const userJson = JSON.stringify(user);

        const sendAjax = (userJSON) =>{
            $.ajax({
                url:"http://localhost:8080/page/user",
                type: "POST",
                data: userJSON,
                contentType: "application/json",
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'User Saved Successful',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }

        console.log('SAve user call');
        sendAjax(userJson);
    }

    getUser(userName,userPassword){
        if (userName) {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/page/user',
                data: {
                    action: 'checkUser',
                    userName: userName
                },
                success: function (responseText) {
                    let user = responseText;
                    if (typeof responseText === 'string') {
                        // If it's a string, parse it as JSON
                        user = JSON.parse(responseText);
                    }

                    if (userName === user.userName && userPassword === user.password) {
                        const loadingScreen = $('#login_page');
                        loadingScreen.hide();

                        const loadingScreen1 = $('#dashboard_page');
                        loadingScreen1.show();

                        const loadingScreen2 = $('#Home');
                        loadingScreen2.show();

                        const loadingScreen3 = $('#customer');
                        loadingScreen3.hide();
                    }
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }
    }
}