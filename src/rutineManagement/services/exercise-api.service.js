import axios from "axios";

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/HealthyL/Datos-healty-',
});
export class ExerciseApiService {
    getExercises() {
        return http.get('/exercises');
    }
    getRutine(){
        return http.get('/rutines');
    }
}