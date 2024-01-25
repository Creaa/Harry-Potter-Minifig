import { AxiosInstance, AxiosPromise, AxiosResponse, AxiosRequestConfig } from 'axios';

class AxiosRepository<T = any> {
  constructor(private axiosClient: AxiosInstance) {
    this.get = this.axiosClient.get.bind(this.axiosClient);
    this.patch = this.axiosClient.patch.bind(this.axiosClient);
    this.put = this.axiosClient.put.bind(this.axiosClient);
    this.post = this.axiosClient.post.bind(this.axiosClient);
    this.delete = this.axiosClient.delete.bind(this.axiosClient);
  }

  public get<R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): AxiosPromise<R> {
    return this.axiosClient.get(url, config);
  }

  public patch<R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.axiosClient.patch(url, data, config);
  }

  public put<R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.axiosClient.put(url, data, config);
  }

  public post<R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<R> {
    return this.axiosClient.post(url, data, config);
  }

  public delete<R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): AxiosPromise<R> {
    return this.axiosClient.delete(url, config);
  }
}

export default AxiosRepository;
