import store from "./js/store.js";
import {
    handleRecordingStart,
    handleRecordingStop,
    handleMuteClick,
} from "./js/controller.js";

const { domElements } = store;

function init({
    startButton,
    micButton,
    camButton,
    stopButton,
    screenRecButton,
}) {
    startButton.addEventListener("click", handleRecordingStart);
    micButton.addEventListener("click", (e) => handleMuteClick(e, "audio"));
    camButton.addEventListener("click", (e) => handleMuteClick(e, "video"));
    stopButton.addEventListener("click", handleRecordingStop);
    screenRecButton.addEventListener("click", () => {});
}

init(domElements);
