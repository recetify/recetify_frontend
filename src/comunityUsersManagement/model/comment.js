/*
POST http://localhost:3000/comments
{
    "description": "Me encantó esta receta, muy fácil de seguir.",
    "user_id": "(que ya haya sido creado)",
    "publication_id": "(que ya haya sido creado)"
}
*/

export class commentEntity {
    constructor(id = '',
                description = '',
                user_id = '',
                publication_id = '',
                user_name = '',
                createdAt = '',
                updatedAt = '') {
        this.id = id;
        this.description = description;
        this.user_id = user_id;
        this.publication_id = publication_id;
        this.user_name = user_name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}