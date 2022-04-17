import { format } from "date-fns";
import React, { FC } from "react";
import {
  Button,
  Image,
  ImageStyle,
  StyleProp,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useSelector } from "react-redux";
import { GuilderApi } from "../../api/GuilderApi";
import { getAuthenticationToken } from "../../reducer/selectors/auth";
import { Schedule } from "../../types/userData";
import CloseIconButton from "../shared/IconButton/CloseIconButton";
import ConfirmIconButton from "../shared/IconButton/ConfirmIconButton";

type Props = ViewProps & {
  schedule: Schedule;
  characterId?: string;
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

const flexRowCenter: StyleProp<ViewStyle> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const summaryIconStyle: StyleProp<ImageStyle> = {
  width: 14,
  height: 14,
  marginRight: 4,
};

const ScheduleCard: FC<Props> = ({ schedule, characterId, style }) => {
  const token = useSelector(getAuthenticationToken);
  const guilderApi = new GuilderApi(token);

  const { date, accepted, rejected, isMasterAccepted } = schedule;

  console.log({ characterId, accepted });

  let userAccepted;
  let userRejected;
  let pendingUserConfirmation;

  if (characterId) {
    userAccepted = accepted?.includes(characterId);
    userRejected = rejected?.includes(characterId);
    pendingUserConfirmation = !userAccepted && !userRejected;
  } else {
    userAccepted = isMasterAccepted;
    userRejected = !isMasterAccepted;
    pendingUserConfirmation = isMasterAccepted === undefined;
  }

  const handleAcceptSchedule = () => {
    guilderApi.acceptSchedule(schedule._id!, characterId);
  };

  const handleRejectSchedule = () => {
    guilderApi.rejectSchedule(schedule._id!, characterId);
  };

  return (
    <View style={[defaultStyle, style]}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 20 }}>
          {format(new Date(date), "dd/MM/yyyy hh:mm")}
        </Text>
        {pendingUserConfirmation ? (
          <Text style={{ fontSize: 16 }}>Confirmação pendente</Text>
        ) : userAccepted ? (
          <Text style={{ fontSize: 16, color: "green" }}>
            Você aceitou este evento
          </Text>
        ) : (
          <Text style={{ fontSize: 16, color: "red" }}>
            Você rejeitou este evento
          </Text>
        )}
        <View style={flexRowCenter}>
          <View
            style={{
              ...flexRowCenter,
              marginRight: 10,
            }}
          >
            <Image
              style={summaryIconStyle}
              source={require("../../../assets/check-mark.png")}
            />
            <Text>{accepted?.length}</Text>
          </View>
          <View style={flexRowCenter}>
            <Image
              style={summaryIconStyle}
              source={require("../../../assets/close.png")}
            />
            <Text>{rejected?.length}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ConfirmIconButton
          style={{ marginRight: 4 }}
          onPress={handleAcceptSchedule}
        />
        <CloseIconButton onPress={handleRejectSchedule} />
      </View>
    </View>
  );
};

export default ScheduleCard;
