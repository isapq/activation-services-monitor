import axios from 'axios';

export const getUsers = async () => {
    try {
        const response = await axios.get(`http://localhost:3030/users`);
        return response.data
    } catch (error) {
        console.error("Erro na requisição:", error)
        return null;
    }
}
