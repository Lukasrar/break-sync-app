import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, ScrollView } from "react-native";
import { useMainStore } from "../stores/main";
import { theme } from "../theme";

export interface StudyCase {
  name: string;
  articlesUrl: string;
  _id: string;
}

interface Props {
  studyCases: StudyCase[];
}

const StudyCaseToggle: React.FC<Props> = ({ studyCases }) => {
  const { setCurrentStudyCase, currentStudyCase } = useMainStore();

  const [toggledStudyCases, setToggledStudyCases] = useState<StudyCase[]>(
    () => {
      if (currentStudyCase) {
        return [currentStudyCase];
      }
      return [];
    }
  );

  useEffect(() => {
    if (currentStudyCase) {
      setToggledStudyCases([currentStudyCase]);
    }
  }, [currentStudyCase]);

  const handleToggleChange = (studyCase: StudyCase) => {
    setToggledStudyCases((prevState) => {
      if (prevState.some((item) => item._id === studyCase._id)) {
        return prevState.filter((item) => item._id !== studyCase._id);
      } else {
        return [...prevState, studyCase];
      }
    });

    setCurrentStudyCase(studyCase);
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
