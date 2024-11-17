// shoppingCart.entity.js
export class ShoppingCart {
    constructor({ id = '', userId = '', quantity = 0, totalCost = 0.0 }) {
        this.id = id;
        this.userId = userId; // ID del usuario que posee el carrito
        this.quantity = quantity; // Cantidad de productos en el carrito
        this.totalCost = totalCost; // Costo total de los productos en el carrito
    }
}
