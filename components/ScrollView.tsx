import { ScrollView, StyleSheet } from "react-native";
import { theme } from "../theme";

interface StyledScrollViewProps {
  children: React.JSX.Element;
}

export default function StyledScrollView(props: StyledScrollViewProps) {
  return <ScrollView style={styles.container}>{props.children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: theme.background,
  },
  text: {
    color: "white",
    margin: 20,
    fontSize: 18,
  },
});
