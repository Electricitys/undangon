import { Collapse, Icon } from "@blueprintjs/core"
import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid"
import { useMemo, useState } from "react"

export const SettingSection = ({
  icon,
  label,
  text,
  props,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { nodeProps } = useNode((node) => ({
    nodeProps: props &&
      props.reduce((res, key) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }))
  const summary = useMemo(() => {
    let ret;
    if (typeof label !== "function") {
      ret = label;
    } else {
      ret = label(props.reduce((acc, key) => {
        acc[key] = nodeProps[key];
        return acc;
      }, {}))
    }
    return ret;
  }, [label, props, nodeProps]);

  return (
    <Box sx={{
      borderBottom: "1px solid white",
      borderBottomColor: "gray.2"
    }}>
      <Flex
        type="button"
        sx={{
          cursor: "pointer",
          px: 2,
          py: 2,
        }}
        onClick={() => setIsOpen(open => !open)}
      >
        {icon &&
          <span><Icon icon={icon} /></span>}
        <Box as="span" sx={{ flexGrow: 1 }}>{text}</Box>
        {summary &&
          <span>{summary}</span>}
      </Flex>
      <Collapse isOpen={isOpen}>
        <Box sx={{
          px: 2,
          my: 2,
        }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}