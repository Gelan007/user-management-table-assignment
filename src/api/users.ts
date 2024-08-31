import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com"

export const usersAPI = {
    async getUsers() {
        const response = await axios.get(`${baseUrl}/users`);
        console.log(response)
        return response.data;
    }
}