import { View, Text, ButtonProps, TouchableOpacity } from "react-native";
import React from "react";
import { styleButton } from "./style";

interface Props extends ButtonProps {
  title: string;
}

const ButtonCustom: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={styleButton.container}>
      <Text style={styleButton.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonCustom);
