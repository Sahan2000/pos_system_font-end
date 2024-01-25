export class OrderApi{
    generateOrderId(){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:8080/page/order",
                type:"GET",
                data:{
                    action: 'generateOrderId'
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
}