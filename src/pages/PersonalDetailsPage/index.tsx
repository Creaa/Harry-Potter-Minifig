import React, { FC, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import SectionContainer from '../../common/components/SectionContainer';
import { useGlobal } from '../../context';
import { NavigationProp } from '@react-navigation/native';
import Form from './components/Form';
import { IPersonalDetails } from '../../common/interfaces/Common';
import Modal from './components/Modal';
import { useRepository } from '../../context/repository.context';
import { useMutation, useQuery } from 'react-query';
import { ILegoPartsListData, IMinifigOrderPayload } from '../../common/interfaces/Api';
import cloneDeep from 'lodash/cloneDeep';

interface FormProps {
  navigation: NavigationProp<any, any>;
}

const PersonalDetailsPage: FC<FormProps> = ({ navigation }) => {
  const { state, setPersonalDetails } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [minifigPartsList, setMinifigPartsList] = useState<ILegoPartsListData | null>(null);

  const { minifigRepository } = useRepository();

  const sendMinifigOrderMutation = useMutation(
    () => {
      if (!state.personalDetails || !state.choosenMinifig) {
        return Promise.reject(new Error('Missing personal details or choosenMinifig'));
      }

      const payload: IMinifigOrderPayload = {
        ...(state.personalDetails && { shipping_details: state.personalDetails }),
        ...(state.choosenMinifig && { minifig_id: state.choosenMinifig.set_num }),
      };

      return minifigRepository.sendMinifigOrder(payload);
    },
    {
      onSuccess: () => {
        const payload = {
          ...(state.personalDetails && { shipping_details: state.personalDetails }),
          ...(state.choosenMinifig && { minifig_id: state.choosenMinifig.set_num }),
        };

        Alert.alert('Request has been sent. Payload:', JSON.stringify(payload));
      },

      onError: () => {
        const payload = {
          ...(state.personalDetails && { shipping_details: state.personalDetails }),
          ...(state.choosenMinifig && { minifig_id: state.choosenMinifig.set_num }),
        };

        Alert.alert('Request has been sent. Payload:', JSON.stringify(payload));
      },
    },
  );

  useQuery(
    `minifig-parts-list-${state.choosenMinifig?.set_num}`,
    () => minifigRepository.getMinifigPartsList(state.choosenMinifig?.set_num || ''),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(state.choosenMinifig),
      onSuccess: (data: ILegoPartsListData) => {
        setMinifigPartsList(data);
      },
      onError: () => {
        Alert.alert('No parts found');
        navigation?.navigate('Home');
      },
    },
  );

  useEffect(() => {
    if (!state.choosenMinifig) {
      Alert.alert('No minifig found');
      navigation?.navigate('Home');
    }
  }, [state.choosenMinifig, navigation]);

  return (
    <SectionContainer title="PERSONAL DETAILS">
      <>
        <Form
          initialState={state.personalDetails}
          onSubmit={(values: IPersonalDetails | null) => {
            setPersonalDetails(cloneDeep(values));
            setIsModalOpen(true);
          }}
        />
        {state.choosenMinifig && minifigPartsList ? (
          <Modal
            isOpen={isModalOpen}
            minifigPartsList={minifigPartsList}
            choosenMinifig={state.choosenMinifig}
            onClose={() => setIsModalOpen(false)}
            onModalSubmit={() => sendMinifigOrderMutation.mutate()}
          />
        ) : null}
      </>
    </SectionContainer>
  );
};

export default PersonalDetailsPage;
