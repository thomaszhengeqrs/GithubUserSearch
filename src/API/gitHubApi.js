import axios from 'axios';
const gitApiUrl = 'https://api.github.com';
const usersPath = 'users';
const followingPath = 'following';
const repoPath = 'repos';
const headers = {
    Accept: 'application/vnd.github.v3+json'
};
export const getUserFromGithub = (username) => {
    const url = `${gitApiUrl}/${usersPath}/${username}`;
    return axios.get(url, { headers });
}
export const getFollowingFromGithub = (username, page, per_page) => {
    const url = `${gitApiUrl}/${usersPath}/${username}/${followingPath}?page=${page}&per_page=${per_page}`
    return axios.get(url, { headers });
}
export const getRepoFromGithub = (username) => {
    const url = `${gitApiUrl}/${usersPath}/${username}/${repoPath}`;
    return axios.get(url, { headers });
}