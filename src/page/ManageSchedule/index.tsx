import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import PrimaryButton from "../../components/view/Buttons/PrimaryButton";
import TextField from "../../components/view/Fields/TextInput";
import { format, parse } from "date-fns";
import { useSelector } from "react-redux";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { GuilderApi } from "../../api/GuilderApi";
import { Schedule } from "../../types/userData";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

export const ManageSchedule: FC<Props> = ({ navigation, route }) => {
  const token = useSelector(getAuthenticationToken);
  const { tableId } = route.params;

  const guilderApi = new GuilderApi(token);

  const [date, setDate] = useState(format(new Date(), "dd/MM/yyyy"));
  const [time, setTime] = useState(format(new Date(), "HH:mm"));

  const onSavePress = () => {
    navigation.goBack();
    const schedule: Schedule = {
      date: parse(
        `${date} ${time}`,
        "dd/MM/yyyy HH:mm",
        new Date()
      ).toISOString(),
    };
    guilderApi.saveSchedule(tableId, schedule);
  };

  console.log({ tableId });

  let formattedDate;

  // use to the call
  try {
    const fullDate = parse(`${date} ${time}`, "dd/MM/yyyy HH:mm", new Date());
    formattedDate = format(fullDate, "dd/MM/yyyy HH:mm");
  } catch {
    formattedDate = "Invalid Date";
  }

  return (
    <View style={{ padding: 8 }}>
      <TextField label="Data" value={date} setValue={setDate} />
      <TextField label="Horário" value={time} setValue={setTime} />
      <Text>{formattedDate}</Text>
      <PrimaryButton label="Salvar" onPress={onSavePress} />
    </View>
  );
};
