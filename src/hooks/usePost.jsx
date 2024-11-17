import { useNavigate } from 'react-router-dom';
import api from '../api/posts';

export const usePost = () => {
    const navigate = useNavigate();

    const createPost = async ({ forumName, postTitle, postText, authEmail }) => {
        try {
            const time = new Date().getTime();
            const postInfo = {
                creationDateTime: time,
                postTitle,
                postAuthor: authEmail,
            };

            const postResponse = await api.post(`/posts.json`, postInfo);
            const postId = postResponse.data.id || postResponse.data.name;

            await api.post(`/comments.json`, {
                creationDateTime: time,
                commentContent: postText,
                commentAuthor: authEmail,
                postId,
            });

            await api.post(`/${forumName}.json`, { postId });

            navigate(`/${forumName}/${postId}`);
        } catch (err) {
            console.error('Error creating post:', err.message);
        }
    };

    const createComment = async ({ authEmail, newComment, postID }) => {
        try {
            const time = new Date().getTime();
            const info = {
                creationDateTime: time,
                commentContent: newComment,
                commentAuthor: authEmail,
                postId: postID,
            };

            await api.post(`/comments.json`, info);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    return { createComment, createPost };
};
