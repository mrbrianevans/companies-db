/*
Script that can be run to schedule a job immediately. Mostly for testing without waiting for the cron.

Can be run in docker with this command:
docker compose exec updater-scheduler node job/scheduleImmediate.js
*/

import {dailyUpdatesQueueName} from "../../shared/bull/queueNames.js";
import {bullRedisConnection} from "../../shared/bull/bullRedisConnection.js";
import { Queue } from "bullmq";

const queue = new Queue(dailyUpdatesQueueName,{connection: bullRedisConnection})

const job = await queue.add('immediately-update', {}, {})

console.log("Scheduled job", job.name, job.id)

await queue.close()
