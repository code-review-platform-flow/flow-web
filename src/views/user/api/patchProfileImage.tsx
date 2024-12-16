import apiClient from '@/shared/api/apiClient';

interface ProfileImageResponse {
    fileName: string;
    filePath: string;
    fileType: string;
}

export const patchProfileImage = async (formData: FormData): Promise<ProfileImageResponse> => {
    const response = await apiClient.post('auth/file/upload', {
        body: formData,
        headers: undefined, // Content-Type 자동 설정
    });

    return response.json() as Promise<ProfileImageResponse>;
};
