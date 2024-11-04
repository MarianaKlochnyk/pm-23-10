document.addEventListener("DOMContentLoaded", function() {
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
});
