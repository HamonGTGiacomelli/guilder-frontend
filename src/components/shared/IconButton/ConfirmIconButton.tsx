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
  backgroundColor: "#00FF00",
  height: 36,
  width: 36,
  padding: 4,
  borderRadius: 8,
  borderWidth: 1,
};

const ConfirmIconButton: FC<Props> = (props) => {
  const { style } = props;
  return (
    <TouchableOpacity {...props} style={[defaultStyle, style]}>
      <Image
        style={{ width: 28, height: 28 }}
        source={require("../../../../assets/check-mark.png")}
      />
    </TouchableOpacity>
  );
};

export default ConfirmIconButton;
