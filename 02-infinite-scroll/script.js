const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");
const apiKey = "9NALZ3jDC-vsjndc4ZMg8jSIynL6ph0dv6U4rPhQ6rI";
let initialCount = 5;
let apiUrl = `https://api.unsplash.com//photos/random/?client_id=${apiKey}&count=${initialCount}`;
let photoArray = [];
let loadedImages = 0;
let totalImages = 0;
let isReady = false;
let isInitialLoad = true;

function updateUrlWithNewCount(imageCount) {
  apiUrl = `https://api.unsplash.com//photos/random/?client_id=${apiKey}&count=${imageCount}`;
}

function imageLoaded() {
  loadedImages++;

  if (loadedImages === totalImages) {
    isReady = true;
    loader.hidden = true;
    loadedImages = 0;
  }
}

function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayImages() {
  photoArray.forEach((photo) => {
    // 1. Create new elements
    const item = document.createElement("a");
    const image = document.createElement("img");

    // 2. add attributes to the elements
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // 3. add Event Listener to the img element
    image.addEventListener("load", imageLoaded);

    // 4. Add the elements to the DOM
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

async function getImages() {
  try {
    // 1. Fetch random images from Unsplash
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    totalImages = photoArray.length;
    // console.log(photoArray);

    // 2. Create a list of images
    displayImages();

    // 3. Check if it's initial load and update the count value
    if (isInitialLoad) {
      updateUrlWithNewCount(15);
      isInitialLoad = false;
    }
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
      document.body.offsetHeight - window.innerHeight &&
    isReady
  ) {
    isReady = false;
    getImages();
  }
});

getImages();
