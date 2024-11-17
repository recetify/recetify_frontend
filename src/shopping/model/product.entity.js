// product.entity.js
export class Product {
    constructor({ id = '', name = '', price = 0, category_id = '', categoryName = '', photo_url = '', shoppingCartId = '' }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category_id = category_id;
        this.categoryName = categoryName;
        this.photo_url = photo_url;
        this.shoppingCartId = shoppingCartId;
    }
}
