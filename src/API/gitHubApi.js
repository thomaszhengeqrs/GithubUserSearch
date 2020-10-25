import axios from 'axios';
import env from '../enviorment/env';

const usersPath = "users"
const followingPath ="following"
const repoPath ="repos"
let gitApiUrl ;
let headers ;

if(process.env.NODE_ENV === 'development'){
    gitApiUrl = env.development.GITHUB_API_URL; 
   headers = env.development.API_HEADER;
}else if(process.env.NODE_ENV === 'production'){
    gitApiUrl = env.development.GITHUB_API_URL; 
    headers = env.development.API_HEADER;
}

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