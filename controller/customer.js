import {CustomerApi} from "../api/customerApi.js";
import {CustomerModel} from "../model/CustomerModel.js";

let customerPage = $('#customer_page');

let addCustomerBtn = $('#addBtn');

let customerApi = new CustomerApi();

addCustomerBtn.eq(0).on('click',function (){
    console.log("add");
    generateCustomerId();
});

function generateCustomerId(){
    customerApi.generateCustomerId();
}