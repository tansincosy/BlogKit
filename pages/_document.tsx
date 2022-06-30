import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme,
} from "@material/material-color-utilities";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

const theme = themeFromSourceColor(argbFromHex("#f82506"));
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply the theme to the body by updating custom properties for material tokens
applyTheme(theme, { target: document.body, dark: systemDark });
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          <style key="md-theme-val">{`${theme.schemes}`}</style>
          {initialProps.styles}
        </>
      ),
    };
  }

  render(): JSX.Element {
    return (
      <Html data-theme-light>
        <Head>
          <link
            href="https://fonts.font.im/css?family=Roboto:400,500"
            rel="stylesheet"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
