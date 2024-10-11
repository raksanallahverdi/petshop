import { API_BASE_URL, endpoints } from "./constants.js";

// get All data 
export async function getAllData(url, endpoint) {
    try {
        const response = await axios.get(`${url}${endpoint}`);
        console.log("STATUS CODE: ", response.status);
        return response.data;
    }
    catch (error) {
        console.log(error.message);
    }
}
// get data by id
export async function getDataById(url, endpoint, id) {
    try {
        const response = await axios.get(`${url}${endpoint}?id=${id}`);
        console.log("STATUS CODE: ", response.status);
        return response.data;

    }
    catch (error) {
        console.log(error.message);

    }
}

// delete data by id

export async function deleteDataById(url, endpoint, id) {
    try {
        const response = await axios.delete(`${url}${endpoint}/${id}`);
        console.log("STATUS CODE: ", response.status);
        return response.data;

    }
    catch (error) {
        console.log(error.message);

    }
}

// add movie to data
export async function addData(url, endpoint, data) {
    try {
        const response = await axios.post(url, endpoint, data); // Change PUT to POST
        console.log("Add STATUS CODE: ", response.status);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}
// update movie data
export async function updateDataById(url, endpoint, id, updatedData) {
    try {
        const response = await axios.put(`${url}${endpoint}/${id}`, updatedData);
        console.log("Update STATUS CODE: ", response.status);
        console.log("Updated Data Response: ", response.data);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}
// check user 
export async function checkUser() {
    if (!localStorage.getItem("user")) {
        localStorage.setItem("user", null);
    }
    const userId = JSON.parse(localStorage.getItem("user"));
    // check user id from API 
    const user = await getDataById(API_BASE_URL, endpoints.users, userId);
    console.log(user);   
    if (userId) return true;
    else return false;

}