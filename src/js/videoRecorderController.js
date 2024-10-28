import store from "./store.js";
import {
    toggleVisibility,
    handleError,
    setVideo,
    setDownloadData,
    removeVideo,
    toggleBtnMuted,
} from "./ui.js";
import {
    getUserMediaData,
    setMediaData,
    startVideoRecording,
} from "./helpers.js";

const { domElements } = store;

export async function handleVideoRecordingStart() {
    try {
        toggleVisibility(domElements.loader);
        toggleVisibility(domElements.startRecordingPage);

        const data = await getUserMediaData();
        setMediaData(data);
        startVideoRecording(domElements, data);
        setVideo(domElements.video, data);
        changeVideoRecStates();
        toggleVisibility(domElements.recordingPage);
    } catch (err) {
        console.error(err.message);
        handleError(domElements, err.message);
    } finally {
        toggleVisibility(domElements.loader);
    }
}

export function changeVideoRecStates() {
    store.state.mic = !store.state.mic;
    store.state.video = !store.state.video;
}

export function handleMuteClick(e, type) {
    const stream = domElements.video.srcObject;
    if (!stream) return;

    let tracks;
    let state;

    if (type === "audio") {
        tracks = stream.getAudioTracks();
        store.state.mic = !store.state.mic;
        state = store.state.mic;
    } else if (type === "video") {
        tracks = stream.getVideoTracks();
        store.state.video = !store.state.video;
        state = store.state.video;
    } else {
        return;
    }

    tracks[0].enabled = state;

    toggleBtnMuted(e.target.closest("button"));
}

export function handleVideoStopped() {
    setDownloadData(store, "video");
    store.state.mediaRecorder.stop();
    changeVideoRecStates();
    removeVideo(domElements.video);
}
