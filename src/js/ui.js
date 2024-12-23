import { getDownLoadLink, getRecordedData } from "./helpers.js";

export function handleError({ error }, message, type) {
    error.innerHTML = getErrorInnerHTML(message, type);
    toggleVisibility(error);
    setErrorEvents(error);
}

export function toggleVisibility(component) {
    component.classList.toggle("hide");
}

export function setVideo(video, data) {
    video.srcObject = data;
}

export function removeVideo(video) {
    const stream = video.srcObject;

    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
    }

    video.srcObject = null;
}

export function setDownloadData({ state, domElements }, type) {
    const video_local = URL.createObjectURL(
        new Blob(getRecordedData(state, type), { type: "video/webm" })
    );

    const downloadLink = getDownLoadLink(domElements, type);

    downloadLink.href = video_local;
    downloadLink.download = "recorded_video.webm";
}

export function toggleBtnMuted(btn) {
    btn.classList.toggle("muted");
}

function getErrorInnerHTML(text, type) {
    const reloadButton = `<a href="" class="link-btn bg-light-gray center"> Reload The Page </a>`;
    const popUp = `
        
        <div class="pop-up-background" id="pop-up-background">
            <div class="pop-up error">
                <h4 id="error-text">${text}</h4>
                <button id="pop-up__button" >Got it</button>
            </div>
        </div>
    `;

    if (type === "screenRecord" || type === "download") return popUp;
    return reloadButton + popUp;
}

function setErrorEvents(error) {
    const button = document.getElementById("pop-up__button");
    const background = document.getElementById("pop-up-background");

    if (button) button.addEventListener("click", (e) => hideError(e, error));
    if (background)
        background.addEventListener("click", (e) => hideError(e, error));
}

function hideError(e, error) {
    const id = e.target.id;
    if (id === "pop-up-background" || id === "pop-up__button") {
        toggleVisibility(error);
        e.target.closest("#pop-up-background").remove();
    }
}
