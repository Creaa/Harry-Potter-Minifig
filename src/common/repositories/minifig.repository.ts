import { AxiosInstance, AxiosResponse } from 'axios';
import AxiosRepository from './axios.repository';
import IMinifigRepository from '../interfaces/MinifigRepository';
import {
  ILegoMinifigList,
  IMinifigListParams,
  ILegoPartsListData,
  IMinifigOrderPayload,
} from '../interfaces/Api';

class MinifigRepository extends AxiosRepository implements IMinifigRepository {
  constructor(axiosClient: AxiosInstance) {
    super(axiosClient);
  }

  async getMinifigList(params: IMinifigListParams): Promise<ILegoMinifigList> {
    const response: AxiosResponse<ILegoMinifigList> = await this.get<ILegoMinifigList>(
      'lego/minifigs/',
      {
        params: params,
      },
    );
    return response.data;
  }

  async getMinifigPartsList(set_uuid: string): Promise<ILegoPartsListData> {
    const { data } = await this.get<ILegoPartsListData>(`lego/minifigs/${set_uuid}/parts/`, {
      params: {
        set_num: set_uuid,
      },
    });
    return data;
  }

  async sendMinifigOrder(payload: IMinifigOrderPayload): Promise<any> {
    const { data } = await this.post<ILegoPartsListData>('send', {
      payload: payload,
    });
    return data;
  }
}

export default MinifigRepository;
