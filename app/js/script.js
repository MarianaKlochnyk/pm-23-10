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

document.addEventListener("DOMContentLoaded", function () {
  async function loadDataWithFetch() {
    try {
      const response = await fetch("http://localhost:8080/data/data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Основная информация
      document.querySelector(".michel").textContent = data.first;
      document.querySelector(".rigaurio").textContent = data.last;
      document.querySelector(".ui").textContent = data.profession;

      // Фото
      document.querySelector(".photo").src = data.photo;

      // Блок "About Me"
      document.querySelector(".sub-sub-title-1").textContent = data.aboutMe;

      // Контактная информация
      document.querySelector(".contact-info-content .data:nth-child(2) a").textContent = data.contactInfo.phone;
      document.querySelector(".contact-info-content .data:nth-child(2) a").href = `tel:${data.contactInfo.phone}`;
      document.querySelector(".contact-info-content .data:nth-child(4) a").textContent = data.contactInfo.email;
      document.querySelector(".contact-info-content .data:nth-child(4) a").href = `mailto:${data.contactInfo.email}`;
      document.querySelector(".contact-info-content .data:nth-child(6) a").textContent = data.contactInfo.address;

      // Образование
      const educationContainer = document.querySelector(".education-content .row");
      educationContainer.innerHTML = ""; // Очистка перед добавлением новых данных

      data.education.forEach((edu) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-6");

        const majorH2 = document.createElement("h2");
        majorH2.classList.add("sub-title");
        majorH2.textContent = edu.major;

        const universityP = document.createElement("p");
        universityP.classList.add("sub-sub-title");
        universityP.innerHTML = `${edu.university}<br>${edu.years}`;

        colDiv.appendChild(majorH2);
        colDiv.appendChild(universityP);
        educationContainer.appendChild(colDiv);
      });

      // Опыт работы
      const experienceContainer = document.querySelector(".experience_content");
      experienceContainer.innerHTML = ""; // Очистка перед добавлением новых данных

      data.experience.forEach((job) => {
        const experienceDiv = document.createElement("div");
        experienceDiv.classList.add("experience");

        const positionH2 = document.createElement("h2");
        positionH2.classList.add("sub-title");
        positionH2.textContent = job.position;

        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        const yellowFonDiv = document.createElement("div");
        yellowFonDiv.classList.add("yellow-fon");

        const colLeft = document.createElement("div");
        colLeft.classList.add("col-6");
        const durationH3 = document.createElement("h3");
        durationH3.classList.add("sub-1-1");
        durationH3.textContent = job.duration;
        colLeft.appendChild(durationH3);

        const colRight = document.createElement("div");
        colRight.classList.add("col-6");
        const companyH3 = document.createElement("h3");
        companyH3.classList.add("sub-2");
        companyH3.textContent = job.company;
        colRight.appendChild(companyH3);

        rowDiv.appendChild(yellowFonDiv);
        rowDiv.appendChild(colLeft);
        rowDiv.appendChild(colRight);

        const descriptionP = document.createElement("p");
        descriptionP.classList.add("sub-sub-title");
        descriptionP.innerHTML = job.description;

        experienceDiv.appendChild(positionH2);
        experienceDiv.appendChild(rowDiv);
        experienceDiv.appendChild(descriptionP);
        experienceContainer.appendChild(experienceDiv);
      });

      // Навыки (Expertise)
      const expertiseContent = document.querySelector(".expertise-content .row");
      expertiseContent.innerHTML = ""; // Очистка перед добавлением новых данных

      data.expertise.forEach((skill, index) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-3");

        const donutChart = document.createElement("div");
        donutChart.classList.add(`donut-chart-${index + 1}`);

        const donutHole = document.createElement("div");
        donutHole.classList.add("donut-hole");
        const skillTextP = document.createElement("p");
        skillTextP.classList.add("text");
        skillTextP.innerHTML = skill.replace(" ", "<br>");

        donutHole.appendChild(skillTextP);
        donutChart.appendChild(donutHole);
        colDiv.appendChild(donutChart);
        expertiseContent.appendChild(colDiv);
      });

      // Увлечения (Hobbies)
      const hobbiesContainer = document.querySelector(".hobbies-content .d-flex");
      hobbiesContainer.innerHTML = ""; // Очистка перед добавлением новых данных

      data.hobbies.forEach((hobby) => {
        const hobbyDiv = document.createElement("div");
        hobbyDiv.classList.add(hobby.name.toLowerCase());

        const hobbyImg = document.createElement("img");
        hobbyImg.src = hobby.icon;
        hobbyImg.alt = hobby.name;
        hobbyDiv.appendChild(hobbyImg);

        const hobbyTextP = document.createElement("p");
        hobbyTextP.classList.add(`phrase-${hobby.name.toLowerCase()}`);
        hobbyTextP.textContent = hobby.name;
        hobbyDiv.appendChild(hobbyTextP);

        hobbiesContainer.appendChild(hobbyDiv);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  loadDataWithFetch();
});


/*async function loadDataUsingFetch() {
  const referencesContainer = document.getElementById("referencesContainer");

  try {
    console.log("Fetching data from JSON...");
    const response = await fetch("http://127.0.0.1:8080/data/data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully:", data);

    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    referencesContainer.innerHTML =
      "<li><p class='text-danger'>Failed to load references. Please try again later.</p></li>";
  }
}

function displayData(data) {
  // Display Profile
  document.querySelector(".michel").textContent = data.first;
  document.querySelector(".rigaurio").textContent = data.last;
  document.querySelector(".ui").textContent = data.profession;
  document.querySelector(".photo").src = data.photo;

  // Display Education
  const educationContent = document.querySelector(".education-content");
  educationContent.innerHTML = "";
  data.education.forEach((edu) => {
    const eduItem = document.createElement("div");
    eduItem.classList.add("row");
    eduItem.innerHTML = `
      <div class="col-6">
        <h2 class="sub-title">${edu.major}</h2>
        <p class="sub-sub-title">${edu.university}<br>${edu.years}</p>
      </div>
    `;
    educationContent.appendChild(eduItem);
  });

  // Display Experience
  const experienceContent = document.querySelector(".experience_content");
  experienceContent.innerHTML = "";
  data.experience.forEach((exp) => {
    const expItem = document.createElement("div");
    expItem.classList.add("experience");
    expItem.innerHTML = `
      <h2 class="sub-title">${exp.position}</h2>
      <div class="row">
        <div class="col-6"><h3 class="sub-1-1">${exp.duration}</h3></div>
        <div class="col-6"><h3 class="sub-2">${exp.company}</h3></div>
      </div>
      <p class="sub-sub-title">${exp.description}</p>
    `;
    experienceContent.appendChild(expItem);
  });

  // Display Expertise
  const expertiseContent = document.querySelector(".expertise-content");
  expertiseContent.innerHTML = "";
  data.expertise.forEach((item) => {
    const expertiseItem = document.createElement("div");
    expertiseItem.classList.add("col-3");
    expertiseItem.innerHTML = `
      <div class="donut-chart">
        <div class="donut-hole">
          <p class="text">${item}</p>
        </div>
      </div>
    `;
    expertiseContent.appendChild(expertiseItem);
  });

  // Display About Me
  document.querySelector(".about-me-content .sub-sub-title-1").textContent = data.aboutMe;

  // Display Contact Info
  const contactContent = document.querySelector(".contact-info-content");
  contactContent.innerHTML = `
    <p class="contact">PHONE</p>
    <p class="data"><a href="tel:${data.contactInfo.phone}" style="color: #2b3036; text-decoration: none;">${data.contactInfo.phone}</a></p>
    <p class="contact">EMAIL</p>
    <p class="data"><a href="mailto:${data.contactInfo.email}" style="color: #2b3036; text-decoration: none;">${data.contactInfo.email}</a></p>
    <p class="contact">AREA</p>
    <p class="data"><a href="street:${data.contactInfo.address}" style="color: #2b3036; text-decoration: none;">${data.contactInfo.address}</a></p>
  `;

  // Display Hobbies
  const hobbiesContent = document.querySelector(".hobbies-content .d-flex");
  hobbiesContent.innerHTML = "";
  data.hobbies.forEach((hobby) => {
    const hobbyItem = document.createElement("div");
    hobbyItem.classList.add(hobby.name.toLowerCase());
    hobbyItem.innerHTML = `
      <img src="${hobby.icon}" class="t">
      <p class="phrase-1">${hobby.name}</p>
    `;
    hobbiesContent.appendChild(hobbyItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const loadButton = document.getElementById("loadDataBtn");
  const hideButton = document.getElementById("loseDataBtn");

  loadButton.addEventListener("click", loadDataUsingFetch);
  hideButton.addEventListener("click", () => {
    document.querySelector(".container").classList.add("d-none");
  });
});*/



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
