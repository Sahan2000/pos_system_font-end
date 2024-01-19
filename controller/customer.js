import {CustomerApi} from "../api/customerApi.js";
import {CustomerModel} from "../model/CustomerModel.js";

let customerPage = $('#customer_page');

const emailPattern = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$");

let customerId = $('#customer_id');
let customerName = $('#customerName');
let city = $('#city');
let email = $('#customerEmail');

let addCustomerBtn = $('#addBtn');
let saveUpdateBtn = $('#saveUpdateBtn');

let customerApi = new CustomerApi();

addCustomerBtn.eq(0).on('click',function (){
    openCustomerModal('Add New Customer','Save Customer','btn-success');
    generateCustomerId();
});

function clearInputs(){
    customerName.val('');
    city.val('');
    email.val('');
}

function showError(title, text) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

function generateCustomerId(){
    customerApi.generateCustomerId().then((custId) => {
        customerId.val(custId);
    }).catch((error) => {
        showError('Fetching Error', 'Error generating customer ID');
        console.error('Error generating customer ID:', error);
    });
}


function validation(value, message, test) {
    if (!value) {
        showError('Null Input', 'Input ' + message);
        return false;
    }
    if (test === null) {
        return true;
    }
    if (!test) {
        showError('Invalid Input', 'Invalid Input ' + message);
        return false;
    }
    return true;
}

function populateCustomerTable(){
    customerApi.getAllCustomer().then((customerDb)=>{
        $('#customer-table-body').eq(0).empty();
        customerDb.forEach((customer)=>{
            $('#customer-table-body').eq(0).append(
                `<tr>
                    <th row="span">${customer.customerId}</th>
                    <td>${customer.customerName}</td>
                    <td>${customer.city}</td>
                    <td>${customer.email}</td>
                    <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#studentModal"
                                data-customer-id="${customer.customerId}">
                                <i class="fa-solid fa-pen-to-square fa-bounce"></i>
                            </button>
                            <button class="deleteBtn btn btn-danger btn-sm" data-customer-id="${customer.customerId}">
                                <i class="fa-solid fa-trash fa-bounce" style="color: #1E3050;"></i>
                            </button>
                    </td>
                       
                </tr>`
            )
        });
    }).catch((error) => {
            console.log(error);
            showError('fetch Unsuccessful', error);
        });
}

$('#customer-table-body').eq(0).on('click','.deleteBtn', function (){
    const custId = $(this).data('customer-id');
    deleteCustomer(custId);
});

saveUpdateBtn.eq(0).on('click',function (){
    event.preventDefault();
    let customerIdValue = customerId.val();
    let customerNameValue = customerName.val();
    let cityValue = city.val();
    let emailValue = email.val();


    if (validation(customerNameValue,"customer name", null)&&
        validation(cityValue,"customer city",null)&&
        validation(emailValue,"customer email",emailPattern.test(emailValue))
    ){
        let customerModel = new CustomerModel(
            customerIdValue,
            customerNameValue,
            cityValue,
            emailValue
        );

        if (saveUpdateBtn.text() === 'Save Customer'){
            customerApi.saveCustomer(customerModel).then((responseText)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Customer Saved Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                populateCustomerTable();
                clearInputs();
                generateCustomerId();
            })
        }else {
            customerApi.updateCustomer(customerModel).then((responseText)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Customer Updated Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                populateCustomerTable();
                clearInputs();
            });
        }
    }
})

customerPage.eq(0).on('click',function (){
    populateCustomerTable();
})

function openCustomerModal(heading, buttonText, buttonClass, custId) {
    if (custId) {
        customerApi.getCustomer(custId)
            .then((customer) => {
                customerId.val(customer.customerId);
                customerName.val(customer.customerName);
                city.val(customer.city);
                email.val(customer.email);
            })
            .catch((error) => {
                console.log(error);
                showError('Save unsuccessful', error);
            });
    }
    $('#customerFormHeading').text(heading);
    saveUpdateBtn.text(buttonText);
    $('#customerModal').modal('show');
    saveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
}
function deleteCustomer(custId){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            customerApi.deleteCustomer(custId)
                .then((responseText) => {
                    console.log("sahan");
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    );
                    populateCustomerTable();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Student delete Unsuccessful', error);
                });
        }
    });
}

$('#customer-table-body').eq(0).on('click','.updateBtn', function (){
    const custId = $(this).data('customer-id');
    openCustomerModal('Update Customer','Update','btn-warning',custId);
})
