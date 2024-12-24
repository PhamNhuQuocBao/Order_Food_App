import { View, Text, ButtonProps, TouchableOpacity } from "react-native";
import React from "react";
import { styleButton } from "./style";
import { Colors } from "@/constants/Colors";

interface Props extends ButtonProps {
  title: string;
}

const ButtonCustom: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={{
        ...styleButton.container,
        backgroundColor: `${
          rest.disabled ? Colors.gray.disable : Colors.primary.color
        }`,
      }}
    >
      <Text
        style={{
          ...styleButton.text,
          color: `${rest.disabled ? Colors.gray.disable : Colors.dark.color}`,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonCustom);
