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
            url: "http://localhost:8080/page/customer",
            data:{
                action: 'getCustomer',
                customerId: custId
            },
            contentType: "application/json", // Assuming the response is in JSON format
        });
    }

    saveCustomer(customer){
        return new Promise((resolve, reject)=>{
            let customerJson = JSON.stringify(customer);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: "http://localhost:8080/page/customer",
                    type: "POST",
                    data: customerJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save customer call');
            sendAjax(customerJson);
        })
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

    deleteCustomer(custId){
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:8080/page/customer?customerId="+custId,
                    success: function(responseText) {
                        console.log("Nipun");
                        resolve(responseText);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        reject(new Error(`AJAX request failed with status ${jqXHR.status}`));
                    }
                });
            });
    }

    updateCustomer(customer){
        return new Promise((resolve,reject)=>{
            let customerJson = JSON.stringify(customer);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url:"http://localhost:8080/page/customer",
                    type:"PUT",
                    data: customerJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                })
            }
            console.log("customer update call");
            sendAjax(customerJson);
        })
    }
}