export class ItemApi{
    generateItemCode(){
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/page/item",
                data:{
                    action: 'generateItemCode'
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

    saveItem(item){
        return new Promise((resolve, reject)=>{
            let itemJson = JSON.stringify(item);

            const sendAjax = (customerJson)=>{
                $.ajax({
                    url: "http://localhost:8080/page/item",
                    type: "POST",
                    data: itemJson,
                    contentType: "application/json",
                    success: function (responseText){
                        resolve(responseText);
                    }
                });
            }
            console.log('Save item call');
            sendAjax(itemJson);
        })
    }

    getItem(code){
        return $.ajax({
            type: "GET",
            url: "http://localhost:8080/page/item",
            data:{
                action: 'getCustomer',
                customerId: code
            },
            contentType: "application/json", // Assuming the response is in JSON format
        });
    }
}