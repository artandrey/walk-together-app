import {API_BASE_URL} from '@env';
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {inject, injectable} from 'inversify';
import {AuthService} from '../auth/auth-service';
import 'reflect-metadata';
import {ApiError} from './api-error';

@injectable()
class ApiClient {
  private readonly client: AxiosInstance;
  @inject(AuthService) private readonly authService!: AuthService;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.requestInterceptor = this.requestInterceptor.bind(this);

    this.client.interceptors.request.use(this.requestInterceptor, error => {
      return Promise.reject(error);
    });

    this.client.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error);
      },
    );
  }

  async requestInterceptor(config: InternalAxiosRequestConfig) {
    const token = await this.authService.getToken();
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`, true);
    }
    return config;
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T, D = unknown>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.patch(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      const message = error.response.data.message || 'An error occurred';
      const statusCode = error.response.status;
      return new ApiError(message, statusCode, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      return new ApiError('Network error. Please try again later.', 0);
    } else {
      console.error('Error:', error.message);
      return new ApiError(error.message, 0);
    }
  }
}

export default ApiClient;
