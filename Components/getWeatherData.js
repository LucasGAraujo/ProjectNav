import axios from 'axios';

const API_KEY = 'd46dcdb4a0a0db9aa4f0ada8877184a3';
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

const getWeatherData = async (cidade) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                q: cidade,
                appid: API_KEY,
                units: 'metric' 
                
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter dados do clima:', error);
        throw error;
    }
};

export default getWeatherData;