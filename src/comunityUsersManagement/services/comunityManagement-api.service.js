import axios from "axios";
import { commentEntity } from "@/comunityUsersManagement/model/comment";
import { publicationEntity } from "@/comunityUsersManagement/model/publication";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});

export class ComunityManagementApiService {
    // CRUD COMMENTS
    getComments() {
        return http.get('/all-comments')
            .then(response => response.data.map
            (comment => new commentEntity(comment._id, comment.description, comment.user_id, comment.publication_id)));
    }

    createComment(comment) {
        return http.post('/comments', comment)
            .then(response => new commentEntity(
                response.data._id,
                response.data.description,
                response.data.user_id,
                response.data.publication_id
            ))
            .catch(error => {
                console.error("Error creating comment:", error);
                throw error;
            });
    }

    updateComment(comment) {
        return http.put(`/comments/${comment.id}`)
            .then(response => new commentEntity
            (response.data.id, response.data.description, response.data.user_id, response.data.publication_id));
    }

    deleteComment(id) {
        return http.delete(`/comments/${id}`);
    }
    // CRUD PUBLICATIONS
    getPublications() {
        return http.get('/all-publications')
            .then(response => response.data.map
            (publication => new publicationEntity(
                publication._id, // Ensure the correct field is used
                publication.calification,
                publication.description,
                publication.photo_url,
                publication.user_id
            )));
    }

    createPublication(publication) {
        return http.post('/publications', publication)
            .then(response => new publicationEntity
            (response.data._id, response.data.calification, response.data.description, response.data.photo_url,
                response.data.user_id))
            .catch(error => {
                console.error("Error creating publication:", error);
                throw error;
            });
    }

    updatePublication(publication) {
        return http.put(`/publications/${publication.id}`, publication)
            .then(response => new publicationEntity(response.data.id,
                response.data.calification, response.data.description, response.data.photo_url, response.data.user_id));
    }

    deletePublication(id) {
        return http.delete(`/publications/${id}`);
    }
}