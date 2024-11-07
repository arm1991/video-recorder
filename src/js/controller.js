import { toggleVisibility, setDownloadData } from "./ui.js";
import { handleScreenStopped } from "./screenRecordController.js";
import { handleVideoStopped } from "./videoRecorderController.js";
import store from "./store.js";

const { domElements } = store;

export function handleRecordingStop() {
    handleVideoStopped();

    if (store.state.wasScreenRecorded) {
        store.state.screenRec && handleScreenStopped();
        setDownloadData(store, "screenRecord");
        toggleVisibility(domElements.screenRecdownloadBtn);
    }

    toggleVisibility(domElements.recordingPage);
    toggleVisibility(domElements.downloadBox);
}
