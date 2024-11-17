export class Recipe {
    constructor({
                    _id = null,
                    title = '',
                    description = '',
                    author = '',
                    photo_url = '',
                    severity = ''
                }) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.photo_url = photo_url;
        this.severity = severity;
    }
}
