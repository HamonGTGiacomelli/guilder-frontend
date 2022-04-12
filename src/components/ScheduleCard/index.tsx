import { format } from "date-fns";
import React, { FC } from "react";
import {
  Button,
  StyleProp,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Schedule } from "../../types/userData";
import CloseIconButton from "../shared/IconButton/CloseIconButton";
import ConfirmIconButton from "../shared/IconButton/ConfirmIconButton";

type Props = ViewProps & {
  schedule: Schedule;
};

const defaultStyle: StyleProp<ViewStyle> = {
  padding: 8,
  borderWidth: 1,
  borderColor: "#000000",
  borderRadius: 8,
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "row",
};

const ScheduleCard: FC<Props> = ({ schedule, style }) => {
  const { date } = schedule;

  return (
    <View style={[defaultStyle, style]}>
      <View style={{ flex: 1 }}>
        <Text>{format(new Date(date), "dd/MM/yyyy hh:mm")}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <ConfirmIconButton
          style={{ marginRight: 4 }}
          onPress={() => console.log("confirm")}
        />
        <CloseIconButton onPress={() => console.log("confirm")} />
      </View>
    </View>
  );
};

export default ScheduleCard;
