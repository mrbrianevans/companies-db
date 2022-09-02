import { Temporal } from "@js-temporal/polyfill";
import {downloadAllInRange, getUpdateFilename, streamUpdateFile} from "./downloadUpdateFile.js";
import {applyUpdatesSince, loadUpdateFile} from "./loadUpdate.js";
import {config} from 'dotenv'
import assert from "assert";
import {readdir} from "fs/promises";
import {createReadStream} from "fs";
import { resolve } from "path";
import split2 from 'split2'
import {pipeline} from "stream/promises";
import { parseRecord } from "../shared/recordParser/parseRecord.js";
import {Readable, Writable} from "stream";
config({path: '.sftp.env'})


await applyUpdatesSince({year: 2021, month: 4, day: 23}, {ensureDownloaded: false})

