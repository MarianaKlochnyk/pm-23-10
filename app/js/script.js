document.addEventListener("DOMContentLoaded", function() {
  // Function to handle toggle functionality
  function setupToggle(buttonId, contentClass) {
    const toggleButton = document.getElementById(buttonId);
    const content = document.querySelector(`.${contentClass}`);

    // Initially hide the content
    content.style.maxHeight = "0";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.5s ease-in-out";

    toggleButton.addEventListener("click", function() {
      if (content.style.maxHeight === "0px") {
        content.style.maxHeight = content.scrollHeight + "px"; // Set to its scroll height
      } else {
        content.style.maxHeight = "0px"; // Hide it
      }
    });
  }

  // Setup toggles for education and experience sections
  setupToggle("toggleButton1", "education_content");
  setupToggle("toggleButton2", "exp_con", "mal3", "mal4");
  setupToggle("toggleButton3", "expertise_content");
  setupToggle("toggleButton4", "about_me_content");
});
