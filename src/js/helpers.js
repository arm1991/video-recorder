import store from "./store.js";

export async function getUserMediaData() {
    try {
        return await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
    } catch (err) {
        throw new Error(err);
    }
}

export function setMediaData(data) {
    // set MIME type of recording as video/webm
    store.state.mediaRecorder = new MediaRecorder(data, {
        mimeType: "video/webm",
    });
}
