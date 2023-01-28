import { useNode } from "@craftjs/core";
import { Box, Flex } from "components/Grid";
import _set from "lodash/set";
import _pick from "lodash/pick";
import _merge from "lodash/merge";
import { useRef } from "react";
import { DocumentSettings } from "./DocumentSettings";
import AudioPlayer from "react-audio-player";
import { useRouter } from "next/router";
import { useViewport } from "components/editor/Viewport/useViewport";
import { ProcessUnitForViewport } from "../Container/ProcessUnitForViewport";

export const Document = ({ children, modalOptions, musicOptions }) => {
  const {
    connectors: { connect },
  } = useNode();

  const audioPlayerRef = useRef();

  const { query: searchParams } = useRouter();
  const { media, isProduction } = useViewport();

  return (
    <Flex
      ref={connect}
      sx={{
        position: "relative",
        minHeight: !isProduction
          ? ProcessUnitForViewport("100vh", media.currentMedia.height)
          : undefined,
      }}
    >
      <Flex sx={{ position: "absolute", bottom: 0, left: 0 }}>
        {musicOptions.url && (
          <AudioPlayer ref={audioPlayerRef} src={musicOptions.url} />
        )}
      </Flex>
      <ModalComponent
        isOpen={modalOptions.open}
        imageUrl={modalOptions.imageUrl}
        guests={searchParams.u}
      />
      {children}
    </Flex>
  );
};

const ModalComponent = ({ isOpen, imageUrl, guests }) => {
  const { actions } = useNode();
  const handleInvitation = () => {
    actions.setProp((props) => _set(props, "modalOptions.open", !isOpen));
  };
  return (
    <Box
      className={isOpen && "opened"}
      sx={{
        position: "absolute",
        zIndex: 999,
        inset: 0,
        opacity: "1",
        transitionDelay: "0ms",
        transition: "0ms ease-out",
        "&.opened": {
          opacity: "0",
          visibility: "hidden",
          transition: "500ms ease-out",
          transitionDelay: "2000ms",
        },
        "& > .image": {
          opacity: "1",
          transform: "translateX(0)",
          transition: "0ms ease-out",
          transitionDelay: "0ms",
        },
        "&.opened > .image": {
          opacity: "0",
          transform: "translateX(393px)",
          transition: "500ms ease-out",
          transitionDelay: "1500ms",
        },
        "& > .image .overlay": {
          opacity: "0.5",
          transition: "0ms ease-out",
          transitionDelay: "0ms",
        },
        "&.opened > .image .overlay": {
          opacity: "0",
          transition: "500ms ease-out 500ms",
          transitionDelay: "500ms",
        },
        "& > .text": {
          opacity: "1",
          transition: "0ms ease-out",
          transitionDelay: "0ms",
        },
        "&.opened > .text": {
          opacity: "0",
          transition: "500ms ease-out",
          transitionDelay: "0ms",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgb(0,142,145)",
          background:
            "linear-gradient(35deg, rgba(0,142,145,1) 0%, rgba(255,171,112,1) 100%)",
          opacity: 0.95,
        }}
      />
      <Box
        className="image"
        sx={{
          position: "absolute",
          inset: 0,
          p: 3,
        }}
      >
        <Box
          sx={{
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 512,
            maxHeight: 851,
            height: "100%",
            width: "100%",
            boxShadow: "0px 0px 36px -16px grey",
          }}
        >
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgb(0,142,145)",
              background:
                "linear-gradient(35deg, rgba(255,171,112,1) 0%, rgba(0,142,145,1) 100%)",
              opacity: 0.5,
            }}
          />
          <Box
            as="img"
            src={imageUrl}
            sx={{
              display: "block",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Flex
        className="text"
        sx={{
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            py: 4,
            px: 2,
            color: "white",
            textAlign: "center",
            maxWidth: 512,
          }}
        >
          <Box sx={{ textShadow: "1px 1px 4px rgba(0,0,0,0.65)" }}>
            <Box sx={{ fontSize: 2, fontWeight: "bold", mb: 2, mt: 4 }}>
              Dear Mr/Mrs/Ms
            </Box>
            <Box sx={{ fontSize: 5, mb: 4 }}>{guests}</Box>
            <Box sx={{ fontSize: 2, mb: 4 }}>
              You are invited to our wedding
            </Box>
          </Box>
          <Box
            as="button"
            onClick={() => {
              handleInvitation();
            }}
            sx={{
              border: "1px solid white",
              borderColor: "gray.4",
              borderRadius: 4,
              px: 3,
              py: 2,
            }}
          >
            Open Invitation
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export const defaultProps = {
  modalOptions: {
    open: false,
    imageUrl: "https://via.placeholder.com/150",
  },
  musicOptions: {
    url: undefined,
    showButton: undefined,
  },
};

Document.craft = {
  name: "Document",
  props: defaultProps,
  custom: {},
  related: {
    settings: DocumentSettings,
  },
};