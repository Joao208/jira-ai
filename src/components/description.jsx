import ForgeUI, { Fragment, Heading, Text, Code } from "@forge/ui";
import React from "react";
import { getHeadSize } from "../utils/get-head-size";

export const Description = ({ description }) => {
  return (
    <Fragment>
      {description.split("\n").map((text) => {
        const newText = text;

        if (text.startsWith("#")) {
          const { headSize, regex } = getHeadSize(text);

          return (
            <Heading size={headSize}>{newText.replace(regex, "")}</Heading>
          );
        }

        if (text.startsWith("```")) {
          return <Code text={newText.replace(/`/g, "")} />;
        }

        return <Text>{text}</Text>;
      })}
    </Fragment>
  );
};
