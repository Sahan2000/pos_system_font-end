import {OrderApi} from "../api/orderApi.js";
import {OrderModel} from "../model/OrderModel.js";
import {CustomerApi} from "../api/customerApi.js";

let orderPage = $('#order_page');

let orderId = $('#orderId');

let customerIdCb = $('#custId');

let orderApi = new OrderApi();
let customerApi = new CustomerApi();

orderPage.eq(0).on('click',function (){
     generateOrderId();
     getAllCustomerId();
});

function getAllCustomerId(){
     customerApi.getAllCustomer().then((r)=>{
          customerIdCb.find("option:not(:first-child").removeClass(1);
          r.forEach((customer)=>{
               customerIdCb.append($("<option>",{
                    value:customer.customerId,
                    text:customer.customerId
               }))
          })
     })
}

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