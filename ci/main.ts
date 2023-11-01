import "dotenv/config";
import gitlab from "./platforms/gitlab";
import * as consts from "./constants";
import { Queue } from "./utils/queue";
import { initFirebaseInstance } from "./firebase";
import { debounce } from "debounce";

// Validate constants
for (const key in consts) {
  const $key = key as keyof typeof consts;
  if (!consts[$key]?.length) {
    throw new Error($key + " Env variable must be provided");
  }
}

// Init values or Constants
const TRIGGER_PLATFORMS_DEBOUNCE = 3 * 1000 * 60;

const firebase = initFirebaseInstance();
const platforms: (() => void)[] = [gitlab];
const queue = new Queue(platforms.length);

function main() {
  const trigger_platforms = debounce(() => {
    platforms.forEach((fn) => queue.task(fn));
  }, TRIGGER_PLATFORMS_DEBOUNCE);

  firebase.onSnapshot((snapshot) => {
    trigger_platforms();

    // Logs data changes
    snapshot.docChanges().forEach((change) => {
      const log = JSON.stringify(
        {
          Type: change.type,
          Path: change.doc.ref.path,
        },
        undefined,
        2
      );

      console.log(log);
    });
  });

  console.log("CI Start listening...");
}

main();
