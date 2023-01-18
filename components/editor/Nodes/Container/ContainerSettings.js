import {
  Button,
  ControlGroup,
  FormGroup,
  HTMLSelect,
  Icon,
  InputGroup,
  RadioGroup,
} from "@blueprintjs/core";
import { ROOT_NODE, useNode } from "@craftjs/core";
import { ColorPicker } from "components/ColorPicker";
import { SettingSection } from "components/editor/Sidepanel/SettingPanel/SettingSection";
import { Box, Flex } from "components/Grid";
import _pick from "lodash/pick";
import _get from "lodash.get";
import _set from "lodash/set";
import { DragValue } from "components/DragValue";
import unitsCss from "units-css";
import { CSSUnitInput } from "./CSSUnitInput";

export const ContainerSettings = () => {
  const {
    isRoot,
    actions: { setProp, setCustom },
    modes,
    values,
  } = useNode((node) => ({
    isRoot: node.id === ROOT_NODE,
    modes: _pick(node.data.custom.settingMode, [
      "height",
      "width",
      "padding",
      "margin",
    ]),
    values: _pick(node.data.props, [
      "height",
      "width",
      "minHeight",
      "minWidth",
      "maxHeight",
      "maxWidth",
      "padding",
      "margin",
      "backgroundColor",
      "borderRadius",
      "flexDirection",
      "justifyContent",
      "alignItems",
    ]),
  }));

  return (
    <>
      {!isRoot && (
        <SettingSection
          text="Dimensions"
          label={({ height, width }) => `${height || 0} x ${width || 0}`}
          props={["height", "width"]}
        >
          <Flex mx={-1}>
            {[
              {
                property: "height",
                icon: "H",
              },
              {
                property: "width",
                icon: "W",
              },
            ].map(({ icon, property }, idx) => (
              <Box key={idx} width="50%" px={1}>
                <FormGroup label={property}>
                  <CSSUnitInput
                    disabled={modes[property] !== "fixed"}
                    iconProps={{
                      text: icon,
                    }}
                    label={property}
                    initialValue={unitsCss.parse(_get(values, property) || "")}
                    onChange={(value) => {
                      setProp((props) => _set(props, property, value));
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <HTMLSelect
                    options={[
                      {
                        label: "Fixed",
                        value: "fixed",
                      },
                      {
                        label: "Hug",
                        value: "hug",
                      },
                      {
                        label: "Fill",
                        value: "fill",
                      },
                    ]}
                    value={_get(modes, property) || ""}
                    onChange={(e) => {
                      console.log(_get(modes, property));
                      setCustom(
                        (p) => (p.settingMode[property] = e.target.value)
                      );
                    }}
                  />
                </FormGroup>
              </Box>
            ))}
          </Flex>
          <SettingSection text="Advance Options">
            <Flex mx={-1}>
              {[
                {
                  property: "minHeight",
                  icon: "H",
                },
                {
                  property: "minWidth",
                  icon: "W",
                },
              ].map(({ icon, property }, idx) => (
                <Box key={idx} width="50%" px={1}>
                  <FormGroup label={property}>
                    <CSSUnitInput
                      iconProps={{
                        text: icon,
                      }}
                      label={property}
                      initialValue={unitsCss.parse(
                        _get(values, property) || ""
                      )}
                      onChange={(value) => {
                        setProp((props) => _set(props, property, value));
                      }}
                    />
                  </FormGroup>
                </Box>
              ))}
            </Flex>
            <Flex mx={-1}>
              {[
                {
                  property: "maxHeight",
                  icon: "H",
                },
                {
                  property: "maxWidth",
                  icon: "W",
                },
              ].map(({ icon, property }, idx) => (
                <Box key={idx} width="50%" px={1}>
                  <FormGroup label={property}>
                    <CSSUnitInput
                      iconProps={{
                        text: icon,
                      }}
                      label={property}
                      initialValue={unitsCss.parse(
                        _get(values, property) || ""
                      )}
                      onChange={(value) => {
                        setProp((props) => _set(props, property, value));
                      }}
                    />
                  </FormGroup>
                </Box>
              ))}
            </Flex>
          </SettingSection>
        </SettingSection>
      )}

      <SettingSection
        text="Padding"
        label={({ padding }) =>
          `${padding[0]}, ${padding[1]}, ${padding[2]}, ${padding[3]}`
        }
        props={["padding"]}
      >
        <Flex flexWrap="wrap" mx={-1}>
          {[
            {
              icon: {
                as: Icon,
                icon: "chevron-backward",
                sx: { transform: "rotate(90deg)" },
              },
            },
            {
              icon: { as: Icon, icon: "chevron-forward" },
            },
            {
              icon: {
                as: Icon,
                icon: "chevron-forward",
                sx: { transform: "rotate(90deg)" },
              },
            },
            {
              icon: {
                as: Icon,
                icon: "chevron-backward",
              },
            },
          ].map(({ icon }, idx) => (
            <Box key={idx} width="50%" px={1}>
              <FormGroup>
                <InputGroup
                  type="number"
                  leftElement={
                    <DragValue
                      min={0}
                      max={1000}
                      friction={5}
                      value={_get(values, `padding[${idx}]`) || 0}
                      onChange={(value) =>
                        setProp((props) => ((props.padding[idx] = value), 100))
                      }
                    >
                      {({ handleMouseDown }) => (
                        <Box
                          {...icon}
                          style={{ cursor: "w-resize" }}
                          onMouseDown={handleMouseDown}
                        />
                      )}
                    </DragValue>
                  }
                  value={_get(values, `padding[${idx}]`) || ""}
                  onChange={(e) => {
                    setProp(
                      (props) => (
                        (props.padding[idx] = Number(e.target.value)), 100
                      )
                    );
                  }}
                />
              </FormGroup>
            </Box>
          ))}
        </Flex>
      </SettingSection>
      {!isRoot && (
        <SettingSection
          text="Margin"
          label={({ margin }) =>
            `${margin[0]}, ${margin[1]}, ${margin[2]}, ${margin[3]}`
          }
          props={["margin"]}
        >
          <Flex flexWrap="wrap" mx={-1}>
            {[
              {
                label: "marginTop",
                icon: {
                  as: Icon,
                  icon: "chevron-backward",
                  sx: { transform: "rotate(90deg)" },
                },
              },
              {
                label: "marginRight",
                icon: { as: Icon, icon: "chevron-forward" },
              },
              {
                label: "marginBottom",
                icon: {
                  as: Icon,
                  icon: "chevron-forward",
                  sx: { transform: "rotate(90deg)" },
                },
              },
              {
                label: "marginLeft",
                icon: {
                  as: Icon,
                  icon: "chevron-backward",
                },
              },
            ].map(({ icon, label }, idx) => (
              <Box key={idx} width="50%" px={1}>
                <FormGroup>
                  <CSSUnitInput
                    iconProps={{
                      icon: <Box {...icon} />,
                    }}
                    label={label}
                    initialValue={unitsCss.parse(
                      _get(values, `margin[${idx}]`) || ""
                    )}
                    onChange={(value) => {
                      setProp((props) => _set(props, `margin[${idx}]`, value));
                    }}
                  />
                </FormGroup>
              </Box>
            ))}
          </Flex>
        </SettingSection>
      )}
      <SettingSection text="Appearance">
        <FormGroup
          label="Background Color"
          labelInfo={
            values.backgroundColor && (
              <Button
                small={true}
                icon="cross"
                minimal={true}
                onClick={() => {
                  setProp((props) => (props.backgroundColor = undefined));
                }}
              />
            )
          }
        >
          <ColorPicker
            value={values.backgroundColor}
            onChange={(color) => {
              setProp((props) => (props.backgroundColor = color.hex));
            }}
          />
        </FormGroup>
        <FormGroup label="Border Radius">
          <InputGroup
            value={values.borderRadius || ""}
            onChange={(e) => {
              setProp((props) => (props.borderRadius = e.target.value));
            }}
          />
        </FormGroup>
      </SettingSection>

      <SettingSection text="Layout">
        <FormGroup label="Direction">
          {[
            {
              icon: "arrow-down",
              value: "column",
            },
            {
              icon: "arrow-right",
              value: "row",
            },
          ].map(({ icon, value }) => (
            <Button
              key={value}
              minimal
              icon={icon}
              active={values.flexDirection === value}
              onClick={() => {
                setProp((props) => (props.flexDirection = value));
              }}
            />
          ))}
        </FormGroup>
        <Flex>
          <Box width={"50%"}>
            <RadioGroup
              label="Horizontal"
              selectedValue={values.alignItems || ""}
              onChange={(e) => {
                setProp((props) => (props.alignItems = e.target.value));
              }}
              options={[
                { label: "Unset", value: "" },
                { label: "Start", value: "start" },
                { label: "Center", value: "center" },
                { label: "End", value: "end " },
              ]}
            />
          </Box>
          <Box>
            <RadioGroup
              label="Vertical"
              selectedValue={values.justifyContent || ""}
              onChange={(e) => {
                setProp((props) => (props.justifyContent = e.target.value));
              }}
              options={[
                { label: "Unset", value: "" },
                { label: "Start", value: "start" },
                { label: "Center", value: "center" },
                { label: "End", value: "end " },
              ]}
            />
          </Box>
        </Flex>
      </SettingSection>
    </>
  );
};
