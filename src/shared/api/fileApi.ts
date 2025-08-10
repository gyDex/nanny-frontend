import { AxiosRequestConfig } from "axios";
import api from ".";

export const uploadAudio = async (
  formState: FormData,
  onProgress: (percent: number) => void
): Promise<string> => {
  const config: AxiosRequestConfig = {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent);
      }
    },
    headers: { "Content-Type": "multipart/form-data" },
  };

  const response = await api.post(`/audio/upload`, formState, config);
  return response.data;
};