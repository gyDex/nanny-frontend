import api from ".";

export const requestCode = async (phone: string, role: string): Promise<string> => {
  const response = await api.post('/auth/request-code', {
    role: role,
    phone: phone
  });
  return response.data;
};

export const verifyCode = async ({code, phone}: {code: string, phone: string}): Promise<string> => {
  const response = await api.post('/auth/verify-code', {
    phone: phone,
    code: code,
  });
  return response.data;
};

export const getMe = async () => {
  const res = await fetch(`http://localhost:3001/auth/get-me`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  return await res.json();
};