import {OrderApi} from "../api/orderApi.js";
import {CustomerApi} from "../api/customerApi.js";
import {ItemApi} from "../api/itemApi.js";
import {CombineModel} from "../model/combineModel.js";

let orderPage = $('#order_page');

let orderId = $('#orderId');

let customerIdCb = $('#custId');
let itemCodeCb = $('#code');

let customerName = $('#custName');

let itemDescription = $('#description');
let itemQty = $('#qty');
let itemPrice = $('#price');
let orderQty = $('#getQty');

let total = $('#total');
let discount = $('#discount');
let subTotal = $('#subTotal');
let cash = $('#cash');
let balance = $('#balance');

let orderApi = new OrderApi();
let customerApi = new CustomerApi();
let itemApi = new ItemApi();

let purchase = $('#purchase');

let addToCart = $('#addItem');

let item_db = [];

orderPage.eq(0).on('click',function (){
     generateOrderId();
     getAllCustomerId();
     getAllItemCodes();
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

customerIdCb.eq(0).on('change',function (){
     let selectedValue = $(this).val();

     customerApi.getCustomer(selectedValue).then((customer)=>{
          if (selectedValue === customer.customerId){
               customerName.val(customer.customerName);
          }
     });
})

function getAllItemCodes(){
     itemApi.getAllItem().then((r)=>{
          itemCodeCb.find("option:not(:first-child").removeClass(1);
          r.forEach((item)=>{
               itemCodeCb.append($("<option>",{
                    value:item.itemCode,
                    text:item.itemCode
               }))
          })
     })
}

itemCodeCb.eq(0).on('change',function (){
     let selectedValue = $(this).val();

     itemApi.getItem(selectedValue).then((item)=>{
          if (selectedValue===item.itemCode){
               itemDescription.val(item.description);
               itemQty.val(item.qty);
               itemPrice.val(item.price);
          }
     })
})

function populateCartTable(){
     $('#cart-table-body').eq(0).empty();
     item_db.forEach((item) => {
          $('#cart-table-body').eq(0).append(
              `<tr>
                     <th scope="row">${item.itemCode}</th>
                     <td>${item.itemName}</td>
                     <td>${item.qtyOnHand}</td>
                     <td>${item.priceValue}</td>
                     <td>${item.qtyValue}</td>
                     <td>${item.priceValue * item.qtyValue}</td>
                     <td>
                         <button class="updateBtn btn btn-warning btn-sm" data-item-id="${item.itemCode}">
                                     <i class="fa-solid fa-pen-to-square fa-bounce"></i>
                                 </button>
                         <button class="deleteBtn btn btn-danger btn-sm" data-item-id="${item.itemCode}">
                                     <i class="fa-solid fa-trash fa-bounce" style="color: #1E3050;"></i>
                         </button>
                     </td>
              </tr>`
          );
     });
}

addToCart.eq(0).on('click', function () {
     event.preventDefault();
     let itemCodeValue = itemCodeCb.val();
     let descriptionValue = itemDescription.val();
     let qtyValue = parseFloat(itemQty.val());
     let priceValue = itemPrice.val();
     let getQtyValue = parseFloat(orderQty.val());

     if (addToCart.text() === 'Add To Cart') {
          console.log("add");
          if (!isNaN(qtyValue) && !isNaN(getQtyValue) && qtyValue >= getQtyValue) {
               console.log("hello");
               item_db.push({
                    itemCode: itemCodeValue,
                    itemName: descriptionValue,
                    priceValue: priceValue,
                    qtyOnHand: qtyValue,
                    qtyValue: getQtyValue
               });
               populateCartTable();
               clearInputsSelectItem();
               total.val(calculateTotal());
          } else {
               showError('Invalid Input', 'Out of stock');
          }
     } else if (addToCart.text() === 'Update Cart') {
          let existingItem = item_db.find(item => item.itemCode === itemCodeValue);

          if (existingItem) {
               console.log(qtyValue);
               console.log(getQtyValue);
               console.log(qtyValue > getQtyValue);
               if (!isNaN(qtyValue) && !isNaN(getQtyValue) && qtyValue >= getQtyValue) {
                    /*Update the quantity of the existing item*/
                    existingItem.qtyOnHand = qtyValue;
                    existingItem.qtyValue = getQtyValue;

                    /*Populate the Item table*/
                    populateCartTable();
                    clearInputsSelectItem();
                    addToCart.text('Add To Cart');
                    addToCart.removeClass('btn-warning btn-success').addClass("btn-primary");

               } else {
                    showError('Invalid Input', 'Out of stock');
               }
          }
     }
});

function clearInputsSelectItem(){
     itemCodeCb.val('');
     itemDescription.val('');
     itemQty.val('');
     itemPrice.val('');
     orderQty.val('');
}

function calculateTotal(){
     let totalValue = 0;
     item_db.map((item)=>{
          totalValue += item.priceValue * item.qtyValue;
     });
     return totalValue;
}

discount.eq(0).on('input',function (){
     const discountValue = parseFloat(discount.val()) || 0;
     const totalValue = total.val();
     const subtotalValue = totalValue - (totalValue * (discountValue/100));

     subTotal.val(subtotalValue);
})

cash.eq(0).on('input',function (){
     const cashValue = parseFloat(cash.val()) || 0;
     const totalValue = parseFloat(subTotal.val())||0;
     const balanceValue = cashValue - totalValue;

     balance.val(balanceValue);
});

$('#cart-table-body').eq(0).on('click','.deleteBtn', function (){
     const itemId = $(this).data('item-id');
     item_db.splice(itemId,1);
     populateCartTable();
     total.val('');
});

$('#cart-table-body').eq(0).on('click', '.updateBtn', function () {
     console.log("Hello");
     const itemId = $(this).data('item-id');
     let getQty = parseFloat(orderQty.val());

     let existingItem = item_db.find(item => item.itemCode === itemId);
     let item_qty = existingItem.qtyOnHand;

     if (existingItem) {
          itemCodeCb.val(existingItem.itemCode);
          itemDescription.val(existingItem.itemName);
          itemQty.val(item_qty);
          itemPrice.val(existingItem.priceValue);
          orderQty.val(existingItem.qtyValue);
          existingItem.qtyOnHand = getQty;

          addToCart.text("Update Cart");
          addToCart.removeClass('btn-success btn-warning').addClass("btn-warning");
     }
});

purchase.eq(0).on('click',function (){
     let orderIdValue = $('#orderId').val();
     let orderDateValue = $('#orderDate').val();
     console.log(orderDateValue);
     let customerIdValue = $('#custId').val();
     let subTotal = $('#subTotal').val();
     item_db.map(item => {
          let combineModel = new CombineModel(
              orderIdValue,
              orderDateValue,
              customerIdValue,
              item.itemCode,
              item.itemName,
              item.qtyValue,
              subTotal
          );

          orderApi.purchaseOrder(combineModel).then(r => {
               Swal.fire({
                    icon: 'success',
                    title: 'Purchase Order Successful',
                    showConfirmButton: false,
                    timer: 1500
               });
               populateCartTable();
               clearOrderInputs();
               generateOrderId();
          });
     });
});

function clearOrderInputs(){
     $('#orderDate').val('');
     $('#custId').val('');
     $('#subTotal').val('');
}
