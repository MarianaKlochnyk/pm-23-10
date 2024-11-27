$(document).ready(function(){
  //getData();
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

async function getData() {
  try {
    const response = await fetch('http://127.0.0.1:8080/data/data.json'); // Запит на сервер
    console.log('Response:', response); // Для налагодження
    if (!response.ok) throw new Error('Помилка при завантаженні даних');
    const data = await response.json(); // Перетворення JSON у JavaScript об'єкт
    console.log('Data:', data); // Для налагодження
    renderData(data); // Виводимо дані
  } catch (error) {
    console.error('Помилка під час отримання даних:', error);
  }
}

function renderData(data) {
  const container = document.getElementById('data');
  container.innerHTML = `
    <h1>${data.first} ${data.last}</h1>
    <h2>${data.profession}</h2>
    <img src="${data.photo}" alt="${data.first}'s photo" class="img-fluid mb-3">
    <h3>About Me</h3>
    <p>${data.aboutMe}</p>
    <h3>Contact Info</h3>
    <p>Phone: <a href="tel:${data.contactInfo.phone}">${data.contactInfo.phone}</a></p>
    <p>Email: <a href="mailto:${data.contactInfo.email}">${data.contactInfo.email}</a></p>
    <p>Address: ${data.contactInfo.address}</p>
    <h3>Education</h3>
    ${data.education.map((edu) => `<p><strong>${edu.major}</strong><br>${edu.university} (${edu.years})</p>`).join("")}
    <h3>Experience</h3>
    ${data.experience.map((exp) => `<p><strong>${exp.position}</strong> at ${exp.company}<br>${exp.duration}<br>${exp.description}</p>`).join("")}
    <h3>Expertise</h3>
    <ul>${data.expertise.map((skill) => `<li>${skill}</li>`).join("")}</ul>
    <h3>Hobbies</h3>
    <div class="d-flex flex-wrap">
      ${data.hobbies.map((hobby) => `<div class="me-3 text-center"><img src="${hobby.icon}" alt="${hobby.name}" style="width: 50px;"><br>${hobby.name}</div>`).join("")}
    </div>
  `;
}

document.getElementById('loadDataBtn').addEventListener('click', getData);
document.getElementById('loseDataBtn').addEventListener('click', () => {
  const container = document.getElementById('data');
  container.innerHTML = ''; // Очищення контейнера
});



/*async function getData() {
  try {
  const response = await fetch('http://127.0.0.1:8081/data/data.json'); // Запит на сервер
  if (!response.ok) throw new Error('Помилка при завантаженні даних');
  const data = await response.json(); // Перетворення JSON у JavaScript об'єкт
  renderData(data); // Функція для відображення даних на сторінці
  } catch (error) {
  console.error('Помилка під час отримання даних:', error);
  }
 }/*

/*async function getData() {
  try {
  const response = await fetch('http://127.0.0.1:8080/dist/data.json'); // Запит на сервер
  if (!response.ok) throw new Error('Помилка при завантаженні даних');
  const data = await response.json(); // Перетворення JSON у JavaScript об'єкт
  renderData(data); // Функція для відображення даних на сторінці
  } catch (error) {
  console.error('Помилка під час отримання даних:', error);
  }
 }*/
 

// Функція для асинхронного запиту на сервер для отримання даних
/*async function getData() {
  try {
    const response = await fetch('http://127.0.0.1:8080/data.json'); 
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
