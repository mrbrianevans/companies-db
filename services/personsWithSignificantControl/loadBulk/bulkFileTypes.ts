import {BulkFileCorporatePsc} from "./bulkFileSchemas/bulkFileCorporatePsc.js";
import {BulkFileSuperSecurePsc} from "./bulkFileSchemas/bulkFileSuperSecurePsc.js";
import {BulkFileIndividualPsc} from "./bulkFileSchemas/bulkFileIndividualPsc.js";
import {BulkFileLegalPsc} from "./bulkFileSchemas/bulkFileLegalPsc.js";
import {BulkFilePscExemptions} from "./bulkFileSchemas/bulkFilePscExemptions.js";
import {BulkFilePscStatement} from "./bulkFileSchemas/bulkFilePscStatement.js";
import {BulkFilePscSummary} from "./bulkFileSchemas/bulkFilePscSummary.js";


export type BulkFileRecord =
  BulkFileCorporatePsc
  | BulkFileIndividualPsc
  | BulkFileLegalPsc
  | BulkFilePscExemptions
  | BulkFilePscStatement
  | BulkFilePscSummary
  | BulkFileSuperSecurePsc
