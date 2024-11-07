import store from "./js/store.js";
import { handleRecordingStop } from "./js/controller.js";
import {
    handleVideoRecordingStart,
    handleMuteClick,
} from "./js/videoRecorderController.js";
import { handleScreenRecordingStart } from "./js/screenRecordController.js";

const { domElements } = store;

function init({
    startButton,
    micButton,
    camButton,
    stopButton,
    screenRecButton,
}) {
    startButton.addEventListener("click", handleVideoRecordingStart);
    micButton.addEventListener("click", (e) => handleMuteClick(e, "audio"));
    camButton.addEventListener("click", (e) => handleMuteClick(e, "video"));
    stopButton.addEventListener("click", handleRecordingStop);
    screenRecButton.addEventListener("click", handleScreenRecordingStart);
}

init(domElements);
