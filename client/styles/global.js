// @ts-nocheck
import { createGlobalStyle } from "styled-components"

export const globalStyle = createGlobalStyle`
      html, body {
         font-family: ${(props) => props.theme.fontMain};
         font-weight: ${(props) => props.theme.fontMainWeight};
         background: black;

         overflow: hidden;
      }
`
