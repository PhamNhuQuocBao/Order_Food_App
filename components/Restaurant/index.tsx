import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styleRestaurant } from "./style";
import { RestaurantResponse } from "@/types/restaurant";
import { StarRatingDisplay } from "react-native-star-rating-widget";

interface Props {
  data: RestaurantResponse;
  onPress?: () => void;
}

const Restaurant: React.FC<Props> = ({ data, onPress }) => {
  const { name, image, rating } = data;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styleRestaurant.container}>
        <Image style={styleRestaurant.image} src={image} />
        <View style={styleRestaurant.footer}>
          <Text style={styleRestaurant.name}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Restaurant);
