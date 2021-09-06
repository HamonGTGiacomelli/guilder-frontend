import React from "react";
import { Image, View, ImageSourcePropType } from "react-native";
import Card from ".";

type Props = {
  source: ImageSourcePropType;
};

const TableCharacterItemList: React.FC<Props> = (props) => {
  const { source, children } = props;
  return (
    <Card>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Image
          style={{ height: 50, width: 50, marginRight: 16 }}
          source={source}
        />
        {children}
      </View>
    </Card>
  );
};

export default TableCharacterItemList;
