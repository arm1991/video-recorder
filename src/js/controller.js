import {
    toggleVisibility,
    handleError,
    removeVideo,
    setDownloadData,
    setVideo,
} from "./ui.js";
import { getUserMediaData, setMediaData } from "./helpers.js";
import store from "./store.js";

const { domElements } = store;

function changeStates() {
    store.state.mic = true;
    store.state.video = true;
}

export function startRecording() {
    const { mediaRecorder } = store.state;

    mediaRecorder.addEventListener("dataavailable", function (e) {
        store.state.recordedData.push(e.data);
    });

    // start recording with each recorded blob having 1 second video
    mediaRecorder.start(1000);
}

export async function handleRecordingStart() {
    try {
        toggleVisibility(domElements.loader);
        toggleVisibility(domElements.startRecordingPage);

        const data = await getUserMediaData();
        setMediaData(data);
        startRecording(domElements, data);
        setVideo(domElements, data);
        changeStates();
        toggleVisibility(domElements.recordingPage);
    } catch (err) {
        console.error(err.message);
        handleError(domElements, err.message);
    } finally {
        toggleVisibility(domElements.loader);
    }
}

export function handleRecordingStop() {
    setDownloadData(store);
    store.state.mediaRecorder.stop();
    removeVideo(domElements);

    toggleVisibility(domElements.recordingPage);
    toggleVisibility(domElements.downLoadBox);
}

export function handleMuteClick(e, type) {
    const stream = domElements.video.srcObject;

    if (stream) {
        let tracks;

        if (type === "audio") {
            tracks = stream.getAudioTracks();
        } else if (type === "video") {
            tracks = stream.getVideoTracks();
        } else {
            return;
        }

        const isMuted = !tracks[0].enabled;
        tracks[0].enabled = isMuted;
    }

    e.target.closest("button").classList.toggle("muted");
}
