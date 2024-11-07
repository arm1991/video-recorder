import store from "./store.js";

export async function getUserMediaData() {
    try {
        return await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
    } catch (err) {
        throw err;
    }
}

export async function getUserDisplayData() {
    const displayMediaOptions = {
        video: {
            displaySurface: "browser",
        },
        audio: {
            suppressLocalAudioPlayback: false,
        },
        preferCurrentTab: false,
        selfBrowserSurface: "exclude",
        systemAudio: "include",
        surfaceSwitching: "include",
        monitorTypeSurfaces: "include",
    };

    try {
        return await navigator.mediaDevices.getDisplayMedia(
            displayMediaOptions
        );
    } catch (err) {
        throw err;
    }
}

export function setMediaData(data) {
    // set MIME type of recording as video/webm
    store.state.mediaRecorder = new MediaRecorder(data, {
        mimeType: "video/webm",
    });
}

export function setDisplayData(data) {
    // set MIME type of recording as video/webm
    store.state.displayRecorder = new MediaRecorder(data, {
        mimeType: "video/webm",
    });
}

export function startVideoRecording() {
    const { mediaRecorder } = store.state;

    mediaRecorder.addEventListener("dataavailable", function (e) {
        store.state.recordedVideoData.push(e.data);
    });

    // start recording with each recorded blob having 1 second video
    mediaRecorder.start(1000);
}

export function startScreenRecording() {
    const { displayRecorder } = store.state;

    displayRecorder.addEventListener("dataavailable", function (e) {
        store.state.recordedScreenData.push(e.data);
    });

    // start recording with each recorded blob having 1 second video
    displayRecorder.start(1000);
}

export function getDownLoadLink({ downloadBox }, type) {
    if (type === "screenRecord") return downloadBox.children[1];
    if (type === "video") return downloadBox.children[0];

    return null;
}

export function getRecordedData(state, type) {
    if (type === "screenRecord") return state.recordedScreenData;
    if (type === "video") return state.recordedVideoData;

    return null;
}
