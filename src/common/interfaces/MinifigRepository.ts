import { ILegoMinifigList, ILegoPartsListData, IMinifigListParams } from './Api';

interface IMinifigRepository {
  getMinifigList: (params: IMinifigListParams) => Promise<ILegoMinifigList>;
  getMinifigPartsList: (set_uuid: string) => Promise<ILegoPartsListData>;
}

export default IMinifigRepository;
