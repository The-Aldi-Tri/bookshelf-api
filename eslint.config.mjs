import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        process: true, // Add process as a global variable
      },
    },
  },
  pluginJs.configs.recommended,
];
