import axios from "axios";
import { commentEntity } from "@/comunityUsersManagement/model/comment";
import { publicationEntity } from "@/comunityUsersManagement/model/publication";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});

export class ComunityManagementApiService {
    // CRUD COMMENTS
    async getComments() {
        const commentsResponse = await http.get('/all-comments');
        const usersResponse = await http.get('/all-users');
        const users = usersResponse.data;

        return commentsResponse.data.map(comment => {
            const user = users.find(user => user._id === comment.user_id);
            return new commentEntity(
                comment._id,
                comment.description,
                comment.user_id,
                comment.publication_id,
                user ? user.username : '',
                comment.createdAt,
                comment.updatedAt
            );
        });
    }

    createComment(comment) {
        return http.post('/comments', comment)
            .then(response => new commentEntity(
                response.data._id,
                response.data.description,
                response.data.user_id,
                response.data.publication_id,
                response.data.user_name
            ))
            .catch(error => {
                console.error("Error creating comment:", error);
                throw error;
            });
    }

    updateComment(comment) {
        return http.put(`/comments/${comment.id}`)
            .then(response => new commentEntity
            (response.data.id, response.data.description, response.data.user_id,
                response.data.publication_id, response.data.user_name));
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
                publication.title,
                publication.description,
                publication.photo_url,
                publication.user_id
            )));
    }

    getPublicationByUserId(userId) {
        return http.get(`/publications/user/${userId}`)
            .then(response => response.data.map(publication => new publicationEntity(
                publication._id,
                publication.calification,
                publication.title,
                publication.description,
                publication.photo_url,
                publication.user_id
            )));
    }

    createPublication(publication) {
        return http.post('/publications', publication)
            .then(response => new publicationEntity(
                response.data._id,
                response.data.calification,
                response.data.title,
                response.data.description,
                response.data.photo_url,
                response.data.user_id
            ))
            .catch(error => {
                console.error("Error creating publication:", error.response ? error.response.data : error.message);
                throw error;
            });
    }
    updatePublication(publication) {
        return http.put(`/publications/${publication.id}`, publication)
            .then(response => new publicationEntity(response.data.id,
                response.data.calification,                response.data.title,
                response.data.description, response.data.photo_url, response.data.user_id));
    }

    deletePublication(id) {
        return http.delete(`/publications/${id}`)
            .catch(error => {
                console.error("Error deleting publication:", error.response ? error.response.data : error.message);
                throw error;
            });
    }
}