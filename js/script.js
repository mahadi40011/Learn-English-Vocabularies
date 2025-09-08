//level button gulo load hocche
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

// every level words load hocche
const loadLevelWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));
};

//je level button a click kora hobe tar words display korbe
const displayLevelWords = (words) => {
  //get the container & make sure that's empty
  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = "";

  //if kono lesson e word na thake tahole eta kaj korbe
  if (words.length === 0) {
    wordsContainer.innerHTML = `
    <div class="col-span-full text-center lg:py-10 py-6 lg:space-y-3 space-y-2">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="font-bangla lg:text-xl text-sm text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="font-bangla font-medium lg:text-4xl text-2xl">নেক্সট Lesson এ যান</p>
    </div>
    `;
    return;
  }

  //get into every lesson
  words.forEach((word) => {
    //create Element & set inner HTML
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-6 lg:py-10 px-3 lg:px-5 flex flex-col gap-2 lg:gap-6"
    >
        <h2 class="font-bold text-xl lg:text-3xl">${word.word ? word.word : "word পাওয়া যায়নি"}</h2>
        <p class="font-medium text-sm lg:text-xl">meaning / pronunciation</p>
        <div class="font-bangla font-semibold text-xl lg:text-3xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
        <div class="flex justify-between items-center px-3 lg:px-5 mt-6 lg:mt-10">
        <button
            type="button"
            class="btn lg:w-14 w-9 lg:h-14 h-9 bg-sky-100 text-base lg:text-2xl hover:bg-blue-300 rounded-lg"
        >
            <i class="fa-solid fa-circle-info"></i>
        </button>
        <button
            type="button"
            class="btn lg:w-14 w-9 lg:h-14 h-9 bg-sky-100 text-base lg:text-2xl hover:bg-blue-300 rounded-lg"
        >
            <i class="fa-solid fa-volume-high"></i>
        </button>
        </div>
    </div>
    `;
    //append this child into container
    wordsContainer.append(card);
  });
};

// je lesson gulo load hocche shegulo display korbe
const displayLesson = (lessons) => {
  //get the container & make sure that's empty
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  //get into every lesson
  for (let lesson of lessons) {
    //create Element & set inner HTML
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button onclick="loadLevelWords(${lesson.level_no})" type="button" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    //append this child into container
    lessonContainer.append(btnDiv);
  }
};

// lessons load function calling
loadLesson();
