// product.entity.js
export class Product {
    constructor({ id = '', name = '', price = 0, categoryId = '', categoryName = '', image = '', shoppingCartId = '' }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.image = image;
        this.shoppingCartId = shoppingCartId;
    }
}
