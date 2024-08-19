import { Gitlab } from "@gitbeaker/rest";
import {
  GITLAB_HOST,
  GITLAB_PROJECT_ID,
  GITLAB_PROJECT_REF,
  GITLAB_TRIGGER_TOKEN,
} from "../constants";

const api = new Gitlab({
  host: GITLAB_HOST,
  token: "",
});

export default () => {
  // Trigger pipline to build
  api.PipelineTriggerTokens.trigger(
    GITLAB_PROJECT_ID,
    GITLAB_PROJECT_REF,
    GITLAB_TRIGGER_TOKEN
  );
};
