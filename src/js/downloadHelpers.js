export async function downloadFile(url) {
    return new Promise((res, rej) => {
        chrome.downloads.download({ url }, (downloadId) => {
            if (!downloadId) {
                rej(new Error("Download failed to start."));
                return;
            }

            // Listen for changes to the download state
            const onChangedListener = (delta) => {
                if (delta.id === downloadId) {
                    if (delta.state && delta.state.current === "complete") {
                        res(downloadId);

                        chrome.downloads.onChanged.removeListener(
                            onChangedListener
                        );
                    } else if (delta.error) {
                        rej(
                            new Error(`Download failed: ${delta.error.current}`)
                        );

                        chrome.downloads.onChanged.removeListener(
                            onChangedListener
                        );
                    }
                } else {
                    console.warn(
                        `Received delta for an unexpected download ID: ${delta.id}`
                    );
                }
            };

            chrome.downloads.onChanged.addListener(onChangedListener);
        });
    });
}

// function downloadFile(url) {
//     return new Promise((res, rej) => {
//         chrome.downloads.download({ url }, (downloadId) => {
//             if (downloadId) {
//                 res(downloadId);
//             } else {
//                 rej(new Error("Download failed to start."));
//             }
//         });
//     });
// }
