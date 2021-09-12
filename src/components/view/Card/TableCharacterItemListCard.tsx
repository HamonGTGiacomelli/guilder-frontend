import React from "react";
import {
  Image,
  View,
  ImageSourcePropType,
  Alert,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const optionsWrapper: StyleProp<ViewStyle> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const contentWrapper: StyleProp<ViewStyle> = {
  backgroundColor: "#FFFFFF",
  borderRadius: 5,
  marginTop: 8,
  marginHorizontal: 15,
  borderWidth: 1,
  padding: 10,
  display: "flex",
  flexDirection: "row",
};

const mainContentStyle: StyleProp<ViewStyle> = {
  flexGrow: 1,
  paddingHorizontal: 16,
};

const imageWrapper: StyleProp<ViewStyle> = {
  height: 50,
  width: 50,
  overflow: "hidden",
  borderRadius: 50,
  borderWidth: 1,
};

const imageStyle: StyleProp<ImageStyle> = {
  height: 50,
  width: 50,
  marginRight: 16,
};

const optionStyle: StyleProp<ImageStyle> = { width: 28, height: 28 };

const optionWrapperStyle: StyleProp<ViewStyle> = { paddingHorizontal: 4 };

const mainContentWrapper: StyleProp<ViewStyle> = {
  flex: 1,
};

type Props = {
  source: ImageSourcePropType;
  onBodyPress: () => void;
  onEditPress: () => void;
  onRemovePress: () => void;
};

const TableCharacterItemList: React.FC<Props> = (props) => {
  const { source, children, onBodyPress, onEditPress, onRemovePress } = props;
  return (
    <View style={contentWrapper}>
      <TouchableWithoutFeedback
        containerStyle={mainContentWrapper}
        style={{ display: "flex", flexDirection: "row" }}
        onPress={onBodyPress}
      >
        <View style={imageWrapper}>
          <Image style={imageStyle} source={source} />
        </View>
        <View style={mainContentStyle}>{children}</View>
      </TouchableWithoutFeedback>
      <View style={optionsWrapper}>
        <TouchableWithoutFeedback
          containerStyle={optionWrapperStyle}
          onPress={onEditPress}
        >
          <Image
            source={require("../../../../assets/edit.png")}
            style={optionStyle}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          containerStyle={optionWrapperStyle}
          onPress={onRemovePress}
        >
          <Image
            source={require("../../../../assets/trash.png")}
            style={optionStyle}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default TableCharacterItemList;
