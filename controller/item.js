import {ItemApi} from "../api/itemApi.js";
import {ItemModel} from "../model/ItemModel.js";

let itemApi = new ItemApi();

let itemCode = $('#item_code');
let description = $('#itemDescription');
let qty = $('#itemQty');
let price = $('#itemPrice');

let addItem = $('#addItemBtn');
let saveUpdateBtn = $('#saveUpdateItemBtn');

function showError(tittle, text) {
    Swal.fire({
        icon: 'error',
        title: tittle,
        text: text,
        footer: '<a href="">Why do I have this issue?</a>'
    });
}

function generateItemCode(){
    itemApi.generateItemCode().then((code) => {
        itemCode.val(code);
    }).catch((error) => {
        showError('Fetching Error', 'Error generating item CODE');
        console.error('Error generating item CODE:', error);
    });
}

addItem.eq(0).on('click', function (){

    openItemModal('Add new Item', 'Save Item', 'btn-success')
    generateItemCode();
});

function openItemModal(heading, buttonText, buttonClass, code) {
    if (code) {
        itemApi.getItem(code)
            .then((code) => {
                itemCode.val(code.itemCode);
                description.val(code.description);
                qty.val(code.qty);
                price.val(code.price);
            })
            .catch((error) => {
                console.log(error);
                showError('Save unsuccessful', error);
            });
    }
    $('#itemFormHeading').text(heading);
    saveUpdateBtn.text(buttonText);
    $('#itemModal').modal('show');
    saveUpdateBtn.removeClass('btn-success btn-warning').addClass(buttonClass);
}

saveUpdateBtn.eq(0).on('click',function (){
    event.preventDefault();
    let itemCodeValue = itemCode.val();
    let descriptionValue = description.val();
    let qtyValue = qty.val();
    let priceValue = price.val();

    if (validation(descriptionValue,"item description", null)&&
        validation(qtyValue,"item qty",null)&&
        validation(priceValue,"item price",null)
    ){
        let itemModel = new ItemModel(
            itemCodeValue,
            descriptionValue,
            qtyValue,
            priceValue
        );

        if (saveUpdateBtn.text() === 'Save Item'){
            itemApi.saveItem(itemModel).then((responseText)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Item Saved Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                /*populateCustomerTable();
                clearInputs();
                generateCustomerId();*/
            })
        }/*else {
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
        }*/
    }
})

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