import { Temporal } from "@js-temporal/polyfill";
import {downloadUpdateFile} from "./downloadUpdateFile.js";
import {loadUpdateFile} from "./loadUpdate.js";
import {config} from 'dotenv'
config({path: '.sftp.env'})

const today = Temporal.Now.plainDateISO('UTC')
const {year,month,day} = today

const updateFile = await downloadUpdateFile({year,month,day})

await loadUpdateFile(updateFile)

