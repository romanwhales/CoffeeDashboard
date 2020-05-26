import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { Dictionary } from 'lodash';

class Api {
  axiosInstance: AxiosInstance;
  baseUrl: string;
  headers: Dictionary<string> = {
    'Content-Type': 'application/json',
  };
  constructor(url: string) {
    this.baseUrl = url;
    this.axiosInstance = axios.create({
      baseURL: url,
      timeout: 90000,
      headers: this.headers,
    });
  }

  setUrl = (url: string) => {
    this.baseUrl = url;
    this.axiosInstance.defaults.baseURL = url;
  }

  setHeaders = (key: string, value: string) => {
    this.axiosInstance.defaults.headers[key] = value;
    return this;
  }

  get<T>(path: string, opts?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get<T>(path, opts)
        .then(response => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response));
    })
  }
  post<T>(path: string, body?: any, opts?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.post<T>(path, body, opts)
        .then(response => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response));
    })
  }
  put<T>(path: string, body?: any, opts?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.put<T>(path, body, opts)
        .then(response => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response));
    })
  }

  patch<T>(path: string, body?: any, opts?: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.patch<T>(path, body, opts)
        .then(response => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response));
    })

  }
  delete(path: string, opts?: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.delete(path, opts)
        .then(response => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response));
    });
  }
}
export const BW = new Api(process.env.REACT_APP_BW_API_URL);
