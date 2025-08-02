import api from ".";

export const editData = async (id: string,data: any): Promise<string> => {
    const response = await api.put(`/users/nanny/${id}`, {
      ...data,
    });

    return response.data;
};
