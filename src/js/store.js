const store = {
    domElements: {
        startRecordingPage: document.getElementById("start-recording-page"),
        recordingPage: document.getElementById("recording-page"),

        video: document.getElementById("video"),
        error: document.getElementById("error"),
        loader: document.getElementById("loader"),
        downLoadBox: document.getElementById("download"),

        startButton: document.getElementById("start-recording"),
        micButton: document.getElementById("mic"),
        camButton: document.getElementById("cam"),
        stopButton: document.getElementById("stop"),
        screenRecButton: document.getElementById("screen-rec"),
    },
    state: {
        mediaRecorder: null,
        recordedData: [],
    },
};

export default Object.freeze(store);
