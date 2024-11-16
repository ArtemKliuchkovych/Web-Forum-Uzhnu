import { useCallback } from 'react';
import api from '../api/posts';

export const useGet = () => {
    const getForumsData = useCallback(async (forumName) => {
        try {
            const response = await api.get(`/${forumName}.json`);
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Error fetching forum data' };
        }
    }, []);

    const getPostsData = useCallback(async () => {
        try {
            const response = await api.get('/posts.json');
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Error fetching posts data' };
        }
    }, []);

    const getCommentsData = useCallback(async () => {
        try {
            const response = await api.get('/comments.json');
            return { data: response.data, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'Error fetching comments data' };
        }
    }, []);

    return { getForumsData, getPostsData, getCommentsData };
};
