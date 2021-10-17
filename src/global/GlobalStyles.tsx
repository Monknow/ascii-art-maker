import {createGlobalStyle} from "styled-components";
import "@assets/fonts/fonts.css";

export const backgroundColor = "rgb(36,36,36)";
export const mainColor = "rgba(255,255,255,0.075)";
export const activeMainColor = "rgba(255,255,255,0.125)";
export const highlightColor = "#0055c6";
export const activeHighlightColor = "#006dff";
export const breakpoint = "700px";

export const GlobalStyles = createGlobalStyle`
    *{
        margin:0px;
        padding: 0px;
    }

    html{
        font-size: clamp(8px, 2vw, 12px);
        font-family: "Open Sans Regular", sans-serif;
        
    } 

    body{
        overflow-x: hidden;

        scrollbar-color: ${mainColor} #999;
        scrollbar-width: thin;
        

    }

`;
