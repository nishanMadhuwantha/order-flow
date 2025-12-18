import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

class HttpService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 15000,
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get<T>(url, config).then(res => res.data);
  }

  post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post<T>(url, body, config).then(res => res.data);
  }

  put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put<T>(url, body, config).then(res => res.data);
  }

  patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch<T>(url, body, config).then(res => res.data);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete<T>(url, config).then(res => res.data);
  }
}

export const HttpSvc = new HttpService();
