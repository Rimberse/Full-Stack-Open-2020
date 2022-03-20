import axios from 'axios';

// ex. 2.15, 2.16, 3.9, 3.11
const baseUrl = '/api/persons';

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const read = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}/`, newObject);
    return request.then(response => response.data);
};

// ex. 2.17
const deleteEntry = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
};

const personService = { read, create, update, deleteEntry };
export default personService;
