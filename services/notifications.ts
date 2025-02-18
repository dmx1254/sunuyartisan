interface NotificationMessage {
  to: string;
  sound: "default" | string;
  title: string;
  body: string;
  data?: any;
}

export async function sendPushNotification(
  expoPushToken: string | null,
  title: string,
  body: string
) {
  if (!expoPushToken) return;
  try {
    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data: {
        screen: "notifications",
        url: "(user)/notifications",
      },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error("Erreur envoi notification:", error);
    throw error;
  }
}

// Gestionnaire de notification lorsque l'app est en arrière-plan
