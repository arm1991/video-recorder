import { handleError, toggleVisibility, setDownloadData } from "./ui.js";
import { handleScreenStopped } from "./screenRecordController.js";
import { handleVideoStopped } from "./videoRecorderController.js";
import { downloadFile } from "./downloadHelpers.js";
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

    // addDownloadEvents();
}

async function addDownloadEvents() {
    const downloadRecordButton = domElements.downloadBox.children[0];
    addDownloadEvent(downloadRecordButton, store.state.recordedVideoData);

    if (store.state.wasScreenRecorded) {
        const downloadScreenRecordButton = domElements.downloadBox.children[1];
        addDownloadEvent(
            downloadScreenRecordButton,
            store.state.recordedScreenData
        );
    }
}

function addDownloadEvent(button, url) {
    const video_local = URL.createObjectURL(
        new Blob(url, { type: "video/webm" })
    );

    button.addEventListener("click", async () => {
        try {
            chrome.action.setBadgeText({ text: "DL" });
            toggleVisibility(domElements.loader);

            const downloadId = await downloadFile(video_local);

            console.log(`Download completed with ID: ${downloadId}`);
            store.state.downloading = !store.state.downloading;
        } catch (err) {
            console.error(err.message);
            handleError(domElements, err.message, "download");
            chrome.action.setBadgeText({ text: "!" });
        } finally {
            chrome.action.setBadgeText({ text: "" });
            toggleVisibility(domElements.loader);
            store.state.downloading = !store.state.downloading;
        }
    });
}
