#!/usr/bin/env node
import { defineCommand, runMain } from "citty";
import { resolve } from "pathe";
import { name, version, description } from "../package.json";
import { build } from "./build";

const main = defineCommand({
  meta: {
    name,
    version,
    description,
  },
  args: {
    dir: {
      type: "positional",
      description: "The directory to build",
      required: false,
    },
    stub: {
      type: "boolean",
      description: "Stub build",
    },
  },
  async run({ args }) {
    const rootDir = resolve(process.cwd(), args.dir || ".");
    await build(rootDir, args.stub).catch((error) => {
      console.error(`Error building ${rootDir}: ${error}`);
      throw error;
    });
  },
});

runMain(main);
