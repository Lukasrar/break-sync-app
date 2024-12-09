import { api } from "./Axios";

export const PushNotificationService = {
  async registerToken(token: string, studyCaseId: string) {
    await api.post("/devices/register-device-token", {
      expoToken: token,
      studyCaseId,
    });
  },
};
