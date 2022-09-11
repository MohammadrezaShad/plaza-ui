import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
   *{
      padding: 0;
      margin: 0;
      list-style-type:none;
      outline:none;
      box-sizing:border-box;
   }

   html{
    height: 100%;
    font-size: 100%;
   }

   body{
      height: 100%;
   }



   #root {
    direction: rtl;
  }
`;
export default GlobalStyle;
