import React, { FC } from 'react';
import {
  Text,
  View,
  Modal as NativeModal,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import CloseIconSvg from '../../../../assets/icons/close_icon';
import { ILegoPartsListData, LegoMinifig } from '../../../../common/interfaces/Api';
import Button from '../../../../common/components/Button/Button';
import { IMAGE_PLACEHOLDER_LINK } from '../../../../common/constant';

interface IModalProps {
  chosenMinifig: LegoMinifig;
  minifigPartsList: ILegoPartsListData;
  isOpen: boolean;
  onClose: () => void;
  onModalSubmit: () => void;
}

const Modal: FC<IModalProps> = ({
  chosenMinifig,
  minifigPartsList,
  isOpen,
  onClose,
  onModalSubmit,
}) => {
  return (
    <SafeAreaView>
      <NativeModal animationType="slide" transparent={true} visible={isOpen}>
        <SafeAreaView style={styles.saveViewContainer}>
          <View style={styles.viewContainer}>
            <View style={styles.closeIconContainer}>
              <Pressable onPress={onClose}>
                <CloseIconSvg />
              </Pressable>
            </View>
            <View style={styles.mifingSummaryContainer}>
              <Text style={styles.summaryTitle}>SUMMARY</Text>
              <View style={styles.minifigPreviewContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: chosenMinifig.set_img_url || IMAGE_PLACEHOLDER_LINK }}
                />
                <Text style={styles.minifigName}>{chosenMinifig.name}</Text>
              </View>
            </View>
            <Text style={styles.partsTitle}>
              There are {minifigPartsList?.results?.length} parts in this minifig:
            </Text>
            <ScrollView>
              {minifigPartsList.results.map((minifigPart) => (
                <View key={minifigPart.element_id} style={styles.partElementContainer}>
                  <Image
                    style={styles.partImage}
                    source={{ uri: minifigPart.part.part_img_url || IMAGE_PLACEHOLDER_LINK }}
                  />
                  <View>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.partName}>
                      {minifigPart.part.name}
                    </Text>
                    <Text style={styles.partNumber}>{minifigPart.part.part_num}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button title="SUBMIT" onPress={onModalSubmit} />
            </View>
          </View>
        </SafeAreaView>
      </NativeModal>
    </SafeAreaView>
  );
};

export default Modal;

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  partNumber: {
    fontWeight: '700',
    color: '#FFAF6E',
    fontSize: 16,
  },
  partName: {
    fontWeight: '700',
    color: '#1F2236',
    fontSize: 16,
    paddingRight: 70,
  },
  partElementContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  partImage: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
  },
  minifigName: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  minifigPreviewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    rowGap: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  partsTitle: {
    color: '#1F2236',
    fontWeight: '700',
    marginBottom: 30,
  },
  mifingSummaryContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    width: 140,
    height: 140,
  },
  saveViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    width: '95%',
    height: '98%',
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingRight: 25,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  closeIconContainer: {
    alignSelf: 'flex-end',
  },
  summaryTitle: {
    fontWeight: '400',
    fontSize: 32,
    color: '#1F2236',
    fontFamily: 'ChangaOne_400Regular',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});
