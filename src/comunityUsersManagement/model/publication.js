/*
POST http://localhost:3000/publications
{
    "calification": 5,
    "description": "This is a sample publication description.",
    "photo_url": "http://example.com/photo.jpg",
    "user_id": (ya haya sido creado)
}
* */

export class publicationEntity {
    constructor(id = '',
                calification = 0.0,
                title = '',
                description = '',
                photo_url = '',
                user_id = '') {
        this.id = id;
        this.calification = calification;
        this.title = title;
        this.description = description;
        this.photo_url = photo_url;
        this.user_id = user_id;
    }
}