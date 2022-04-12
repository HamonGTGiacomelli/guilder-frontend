import { StackNavigationProp } from "@react-navigation/stack";
import { format } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import ScheduleCard from "../../components/ScheduleCard";
import PrimaryButton from "../../components/shared/Buttons/PrimaryButton";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { ROUTES } from "../../router/constants";
import { Schedule, Table } from "../../types/userData";

type Props = {
  navigation: StackNavigationProp<any>;
  tableId: string;
};

const ScheduleTab: FC<Props> = ({ tableId, navigation }) => {
  const token = useSelector(getAuthenticationToken);
  const [schedules, setSchedules] = useState<Schedule[]>();

  const guilderApi = new GuilderApi(token);

  useEffect(() => {
    guilderApi.getSchedules(tableId).then((res) => {
      const { data } = res;
      setSchedules(data);
    });
  }, []);

  const handleOnAddSchedulePress = () => {
    console.log({ tableId });
    navigation.push(ROUTES.MANAGE_SCHEDULE, { tableId });
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={{ flex: 1, paddingVertical: 8 }}>
        {!schedules ? (
          <Text>Loading...</Text>
        ) : schedules.length === 0 ? (
          <Text>Nenhum agendamento encontrado</Text>
        ) : (
          schedules.map((schedule) => {
            const { _id } = schedule;
            return (
              <ScheduleCard
                key={_id}
                style={{ marginBottom: 8 }}
                schedule={schedule}
              />
            );
          })
        )}
      </View>
      <PrimaryButton label="Marcar sessão" onPress={handleOnAddSchedulePress} />
    </View>
  );
};

export default ScheduleTab;
