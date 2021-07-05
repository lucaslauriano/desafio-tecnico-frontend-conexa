import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#575453",
      "600": "#7F7978",
      "500": "#999392",
      "300": "#B4AEAD",
      "200": "#CFC9C8",
      "100": "#ECE5E4",
      "700": "#DAD2D0",
      "50": "#FFFFFB",
    },
    blue: {
      "900": "#1C307F",
      "600": "#1C308E",
      "500": "#2E50D4",
    },
  },
  fonts: {
    heading: "Montserrat",
    body: "Nunito",
  },
  shadows: {
    base: "4px 4px 12px  rgba(0, 0, 0, 0.05)",
  },
  styles: {
    global: {
      body: {
        background: "gray.50",
        color: "gray.900",
      },
    },
  },
});
