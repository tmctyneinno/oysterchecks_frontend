import axios from 'axios';
import { type ProgressFinisher, useProgress } from '@marcoschulte/vue3-progress';
// @ts-ignore
import Cookies from 'js-cookie';

const progresses: ProgressFinisher[] = [];

const hostURL = import.meta.env.VITE_API_URL;
const apiURL = `${hostURL}/api/`;

const getHeaders = (type: 'json' | 'form') => ({
    Accept: 'application/json',
    withCredentials: true,
    'Content-Type': type === 'json' ? 'application/json' : 'multipart/form-data',
});

const createAxiosInstance = (type: 'json' | 'form') =>
    axios.create({
        baseURL: apiURL,
        headers: getHeaders(type),
    });

const $instance = createAxiosInstance('json');
const $instanceSilent = createAxiosInstance('json');
const $instanceForm = createAxiosInstance('form');

const setAuthAndStartProgress = (config: any) => {
    const token = Cookies.get(import.meta.env.VITE_TOKEN_NAME);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    progresses.push(useProgress().start());
    return config;
};

const finishProgress = (response: any) => {
    progresses.pop()?.finish();
    return response;
};

const handleError = (error: any) => {
    progresses.pop()?.finish();
    return Promise.reject(error);
};

// Attach interceptors
[$instance, $instanceForm].forEach(instance => {
    instance.interceptors.request.use(setAuthAndStartProgress);
    instance.interceptors.response.use(finishProgress, handleError);
});

export { $instance, $instanceSilent, $instanceForm };
