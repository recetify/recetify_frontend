// product.entity.js
export class Product {
    constructor({ id = '', name = '', price = 0, category = '', image = '' }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
    }
}
