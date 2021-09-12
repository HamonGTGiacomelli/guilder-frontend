import React from "react";
import { Image, View, ImageSourcePropType, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Card from ".";

type Props = {
  source: ImageSourcePropType;
  onImagePress: () => void;
  onBodyPress: () => void;
  onEditPress: () => void;
  onRemovePress: () => void;
};

const TableCharacterItemList: React.FC<Props> = (props) => {
  const {
    source,
    children,
    onImagePress,
    onBodyPress,
    onEditPress,
    onRemovePress,
  } = props;
  return (
    <Card>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableWithoutFeedback onPress={onImagePress}>
          <Image
            style={{ height: 50, width: 50, marginRight: 16 }}
            source={source}
          />
        </TouchableWithoutFeedback>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={onBodyPress}>
            {children}
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={onEditPress}>
            <Image
              source={require("../../../../assets/edit.png")}
              style={{ width: 28, height: 28 }}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onRemovePress}>
            <Image
              source={require("../../../../assets/trash.png")}
              style={{ width: 28, height: 28 }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Card>
  );
};

export default TableCharacterItemList;
