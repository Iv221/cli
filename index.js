#!/usr/bin/env node

import config from "./config.json" assert {type: "json"};
import { listOptions, welcome } from "./cli.js";




await welcome();
await listOptions();