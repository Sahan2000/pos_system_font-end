let customer_id = $('#customerId');

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

export class CustomerApi{

    generateCustomerId(){
        $.ajax({
            url: "http://localhost:8080/page/customer",
            type:"GET",
            data :{
                action : 'generateCustomerId'
            },

            success:function (data){
                console.log(data.customerId);
                customer_id.val(data.customerId);
            },
            error: function (xhr,status,error){
                showError('Fetching Error', 'Error generating customer ID');
                console.error('Error generating customer ID:', error);
            }
        })
    }
}