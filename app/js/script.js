$(document).ready(function(){
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