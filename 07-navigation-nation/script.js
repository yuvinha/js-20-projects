const menuBars = document.getElementById("menu-bars");
const overlay = document.getElementById("overlay");
const navItems = [];

// Assign Items to the navItems array
for (let i = 1; i <= 5; i++) {
  navItems.push(document.getElementById("nav-" + i));
}

// Nav Items Animation
function navItemsAnimation(dirRemove, dirAdd) {
  navItems.forEach((navItem, index) => {
    navItem.classList.remove(`slide-${dirRemove}-${index + 1}`);
    navItem.classList.add(`slide-${dirAdd}-${index + 1}`);
  });
}

// Toggle navbar
function toggleNav() {
  // Toggle: Menu Bars Open/Close
  menuBars.classList.toggle("change");
  // Toggle: Menu Active
  overlay.classList.toggle("overlay-active");

  if (overlay.classList.contains("overlay-active")) {
    // Animate In - Overlay
    overlay.classList.add("overlay-slide-in");
    overlay.classList.remove("overlay-slide-out");
    // Animate In - NavItems
    navItemsAnimation("out", "in");
  } else {
    // Animate Out - Overlay
    overlay.classList.add("overlay-slide-out");
    overlay.classList.remove("overlay-slide-in");
    // Animate Out - NavItems
    navItemsAnimation("in", "out");
  }
}

menuBars.addEventListener("click", toggleNav);
navItems.forEach((item) => item.addEventListener("click", toggleNav));
