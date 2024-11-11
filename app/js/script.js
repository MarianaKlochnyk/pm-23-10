$(document).ready(function(){
  $('.button').click(function(event){
    $(this).toggleClass('active').closest('.section').find('.education-content').slideToggle(300);
  });
  
  $('.button').click(function(event){
    $(this).toggleClass('active').closest('.section-2').find('.experience_content').slideToggle(300);
  });

  $('.button').click(function(event){
    $(this).toggleClass('active').closest('.section-2').find('.expertise-content').slideToggle(300);
  });

  $('.button-1').click(function(event){
    $(this).toggleClass('active').closest('.section-1').find('.about-me-content').slideToggle(300);
  });

  $('.button-1').click(function(event){
    $(this).toggleClass('active').closest('.section-1').find('.contact-info-content').slideToggle(300);
  });

  $('.button-1').click(function(event){
    $(this).toggleClass('active').closest('.section-1').find('.hobbies-content').slideToggle(300);
  });
});
$(document).ready(function() {
  $.getJSON("data.json", function(data) {
    // Profile section
    $(".michel").text(data.profile.name.split(" ")[0]);
    $(".rigaurio").text(data.profile.name.split(" ")[1]);
    $(".ui").text(data.profile.title);
    $(".photo").attr("src", data.profile.image);

    // Education section
    data.education.forEach((edu, index) => {
      $(`.education-content .col-6:eq(${index}) .sub-title`).text(edu.major);
      $(`.education-content .col-6:eq(${index}) .sub-sub-title`).html(`${edu.university}<br>${edu.years}`);
    });

    // Experience section
    data.experience.forEach((exp, index) => {
      const selector = index === 0 ? "" : "-1";
      $(`.experience_content .sub-title${selector}`).text(exp.position);
      $(`.experience_content .sub-1${selector}`).text(exp.date);
      $(`.experience_content .sub-2:eq(${index})`).text(exp.company);
      $(`.experience_content .experience:eq(${index}) .sub-sub-title`).html(exp.description);
    });

    // Expertise section
    data.expertise.forEach((skill, index) => {
      $(`.expertise-content .col-3:eq(${index}) .donut-hole .text`).html(skill.replace(" ", "<br>"));
    });

    // About section
    $(".about-me-content .sub-sub-title-1").html(data.about.replace(/\n/g, "<br>"));

    // Contact Info
    $(".contact-info-content .contact").each((index, element) => {
      const key = $(element).text().toLowerCase();
      $(element).next(".data").find("a").text(data.contact_info[key]);
    });

    // Hobbies
    $(".hobbies-content .d-flex").empty();
    data.hobbies.forEach(hobby => {
      $(".hobbies-content .d-flex").append(`
        <div class="${hobby.toLowerCase()}">
          <img src="img/${hobby.toLowerCase()}.png" class="t">
          <p class="phrase-1">${hobby}</p>
        </div>
      `);
    });
  });
});


/*document.addEventListener("DOMContentLoaded", function() {
  // Функція для налаштування перемикача
  function setupToggle(buttonId, contentClass, ...additionalElements) {
    const toggleButton = document.getElementById(buttonId);
    const content = document.querySelector(`.${contentClass}`);

    // Ініціально приховуємо контент
    content.style.maxHeight = "0";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.5s ease-in-out";

    // Додаємо стиль для приховування додаткових елементів
    additionalElements.forEach(selector => {
      const element = document.querySelector(`.${selector}`);
      if (element) {
        element.style.display = "none";
      }
    });

    // Додаємо подію натискання на кнопку
    toggleButton.addEventListener("click", function() {
      if (content.style.maxHeight === "0px") {
        content.style.maxHeight = content.scrollHeight + "px"; // Показуємо контент
          
        // Показуємо додаткові елементи
        additionalElements.forEach(selector => {
          const element = document.querySelector(`.${selector}`);
          if (element) {
            element.style.display = "block";
          }
        });
      } else {
        content.style.maxHeight = "0px"; // Приховуємо контент
        
        // Приховуємо додаткові елементи
        additionalElements.forEach(selector => {
          const element = document.querySelector(`.${selector}`);
          if (element) {
            element.style.display = "none";
          }
        });
      }
    });
  }

  // Налаштовуємо перемикачі для секцій з додатковими елементами
  setupToggle("toggleButton1", "education_content");
  setupToggle("toggleButton2", "exp_con", "mal3", "mal4");
  setupToggle("toggleButton3", "expertise_content");
  setupToggle("toggleButton4", "about_me_content");
  setupToggle("toggleButton5", "contact_info_content");
  setupToggle("toggleButton6", "hobby_content", "im");
});*/
