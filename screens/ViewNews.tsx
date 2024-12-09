import { useEffect, useState } from "react";
import StyledScrollView from "../components/ScrollView";
import HTMLRenderer from "../components/HtmlRenderer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { ArticleService } from "../service/ArticleService";

export default function ViewNews() {
  const route = useRoute();
  const { link } = route.params as { link: string };

  const [completeNews, setCompleteNews] = useState("");

  useEffect(() => {
    if (!link) return;
    const run = async () => {
      const data = await ArticleService.articleDetails(link);

      setCompleteNews(data.content);
    };
    run();
  }, [link]);

  return (
    <StyledScrollView>
      <SafeAreaView>
        <HTMLRenderer html={completeNews || ""} />
      </SafeAreaView>
    </StyledScrollView>
  );
}
