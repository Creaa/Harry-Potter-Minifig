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

interface HomeScreenProps {
  navigation: NavigationProp<any, 'PersonalDetails'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { minifigRepository } = useRepository();
  const { setChosenMinifig } = useGlobal();
  const [itemsCount, setItemsCount] = useState<number | undefined>();
  const [minifigsList, setMinifigsList] = useState<LegoMinifig[] | undefined>([]);
  const [selectedMinifigUrl, setSelectedMinifigUrl] = useState<string | undefined>();
  const [selectedMinifigIndex, setSelectedMinifigIndex] = useState<number | undefined>();
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

  const { isLoading } = useQuery<ILegoMinifigList>(
    MINIFIG_LIST_RANDOM_SELECTION_QUERY_KEY,
    () =>
      minifigRepository.getMinifigList({
        in_theme_id: '246',
        ...calculateListParametersToRandomDraw(itemsCount || 0, Number(drawNumber)),
      }),
    {
      enabled: Boolean(itemsCount !== undefined),
      refetchOnWindowFocus: false,
      onSuccess: (data: ILegoMinifigList) => {
        const array = data.results;
        if (array.length > drawNumber) {
          const arr = [...array].sort(() => Math.random() - 0.5).slice(0, Number(drawNumber));

          setMinifigsList(arr);
        } else {
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

  return (
    <>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
      {selectedMinifigUrl ? (
        <SafeAreaView style={styles.webViewSafeArea}>
          <Webview url={selectedMinifigUrl} onCloseHandler={onWebViewClose} />
        </SafeAreaView>
      ) : null}
      <SectionContainer title="CHOOSE YOUR MINIFIG">
        <View style={styles.container}>
          {minifigsList && !isLoading ? (
            <>
              <Carousel
                activeIndex={selectedMinifigIndex}
                carouselItem={renderItem}
                list={minifigsList}
              />
              <View style={styles.buttonContainer}>
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
