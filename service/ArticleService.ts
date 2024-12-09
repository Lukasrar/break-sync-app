import { Device } from "../interfaces/device";
import { api } from "./Axios";

export const ArticleService = {
  async scrapeArticles(device: Device) {
    await api.post(`/news/get-todays-news`, device);
  },

  async listArticles(expoToken: string) {
    const { data } = await api.post(`/news/list-articles-per-device`, {
      expoToken,
    });
    return data;
  },

  async articleDetails(link: string) {
    const { data } = await api.post(`/news/article-data`, {
      link,
    });
    return data;
  },
};
