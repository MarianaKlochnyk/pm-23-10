$(document).ready(function(){
  getData();
  $('.button').click(function(event){
    $(this).toggleClass('rotated active').closest('.section').find('.education-content').slideToggle(300);
  });
  
  $('.button').click(function(event){
    $(this).toggleClass('rotated active').closest('.section-2').find('.experience_content').slideToggle(300);
  });

  $('.button').click(function(event){
    $(this).toggleClass('rotated active').closest('.section-2').find('.expertise-content').slideToggle(300);
  });

  $('.button-1').click(function(event){
    $(this).toggleClass('rotated active').closest('.section-1').find('.about-me-content').slideToggle(300);
  });

  $('.button-1').click(function(event){
    $(this).toggleClass('rotated active').closest('.section-1').find('.contact-info-content').slideToggle(300);
  });

  $('.button-1').click(function(event){
    $(this).toggleClass('rotated active').closest('.section-1').find('.hobbies-content').slideToggle(300);
  });
});

// Функція для асинхронного запиту на сервер для отримання даних
async function getData() {
  try {
    const response = await fetch('http://127.0.0.1:8080/json/data.min.json'); 
    if (!response.ok) throw new Error('Помилка при завантаженні даних');
    const data = await response.json(); 
    console.log("data", data);
    
    renderData(data);
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}

// Функція для відображення даних на сторінці
function renderData(data) {
  document.querySelector(".michel").textContent = data.first;
  document.querySelector(".rigaurio").textContent = data.last;
  document.querySelector(".ui").textContent = data.profession;
  document.querySelector(".photo").src = data.photo;

  // Відображення секції освіти
  data.education.forEach((edu, index) => {
    document.querySelector(`.education-content .col-6:nth-child(${index + 1}) .sub-title`).textContent = edu.major;
    document.querySelector(`.education-content .col-6:nth-child(${index + 1}) .sub-sub-title`).innerHTML = `${edu.university}<br>${edu.years}`;
  });

  // Відображення секції досвіду роботи
  data.experience.forEach((exp, index) => {
    const selector = index === 0 ? "" : "-1";
    document.querySelector(`.experience_content .sub-title${selector}`).textContent = exp.position;
    document.querySelector(`.experience_content .sub-1${selector}`).textContent = exp.duration;
    document.querySelector(`.experience_content .sub-2:nth-child(${index + 1})`).textContent = exp.company;
    document.querySelector(`.experience_content .experience:nth-child(${index + 1}) .sub-sub-title`).innerHTML = exp.description;
  });

  // Відображення секції навичок
  data.expertise.forEach((skill, index) => {
    document.querySelector(`.expertise-content .col-3:nth-child(${index + 1}) .donut-hole .text`).innerHTML = skill.replace(" ", "<br>");
  });

  // Відображення секції "Про мене"
  document.querySelector(".about-me-content .sub-sub-title-1").innerHTML = data.aboutMe.replace(/\n/g, "<br>");

  // Відображення контактної інформації
  document.querySelectorAll(".contact-info-content .contact").forEach((element, index) => {
    const key = element.textContent.toLowerCase();
    element.nextElementSibling.querySelector("a").textContent = data.contactInfo[key];
  });

  // Відображення хобі
  const hobbiesContainer = document.querySelector(".hobbies-content .d-flex");
  hobbiesContainer.innerHTML = "";
  data.hobbies.forEach(hobby => {
    hobbiesContainer.innerHTML += `
      <div class="${hobby.name.toLowerCase()}">
        <img src="${hobby.icon}" class="t">
        <p class="phrase-1">${hobby.name}</p>
      </div>
    `;
  });
}

// Виклик функції для отримання даних
// getData();


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
