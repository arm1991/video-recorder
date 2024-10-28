import { toggleVisibility } from "./ui.js";
import { handleScreenStopped } from "./screenRecordController.js";
import { handleVideoStopped } from "./videoRecorderController.js";
import store from "./store.js";

const { domElements } = store;

export function handleRecordingStop() {
    handleVideoStopped();

    if (store.state.wasRecorded) {
        store.state.screenRec && handleScreenStopped();
        toggleVisibility(domElements.screenRecdownloadBtn);
    }

    toggleVisibility(domElements.recordingPage);
    toggleVisibility(domElements.downloadBox);
}
