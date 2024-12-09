import { api } from "./Axios";

export const StudyCaseService = {
  async getStudyCases() {
    const { data } = await api.get(`/study-case`);

    return data;
  },
};
