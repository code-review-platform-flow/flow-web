import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '@/shared/api/apiClient';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    role: string;
    refreshToken: string;
    accessToken: string;
    email: string;
}

const loginRequest = async (loginData: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('auth/login', {
        json: loginData,
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
};

export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginRequest>) => {
    return useMutation({
        mutationFn: loginRequest,
        ...options,
    });
};
