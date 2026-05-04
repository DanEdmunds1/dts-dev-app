import axios, { type AxiosResponse } from "axios";
import { formToObj, getToken } from "../helpers/common";

interface TaskPayload {
    title?: string;
    description?: string;
    status?: string;
    dueDateTime?: string;
    [key: string]: any;
}

interface ApiResponse<T = any> extends AxiosResponse<T> {}

export async function createTask(request: Request): Promise<ApiResponse> {
    const data: TaskPayload = await formToObj(request);

    return axios.post("/api/tasks", data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

export async function updateTask(
    request: Request,
    id: string
): Promise<ApiResponse> {
    const data: TaskPayload = await formToObj(request);

    return axios.put(`/api/tasks/${id}`, data, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

export async function deleteTask(id: string): Promise<ApiResponse> {
    return axios.delete(`/api/tasks/${id}`, {
        validateStatus: () => true,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}
