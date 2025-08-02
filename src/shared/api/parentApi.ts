import api from ".";

export const subscribe = async (): Promise<string> => {
    const response = await api.put(`/users/parent/subscribe`);

    return response.data;
};

export const createVacancy = async (data: any): Promise<string> => {
    const response = await api.post(`/users/parent/vacancy`, data);

    return response.data;
};

export const getVacancy = async (): Promise<string> => {
    const response = await api.get(`/users/parent/vacancy`);

    return response.data;
};


