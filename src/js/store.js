const store = {
    domElements: {
        startRecordingPage: document.getElementById("start-recording-page"), // null
        recordingPage: document.getElementById("recording-page"),

        video: document.getElementById("video"),
        screenVideo: document.getElementById("screen"),
        screenVideoBox: document.getElementById("screen-rec-box"),
        screenRecdownloadBtn: document.getElementById("screen-download-btn"),

        error: document.getElementById("error"),
        loader: document.getElementById("loader"),
        downloadBox: document.getElementById("download"),

        startButton: document.getElementById("start-recording"),
        micButton: document.getElementById("mic"),
        camButton: document.getElementById("cam"),
        stopButton: document.getElementById("stop"),
        screenRecButton: document.getElementById("screen-rec"),
    },
    state: {
        mediaRecorder: null,
        displayRecorder: null,
        recordedScreenData: [],
        recordedVideoData: [],
        screenRec: false,
        mic: false,
        video: false,
        wasScreenRecorded: false,
        downloading: false,
    },
};

export default Object.freeze(store);
