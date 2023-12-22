document.addEventListener("DOMContentLoaded", function () {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  // Open the first section by default
  const firstSection = accordionHeaders[0].parentElement;
  const firstContent = firstSection.querySelector(".accordion-content");
  const firstIcon = firstSection.querySelector(".accordion-icon");
  firstContent.style.display = "block";
  firstIcon.src = "./assets/images/icon-minus.svg";
  firstSection.classList.add("active");

  accordionHeaders.forEach((header, index) => {
    header.addEventListener("click", function () {
      const section = this.parentElement;
      const content = section.querySelector(".accordion-content");
      const icon = section.querySelector(".accordion-icon");

      // Close all other sections
      closeAllSections();

      // Toggle the visibility of the content
      if (content.style.display === "block") {
        // If the content is currently visible, hide it
        content.style.display = "none";
        icon.src = "./assets/images/icon-plus.svg";
      } else {
        // If the content is currently hidden, show it
        content.style.display = "block";
        icon.src = "./assets/images/icon-minus.svg";
      }

      // Add the active class to the clicked section
      section.classList.add("active");
    });
  });

  function closeAllSections() {
    const allSections = document.querySelectorAll(".accordion-section");

    allSections.forEach((section) => {
      const content = section.querySelector(".accordion-content");
      const icon = section.querySelector(".accordion-icon");

      // Hide the content of all sections
      content.style.display = "none";

      // Toggle the icon based on the accordion state
      icon.src = "./assets/images/icon-plus.svg";

      // Remove the active class from all sections
      section.classList.remove("active");
    });
  }
});
