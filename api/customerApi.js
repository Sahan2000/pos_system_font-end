export class CustomerApi{

    generateCustomerId(){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/page/customer",
                data:{
                    action: 'generateCustomerId'
                },
                success: function(response) {
                    resolve(response);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Error:', jqXHR.status, jqXHR.statusText);
                    reject(new Error(`AJAX request failed with status ${jqXHR.status}`));
                }
            });
        });
    }

    getCustomer(custId){
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/page/student?action=getStudent&studentId=" + stuId,
            data:{
                action: 'getCustomer',
                customerId: custId
            },
            contentType: "application/json", // Assuming the response is in JSON format
        });
    }

    saveCustomer(customer){
        let customerJson = JSON.stringify(customer);

        const sendAjax = (customerJson)=>{
            $.ajax({
                url: "http://localhost:8080/page/customer",
                type: "POST",
                data: customerJson,
                contentType: "application/json",
                success: function (){
                    Swal.fire({
                        icon: 'success',
                        title: 'Customer Saved Successful',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }
        console.log('Save customer call');
        sendAjax(customerJson);
    }

    getAllCustomer(){
        return $.ajax({
            url: "http://localhost:8080/page/customer",
            type:"GET",
            data: {
                action: 'getAllCustomer',
            },
            contentType: "application/json"
        })
    }
}