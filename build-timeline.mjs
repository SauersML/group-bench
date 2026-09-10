import {writeFileSync} from 'node:fs';
import {buildTimeline} from './timeline.mjs';
writeFileSync(process.argv[2],JSON.stringify(buildTimeline()));
