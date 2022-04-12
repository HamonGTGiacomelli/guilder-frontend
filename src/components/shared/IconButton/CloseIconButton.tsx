import React, { FC } from "react";
import {
  Image,
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type Props = TouchableOpacityProps & {};

const defaultStyle: StyleProp<ViewStyle> = {
  backgroundColor: "#FF0000",
  height: 36,
  width: 36,
  padding: 4,
  borderRadius: 8,
  borderWidth: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const CloseIconButton: FC<Props> = (props) => {
  const { style } = props;
  return (
    <TouchableOpacity {...props} style={[defaultStyle, style]}>
      <Image
        style={{ width: 24, height: 24 }}
        source={require("../../../../assets/close.png")}
      />
    </TouchableOpacity>
  );
};

export default CloseIconButton;
