import fs from "fs/promises";
import { resolve } from "path";

const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[30m\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[30m\x1b[46m",
  BgWhite: "\x1b[47m",
};

/**
 * @param color {keyof colors}
 * @param text {string}
 */
function color(color, text) {
  return `${colors[color]}${text}\x1b[0m`;
}

/**
 * @param description {string}
 * @param callback {VoidFunction}
 */
export function it(description, callback) {
  try {
    callback();
    console.log("  ", color("BgGreen", "Pass"), color("FgGreen", description));
  } catch (error) {
    console.log("  ", color("BgRed", "Fail"), color("FgRed", description));
    console.error(error);
    process.exitCode = 1;
  }
}

/**
 * @param description {string}
 * @param callback {VoidFunction}
 */
export function describe(description, callback) {
  console.log("\n");
  console.log(color("BgCyan", description));
  console.log();
  callback();
}

(async () => {
  for await (const fileName of getFiles(
    ".",
    new Set([".git", "node_modules"])
  )) {
    if (!fileName.endsWith(".test.js")) continue;
    await import(fileName);
  }
})();

/**
 * @param dir {string}
 * @param excludePath {Set<string>}
 * @returns {AsyncGenerator<string>}
 */
async function* getFiles(dir, excludePath) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    if (excludePath.has(dirent.name)) continue;
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res, excludePath);
    } else {
      yield res;
    }
  }
}
