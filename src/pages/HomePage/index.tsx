import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
  StatusBar,
} from 'react-native';
import * as React from 'react';
import { useRepository } from '../../context/repository.context';
import { useQuery } from 'react-query';
import { ILegoMinifigList, LegoMinifig } from '../../common/interfaces/Api';
import { useState } from 'react';
import calculateListParametersToRandomDraw from '../../common/utils/calculateListParametersToRandomDraw';
import Carousel from '../../common/components/Carousel/Carousel';
import Webview from '../../common/components/WebView/WebView';
import Button from '../../common/components/Button/Button';
import { useGlobal } from '../../context';
import { NavigationProp } from '@react-navigation/native';
import SectionContainer from '../../common/components/SectionContainer';
import { IMAGE_PLACEHOLDER_LINK } from '../../common/constant';
import { MINIFIG_DRAW_NUMBER } from '@env';
import {
  MINIFIG_LIST_PAGINATION_QUERY_KEY,
  MINIFIG_LIST_RANDOM_SELECTION_QUERY_KEY,
} from '../../common/constant/queryKeys';
import ScanScreen from '../../common/components/QRCamera';
import { BarCodeScanningResult } from 'expo-camera';

interface HomeScreenProps {
  navigation: NavigationProp<any, 'PersonalDetails'>;
}

enum SelectionMode {
  Draw = 'draw',
  Scan = 'scan',
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { minifigRepository } = useRepository();
  const { setChosenMinifig } = useGlobal();
  const [itemsCount, setItemsCount] = useState<number | undefined>();
  const [minifigsList, setMinifigsList] = useState<LegoMinifig[] | undefined>([]);
  const [selectedMinifigUrl, setSelectedMinifigUrl] = useState<string | undefined>();
  const [selectedMinifigIndex, setSelectedMinifigIndex] = useState<number | undefined>();
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<SelectionMode>(SelectionMode.Draw);
  const [scannedMinifigId, setScannedMinifigId] = useState<string | undefined>();
  const drawNumber = MINIFIG_DRAW_NUMBER || 5;

  useQuery(
    MINIFIG_LIST_PAGINATION_QUERY_KEY,
    () => minifigRepository.getMinifigList({ in_theme_id: '246', page: 1, page_size: 1 }),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: ILegoMinifigList) => {
        setItemsCount(data.count);
      },
    },
  );

  const { isFetching, isLoading } = useQuery<ILegoMinifigList>(
    [MINIFIG_LIST_RANDOM_SELECTION_QUERY_KEY, scannedMinifigId, selectedMode],
    () =>
      minifigRepository.getMinifigList({
        in_theme_id: '246',
        ...(scannedMinifigId && selectedMode === SelectionMode.Scan
          ? { search: scannedMinifigId }
          : calculateListParametersToRandomDraw(itemsCount || 0, Number(drawNumber))),
      }),
    {
      enabled: Boolean(itemsCount !== undefined),
      refetchOnWindowFocus: false,
      onSuccess: (data: ILegoMinifigList) => {
        const array = data.results;
        console.log('koko', array.length);
        console.log('koko', scannedMinifigId);
        if (selectedMode === SelectionMode.Draw && array.length > Number(drawNumber)) {
          const arr = [...array].sort(() => Math.random() - 0.5).slice(0, Number(drawNumber));

          setMinifigsList(arr);
        } else {
          array.length === 1 && setSelectedMinifigIndex(0);
          setMinifigsList(array);
        }
      },
    },
  );

  // if it's reusable I would move it to @components with custom props

  const renderItem = ({ item, index }: { item: LegoMinifig; index: number }) => {
    const onItemPress = () => {
      setSelectedMinifigIndex(index);
    };

    const onMinifigUrlSelection = () => {
      setSelectedMinifigUrl(item.set_url);
    };

    return (
      <Pressable style={{ height: '100%' }} onPress={onItemPress}>
        <View style={carouselElement.imageContainer}>
          <Image
            style={carouselElement.image}
            source={{
              uri: item.set_img_url || IMAGE_PLACEHOLDER_LINK,
            }}
          />
        </View>
        <Text style={carouselElement.title}>{item.name}</Text>
        <Pressable onPress={onMinifigUrlSelection}>
          <Text style={carouselElement.link}>Show details</Text>
        </Pressable>
      </Pressable>
    );
  };

  const onConfirmButtonPress = () => {
    if (minifigsList && selectedMinifigIndex !== undefined) {
      setChosenMinifig(minifigsList[selectedMinifigIndex]);
      navigation.navigate('PersonalDetails' as never);
    }
  };

  const onWebViewClose = () => {
    setSelectedMinifigUrl(undefined);
  };

  const onBarcodeScanned = (code: BarCodeScanningResult) => {
    setSelectedMode(SelectionMode.Scan);
    setIsCameraActive(false);
    setScannedMinifigId(code.data);
  };

  const setMode = (mode: SelectionMode) => {
    setSelectedMode(mode);
    setScannedMinifigId(undefined);
    setSelectedMinifigIndex(undefined);

    if (mode === SelectionMode.Scan) {
      setIsCameraActive(true);
    }
  };

  const onCameraClose = () => {
    setIsCameraActive(false);
  };

  return (
    <>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      {isCameraActive ? (
        <ScanScreen onCameraClose={onCameraClose} onBarcodeScanned={onBarcodeScanned} />
      ) : null}
      {selectedMinifigUrl ? (
        <SafeAreaView style={styles.webViewSafeArea}>
          <Webview url={selectedMinifigUrl} onCloseHandler={onWebViewClose} />
        </SafeAreaView>
      ) : null}
      <SectionContainer title="CHOOSE YOUR MINIFIG">
        <View style={styles.container}>
          {minifigsList && !isFetching && !isLoading ? (
            <>
              <Carousel
                activeIndex={selectedMinifigIndex}
                carouselItem={renderItem}
                list={minifigsList}
              />
              <View style={styles.buttonContainer}>
                {selectedMode === SelectionMode.Draw ? (
                  <Button
                    variant="warning"
                    title="QR CODE"
                    onPress={() => setIsCameraActive(true)}
                  />
                ) : (
                  <Button
                    variant="warning"
                    title="RANDOM"
                    onPress={() => setMode(SelectionMode.Draw)}
                  />
                )}
                <Button
                  title="CHOOSE FIGURE"
                  disabled={selectedMinifigIndex === undefined}
                  onPress={onConfirmButtonPress}
                />
              </View>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </SectionContainer>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  webViewSafeArea: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1F2236',
  },
  container: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 20,
  },
});

const carouselElement = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 170,
    marginBottom: 15,
    marginHorizontal: 'auto',
    resizeMode: 'stretch',
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#1F2236',
    marginBottom: 17,
    width: '100%',
  },
  link: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '700',
    color: '#FF8B2C',
  },
});
