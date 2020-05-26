import * as styledComponents from "styled-components";
import { AppTheme } from "../constants/theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<AppTheme>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
