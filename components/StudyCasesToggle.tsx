import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { useMainStore } from "../stores/main";
import { theme } from "../theme";
import { PushNotificationService } from "../service/PushNotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StudyCase {
  name: string;
  articlesUrl: string;
  _id: string;
}

const StudyCaseToggle = () => {
  const { setCurrentStudyCase, currentStudyCase, studyCases, expoToken } =
    useMainStore();

  const [toggledStudyCases, setToggledStudyCases] = useState<StudyCase[]>([]);

  useEffect(() => {
    const loadSavedStudyCase = async () => {
      const savedStudyCase = await AsyncStorage.getItem("currentStudyCase");
      if (savedStudyCase) {
        setToggledStudyCases([JSON.parse(savedStudyCase)]);
      } else if (currentStudyCase) {
        setToggledStudyCases([currentStudyCase]);
      }
    };

    loadSavedStudyCase();
  }, [currentStudyCase]);

  const handleToggleChange = async (studyCase: StudyCase) => {
    try {
      setToggledStudyCases((prevState) => {
        if (prevState.some((item) => item._id === studyCase._id)) {
          return prevState.filter((item) => item._id !== studyCase._id);
        } else {
          return [...prevState, studyCase];
        }
      });

      await PushNotificationService.registerToken(
        expoToken,
        studyCase?._id || ""
      );

      setCurrentStudyCase(studyCase);

      await AsyncStorage.setItem("currentStudyCase", JSON.stringify(studyCase));
    } catch (error) {}
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {studyCases.map((studyCase) => (
        <View key={studyCase._id} style={styles.studyCaseContainer}>
          <Text style={styles.studyCaseText}>{studyCase.name}</Text>
          <Switch
            value={toggledStudyCases.some((item) => item._id === studyCase._id)}
            onValueChange={() => handleToggleChange(studyCase)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  studyCaseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  studyCaseText: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
  },
});

export default StudyCaseToggle;
