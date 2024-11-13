// fabric.entity.js
export class Recipe {
    constructor({ id = '', title = '', description = '', ingredients = '', image = '' }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.image = image;
    }
}
