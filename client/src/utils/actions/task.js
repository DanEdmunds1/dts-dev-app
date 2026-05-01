import axios from 'axios'
import { formToObj, getToken } from '../helpers/common'


export async function createTask(request) {
    const data = await formToObj(request)
    return await axios.post(`/api/tasks`, data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export async function updateTask(request, id) {
    const data = await formToObj(request)
    return await axios.put(`/api/tasks/${id}`, data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export async function deleteTask(id) {
    const response = await axios.delete(`/api/tasks/${id}`, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return response
}
