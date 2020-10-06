const video = document.querySelector(".video");
const btn = document.querySelector(".btn");

/**
 * Screen Capture API (https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture)
 */
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    video.srcObject = mediaStream;

    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  } catch (err) {
    console.log("Error : " + err);
  }
}

/**
 * Picture-in-Picture (https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/)
 */
btn.addEventListener("click", async () => {
  // Check if the client browser support the functionality
  if ("pictureInPictureEnabled" in document) {
    // Check if currently in the PIP mode
    if (document.pictureInPictureElement) {
      try {
        // 1. Disable the button
        btn.disabled = true;
        // 2. Exit Picture in Picture
        await document.exitPictureInPicture();
        // 3. Reset the button
        btn.innerText = "Enter";
        btn.disabled = false;
      } catch (err) {
        console.log("Error: " + err);
      }
    } else {
      try {
        // 1. Disable the button
        btn.disabled = true;
        // 2. Start Picture in Picture
        await video.requestPictureInPicture();
        // 3. Reset the button
        btn.innerText = "Exit";
        btn.disabled = false;
      } catch (err) {
        console.log("Error: " + err);
      }
    }
  } else {
    alert("Sorry. Your browser does not support the functionality.");
  }
});

selectMediaStream();
