import "@babel/polyfill";

import { Game } from "./game/Game";

require.context("./", true, /\.(ttf|eot|woff|woff2|svg|png|jpg)$/);

const game = new Game();
game.init();
