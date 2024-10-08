import axios from 'axios';
import Api from './api.js';
export {default as Criteria} from './data/criteria.data.js';

export async function createFromPasswordAndLogin(url, username, password) {
    let res;

    try {
        res = await axios.post(`${url}/api/oauth/token`, {
            client_id: "administration",
            grant_type: "password",
            scopes: "write",
            username: username,
            password: password
        });
    } catch(err) {
        if (err.response && err.response.status === 401) {
            throw new Error('Invalid credentials');
        }
        throw err;
    }
    res.data.valid_until = Date.now() + res.data.expires_in * 1000;
    let api = new Api(url, res.data);
    await api._initialize();

    return api;
};


export async function createFromIntegration(url, id, secret) {
    let res;

    try {
        res = await axios.post(`${url}/api/oauth/token`, {
            client_id: id,
            client_secret: secret,
            grant_type: "client_credentials"
        });
    } catch(err) {
        if (err.response && err.response.status === 401) {
            throw new Error('Invalid credentials');
        }
        else if (err.response && err.response.status === 500) {
            throw new Error('Access key is invalid');
        }
        throw err;
    }
    res.data.valid_until = Date.now() + res.data.expires_in * 1000;
    let api = new Api(url, res.data, id, secret);
    await api._initialize();

    return api;
}

// create from integration or password
export async function create(url, id, secret) {
    try {
        return await createFromIntegration(url, id, secret);
    } catch(err) {
        if (err.message === 'Access key is invalid') {
            return await createFromPasswordAndLogin(url, id, secret);
        }
        throw err;
    }
}
