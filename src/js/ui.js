export function handleError({ error }, message) {
    toggleVisibility(error);
    const errorMessage = message
        .split(" ")
        .filter((_, idx) => idx !== 0)
        .join(" ");
    error.children[0].textContent = errorMessage;
}

export function toggleVisibility(component) {
    component.classList.toggle("hide");
}

export function setVideo({ video }, data) {
    video.srcObject = data;
}

export function removeVideo({ video }) {
    const stream = video.srcObject;

    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => {
            track.stop();
        });
    }

    video.srcObject = null;
}

export function setDownloadData({ state, domElements }) {
    // Create a Blob from the recorded data
    const video_local = URL.createObjectURL(
        new Blob(state.recordedData, { type: "video/webm" })
    );
    // Assign the Blob URL to the download link
    const downloadLink = domElements.downLoadBox.children[0];

    downloadLink.href = video_local;
    downloadLink.download = "recorded_video.webm"; // Set the download filename
}
