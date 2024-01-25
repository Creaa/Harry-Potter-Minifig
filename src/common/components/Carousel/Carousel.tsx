import React, { FC } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { default as SnapCarousel } from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import { LegoMinifig } from '../../interfaces/Api';

interface CarouselProps {
  list: LegoMinifig[];
  carouselItem: ({ item, index }: { item: LegoMinifig; index: number }) => React.JSX.Element;
  activeIndex: number | undefined;
}

const Carousel: FC<CarouselProps> = ({ list, carouselItem, activeIndex }) => {
  const renderItem = ({ item, index }: { item: LegoMinifig; index: number }) => {
    const isActive = index === activeIndex;
    const CarouselItem = carouselItem;

    return (
      <Animatable.View
        animation={isActive ? 'tada' : undefined}
        duration={500}
        style={carouselElementStyles(isActive).itemContainer}
      >
        <CarouselItem item={item} index={index} />
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <SnapCarousel
        layout={'default'}
        data={list}
        sliderWidth={380}
        itemWidth={260}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
});

const carouselElementStyles = (isActive: boolean) =>
  StyleSheet.create({
    itemContainer: {
      minHeight: 330,
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingTop: 20,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 40,
      marginTop: 50,
      marginLeft: 10,
      marginRight: 10,
      display: 'flex',
      flexBasis: 1,
      ...(isActive
        ? Platform.select({
            ios: {
              shadowColor: '#FF8B2C',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 18,
            },
            android: {
              elevation: 10,
              backgroundColor: '#FF8B2C',
            },
          })
        : {}),
    },
  });

export default Carousel;
