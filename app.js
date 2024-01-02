const track = document.getElementById("image-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Had to add extra lines for touch events -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

/* The hacked effect */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;
document.querySelector("h1").onmouseover = (event) => {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
};

/* ----- the glide functions -----*/
document.addEventListener("DOMContentLoaded", () => {
  // Select all anchor links within the document
  const links = document.querySelectorAll("a");

  // Add a click event listener to each anchor link
  links.forEach((link) => {
    // Exclude the smooth scroll behavior for the link to the "Work" page
    if (!link.href.includes("index.html")) {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        const href = link.getAttribute("href");
        const targetElement = document.querySelector(href);
        const offsetTop = targetElement.offsetTop;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      });
    }
  });

  // Smooth scroll to top when the page is loaded or refreshed
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// New code for opening a new page on image click without disrupting swiping
const images = Array.from(track.getElementsByClassName("image"));
images.forEach((image) => {
  image.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default click behavior

    // Get the data-page attribute value of the clicked image
    const page = image.dataset.page;

    // Perform the desired action based on the page
    if (page === "tabletsling") {
      window.location.href = "tabletsling.html";
    } else if (page === "page2") {
      window.location.href = "page2.html";
    }
    // Add more conditions as needed for additional pages
  });
});

// scroll indicator
window.addEventListener("DOMContentLoaded", () => {
  const scrollIndicator = document.getElementById("scroll-indicator");

  const updateScrollIndicator = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;
    const scrolled = window.scrollY;
    const percent = (scrolled / (fullHeight - windowHeight)) * 100;

    scrollIndicator.style.height = percent + "vh";
  };

  // Update scroll indicator on initial load
  updateScrollIndicator();

  // Update scroll indicator on scroll event
  window.addEventListener("scroll", updateScrollIndicator);
});
