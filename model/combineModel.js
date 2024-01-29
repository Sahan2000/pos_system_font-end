export class CombineModel{
    constructor(orderId, orderDate,customerId,itemCode,description,orderQty,price) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.itemCode = itemCode;
        this.description = description;
        this.orderQty = orderQty;
        this.price = price;
    }
}