import { useNode } from "@craftjs/core";
import { Flex } from "components/Grid";
import { PositionedSettings } from "./PositionedSettings";

export const Positioned = ({ children, ...style }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <Flex
      ref={connect}
      sx={{
        position: "absolute",
        minHeight: 10,
      }}
      style={style}
    >
      {children}
    </Flex>
  );
};

Positioned.craft = {
  name: "Positioned",
  props: {
    top: undefined,
    right: undefined,
    left: undefined,
    bottom: undefined,
  },
  related: {
    settings: PositionedSettings,
  },
};
