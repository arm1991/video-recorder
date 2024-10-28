import store from "./store.js";
import {
    toggleVisibility,
    setVideo,
    removeVideo,
    handleError,
    toggleBtnMuted,
} from "./ui.js";
import {
    getUserDisplayData,
    setDisplayData,
    startScreenRecording,
} from "./helpers.js";

const { domElements } = store;

export function handleScreenStopped() {
    toggleBtnMuted(domElements.screenRecButton);
    store.state.displayRecorder.stop();
    changeScreenRecState();
    removeVideo(domElements.screenVideo);
    toggleVisibility(domElements.screenVideoBox);
}

export async function handleScreenRecordingStart(e) {
    if (store.state.screenRec) {
        handleScreenStopped(e);
        return;
    }

    try {
        const data = await getUserDisplayData();
        store.state.wasRecorded = true;
        setDisplayData(data);
        startScreenRecording(domElements, data);
        changeScreenRecState();
        setVideo(domElements.screenVideo, data);
        toggleVisibility(domElements.screenVideoBox);

        toggleBtnMuted(domElements.screenRecButton);
        // for stopping screenRec outside of programm
        setScreenRecStop(data);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        handleError(domElements, err.message, "screenRecord");
    }
}

// for stopping screenRec outside of programm
function setScreenRecStop(data) {
    const screenTrack = data.getVideoTracks()[0];
    screenTrack.onended = handleScreenStopped;
}

export function changeScreenRecState() {
    store.state.screenRec = !store.state.screenRec;
}
