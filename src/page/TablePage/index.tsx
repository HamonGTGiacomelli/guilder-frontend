import { StackNavigationProp } from "@react-navigation/stack";
import _ from "lodash";
import React, { useState } from "react";
import { View, Text } from "react-native";
import Tabs from "../../components/shared/Tabs";
import { Table } from "../../types/userData";
import ChatTab from "./ChatTab";
import GroupInfoTab from "./GroupInfoTab";
import ScheduleTab from "./ScheduleTab";

type Props = {
  navigation: StackNavigationProp<any>;
  route: any;
};

const TAB_CONFIG = [
  {
    label: "C",
    id: "Chat",
  },
  {
    label: "A",
    id: "Agendamento",
  },
  {
    label: "P",
    id: "Personagens",
  },
];

const TablePage: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const { table, character } = route.params;
  const { _id } = table as Table;

  const [currentTab, setCurrentTab] = useState(TAB_CONFIG[0].id);

  const renderContent = () => {
    switch (currentTab) {
      case TAB_CONFIG[0].id:
        return <ChatTab tableId={_id!} character={character} />;
      case TAB_CONFIG[1].id:
        return (
          <ScheduleTab
            navigation={navigation}
            characterId={character?._id}
            tableId={_id!}
          />
        );
      default:
        return (
          <GroupInfoTab
            navigation={navigation}
            character={character}
            table={table}
          />
        );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginHorizontal: 15,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Text style={{ fontSize: 36, color: "#9B0000", fontWeight: "bold" }}>
            {currentTab}
          </Text>
        </View>
        <Tabs
          currentTab={currentTab}
          onChangeTab={(id) => setCurrentTab(id)}
          tabsConfig={TAB_CONFIG}
        />
      </View>
      {renderContent()}
    </View>
  );
};

export default TablePage;
