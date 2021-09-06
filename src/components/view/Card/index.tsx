import React from "react";
import { View } from "react-native";

const Card: React.FC = ({ children }) => {
  return <View style={styles}>{children}</View>;
};

const styles = {
  borderRadius: 5,
  backgroundColor: "#fff",
  margin: 5,
  padding: 5,
  shadowColor: "#000000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};

export default Card;
