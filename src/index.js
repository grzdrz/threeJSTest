import { init } from "./test1/test1";

require.context("./", true, /\.(ttf|eot|woff|woff2|svg|png|jpg)$/);

init();
