// @ts-nocheck
import { createGlobalStyle } from "styled-components"

export const resetStyle = createGlobalStyle`
   /* Box sizing rules */
   *,
   *::before,
   *::after {
      box-sizing: border-box;
   }

   /* Remove default padding */
   ul[class],
   ol[class] {
      padding: 0;
   }

   /* Remove default margin */
   body,
   div,
   h1,
   h2,
   h3,
   h4,
   h5,
   p,
   ol[class],
   ul[class],
   li,
   figure,
   figcaption,
   blockquote,
   dl,
   dd {
      margin: 0;
   }

   /* Set core body defaults */
   body {
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;
      line-height: 1.5;
   }

   /* Remove list styles on ul, ol elements with a class attribute */
   ul[class],
   ol[class] {
      list-style: none;
   }

   /* remove underline from A elements that have a class */
   a[class] {
      text-decoration: none;
   }
   /* A elements that don't have a class get default styles */
   a:not([class]) {
      text-decoration-skip-ink: auto;
   }

   /* Make images easier to work with */
   img {
      max-width: 100vw;
      display: block;
   }

   /* Natural flow and rhythm in articles by default */
   article > * + * {
      margin-top: 1em;
   }

   /* Inherit fonts for inputs and buttons */
   input,
   button,
   textarea,
   select {
      font: inherit;
   }

   /* // Prevent link and button descendants from being target of click events (for GTM)
   a *, 
   button * {
      pointer-events: none;
   } */

   /* Remove all animations and transitions for people that prefer not to see them */
   @media (prefers-reduced-motion: reduce) {
      * {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
         scroll-behavior: auto !important;
      }
   }
`
