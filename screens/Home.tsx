import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useMainStore } from "../stores/main";
import { theme } from "../theme";
import { Article } from "../interfaces/Article";
import { ArticleService } from "../service/ArticleService";
import StudyCaseToggle from "../components/StudyCasesToggle";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { expoToken } = useMainStore();
  const [articles, setArticles] = useState<Article[]>([]);

  const navigation = useNavigation();

  const handlePressArticle = (article: Article) => {
    navigation.navigate("ViewNews", { link: article.link });
  };

  useEffect(() => {
    const run = async () => {
      try {
        try {
          const data = await ArticleService.listArticles(expoToken);

          setArticles(data);
        } catch (error) {
          console.error(error);
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    run();
  }, [expoToken]);

  const renderItem = ({ item }: { item: Article }) => (
    <TouchableOpacity
      style={styles.articleItem}
      onPress={() => handlePressArticle(item)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.link}>{item.link}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <SafeAreaView>
        <StudyCaseToggle />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.background,
  },
  notificationItem: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    color: theme.text || "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewButton: {
    alignSelf: "flex-start",
    backgroundColor: "#555",
    padding: 8,
    borderRadius: 5,
  },
  viewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noNotificationsText: {
    color: theme.text || "white",
    fontSize: 18,
    textAlign: "center",
  },

  listContainer: {
    padding: 16,
  },
  articleItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: "#007bff",
  },
});
