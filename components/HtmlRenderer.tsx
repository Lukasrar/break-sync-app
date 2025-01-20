import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { theme } from "../theme";
import { removeTagsAndClasses } from "../helpers/SanitazeHTML";

interface HTMLRendererProps {
  html: string;
}

export default function HTMLRenderer(props: HTMLRendererProps) {
  const { width } = useWindowDimensions();

  const tagsToRemove = ["nav", "script"];
  const classesToRemove = [
    "billboard",
    "ads",
    "comment__footer",
    "series-switcher",
    "multiple_reactions_engagement",
  ];
  const idsToRemove = [
    "hide-comments-modal__report-link",
    "comment-subscription",
    "hide-comments-modal",
    "comments",
  ];

  const sanitizedHtml = removeTagsAndClasses(
    props.html,
    tagsToRemove,
    classesToRemove,
    idsToRemove
  );

  return (
    <RenderHtml
      contentWidth={width}
      source={{ html: sanitizedHtml || "" }}
      tagsStyles={{
        body: {
          fontFamily: "Arial",
          fontSize: 20,
          color: theme.text,
          lineHeight: 38,
          paddingVertical: 30,
          paddingHorizontal: 30,
          textAlign: "left",
        },
        a: {
          color: theme.contrast,
          textDecorationLine: "none",
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
