import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { theme } from "../theme";

interface HTMLRendererProps {
  html: string;
}

export default function HTMLRenderer(props: HTMLRendererProps) {
  const { width } = useWindowDimensions();

  return (
    <RenderHtml
      contentWidth={width}
      source={{ html: props.html || "" }}
      tagsStyles={{
        body: {
          fontFamily: "Arial",
          fontSize: 28,
          color: theme.text,
          lineHeight: 38,
          paddingVertical: 30,
          paddingHorizontal: 30,
          textAlign: "left",
        },
        a: {
          color: theme.contrast,
          textDecorationLine: "underline",
          textDecorationColor: theme.contrast,
          fontWeight: "bold",
        },
        img: {
          width: "80%",
        },
      }}
    />
  );
}
