const env = {
    development:{
        GITHUB_API_URL : 'https://api.github.com',
        API_HEADER : {
            Accept: 'application/vnd.github.v3+json'
        }
    },
    production:{
        GITHUB_API_URL : 'https://api.github.com',
        API_HEADER : {
            Accept: 'application/vnd.github.v3+json'
        }
    }
}

export default env;

