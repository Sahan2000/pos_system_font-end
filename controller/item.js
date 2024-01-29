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

function clearInputs(){
    description.val('');
    qty.val('');
    price.val('');
}

$('#item_page').eq(0).on('click', function (){
    populateItemTable();
});

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
        console.log(code);
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
                populateItemTable();
                clearInputs();
                generateItemCode();
            })
        }else {
            itemApi.updateItem(itemModel).then((responseText)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Item Updated Successful',
                    showConfirmButton: false,
                    timer: 1500
                });
                populateItemTable();
                clearInputs();
            });
        }
    }
});

function populateItemTable(){
    itemApi.getAllItem().then((itemDb) => {
        // Log the response to check its structure
        console.log("Response from getAllItem:", itemDb);

        // Ensure itemDb is an array
        if (Array.isArray(itemDb)) {
            $('#item-table-body').eq(0).empty();
            itemDb.forEach((item) => {
                $('#item-table-body').eq(0).append(
                    `<tr>
                        <th row="span">${item.itemCode}</th>
                        <td>${item.description}</td>
                        <td>${item.qty}</td>
                        <td>${item.price}</td>
                        <td>
                            <button class="updateBtn btn btn-warning btn-sm" data-toggle="modal" data-target="#studentModal"
                                data-item-code="${item.itemCode}">
                                <i class="fa-solid fa-pen-to-square fa-bounce"></i>
                            </button>
                            <button class="deleteBtn btn btn-danger btn-sm" data-item-code="${item.itemCode}">
                                <i class="fa-solid fa-trash fa-bounce" style="color: #1E3050;"></i>
                            </button>
                        </td>
                    </tr>`
                );
            });
        } else {
            console.error("Invalid response format. Expected an array.");
            showError('Invalid Response', 'Unexpected data format from server.');
        }
    }).catch((error) => {
        console.log(error);
        showError('fetch Unsuccessful', error);
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
$('#item-table-body').eq(0).on('click','.deleteBtn', function (){
    const code = $(this).data('item-code');
    console.log(code);
    deleteItem(code);
});

function deleteItem(code){
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
            itemApi.deleteItem(code)
                .then((responseText) => {
                    console.log("sahan");
                    Swal.fire(
                        responseText,
                        'Successful',
                        'success'
                    );
                    populateItemTable();
                })
                .catch((error) => {
                    console.log(error);
                    showError('Item delete Unsuccessful', error);
                });
        }
    });
}

$('#item-table-body').eq(0).on('click','.updateBtn', function (){
    const code = $(this).data('item-code');

    openItemModal('Update Item','Update','btn-warning',code);
})