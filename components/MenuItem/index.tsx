import { MenuResponse } from "@/types/menu";
import React, { FC, memo } from "react";
import { View, Text, Image } from "react-native";
import { styleMenuItem } from "./style";
import { IMG_DEFAULT } from "@/constants/mock";

interface Props {
  data: MenuResponse;
}

const MenuItem: FC<Props> = ({ data }) => {
  const { name, description, price, image } = data;
  return (
    <View style={styleMenuItem.container}>
      <View>
        <Image
          source={{
            uri: image ? image : IMG_DEFAULT,
          }}
          width={80}
          height={80}
        />
      </View>
      <View style={styleMenuItem.info}>
        <Text style={styleMenuItem.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styleMenuItem.desc} numberOfLines={3}>
          {description}
        </Text>
      </View>
      <View>
        <Text>${price}</Text>
      </View>
    </View>
  );
};

export default memo(MenuItem);
