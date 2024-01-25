import {OrderApi} from "../api/orderApi.js";
import {OrderModel} from "../model/OrderModel.js";

let orderPage = $('#order_page');

let orderId = $('#orderId');

let orderApi = new OrderApi();

orderPage.eq(0).on('click',function (){
     generateOrderId();
});

function generateOrderId(){
     orderApi.generateOrderId().then(r => {
          orderId.val(r);
     }).catch((error)=>{
          showError('Fetching Error', 'Error generating customer ID');
          console.error('Error generating customer ID:', error);
     })
}

function showError(title, text) {
     Swal.fire({
          icon: 'error',
          title: title,
          text: text,
          footer: '<a href="">Why do I have this issue?</a>'
     });
}