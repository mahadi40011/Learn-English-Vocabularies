//loading time manage function
const manageDataLoading = (status) => {
  if (status === true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("words-container").classList.add("hidden");
  } else {
    document.getElementById("words-container").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
  }
};

//level button gulo load hocche
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

//lesson button er active class remove hobe
const removeActiveClass = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((lessonBtn) => lessonBtn.classList.remove("active"));
};

// every level words load hobe
const loadLevelWords = (id) => {
  manageDataLoading(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass(); //all active class remove
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("active"); // add active class
      displayLevelWords(data.data);
    });
};

//every word detail load hobe
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

//modal box er bottom e word er synonym add hobe
const createModalSynonymSection = (arr) => {
  const synonymDivHtml = arr.map(
    (el) =>
      `<div class="w-fit bg-sky-100 lg:px-3 px-2 lg:py-2 py-1 lg:rounded-md rounded-sm lg:text-xl text-xs font-medium text-gray-500" >${el}</div>`
  );
  return synonymDivHtml.join(" ");
};

//click the info button then display word details
const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div>
        <h2 class="font-semibold text-xl lg:text-4xl">${
          word.word
        } (<i class="fa-solid fa-microphone-lines"></i>:${
    word.pronunciation
  })</h2>
    </div>
    <div>
        <h2 class="font-semibold text-sm lg:text-2xl">Meaning</h2>
        <p class="font-medium text-sm lg:text-2xl">${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        }</p>
    </div>
    <div>
        <h2 class="font-semibold text-sm lg:text-2xl">Example</h2>
        <p class="text-sm lg:text-2xl">${word.sentence}</p>
    </div>
    <div>
        <h2 class="font-semibold text-sm lg:text-2xl">Synonyms</h2>
        <div id="synonyms-array" class="flex flex-wrap gap-2 lg:gap-4">${createModalSynonymSection(
          word.synonyms
        )}</div>
    </div>
  `;
  document.getElementById("word_modal").showModal();
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
    manageDataLoading(false);
    return;
  }

  //get into every lesson
  words.forEach((word) => {
    //create Element & set inner HTML
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-6 lg:py-10 px-3 lg:px-5 flex flex-col gap-2 lg:gap-6">
        <h2 class="font-bold text-xl lg:text-3xl">${
          word.word ? word.word : "word পাওয়া যায়নি"
        }</h2>
        <p class="font-medium text-sm lg:text-xl">Meaning / Pronunciation</p>
        <div class="font-bangla font-semibold text-xl lg:text-3xl">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }"</div>
        <div class="flex justify-between items-center px-3 lg:px-5 mt-6 lg:mt-10">
        <button onclick="loadWordDetail(${
          word.id
        })" type="button" class="btn lg:w-14 w-9 lg:h-14 h-9 bg-sky-100 text-base lg:text-2xl hover:bg-blue-300 rounded-lg"><i class="fa-solid fa-circle-info"></i></button>
        <button type="button" class="btn lg:w-14 w-9 lg:h-14 h-9 bg-sky-100 text-base lg:text-2xl hover:bg-blue-300 rounded-lg"> <i class="fa-solid fa-volume-high"></i> </button>
        </div>
    </div>
    `;
    //append this child into container
    wordsContainer.append(card);
  });
  manageDataLoading(false);
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" type="button" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    //append this child into container
    lessonContainer.append(btnDiv);
  }
};

// lessons load function calling
loadLesson();

document.getElementById("search-btn").addEventListener("click", () => {
  removeActiveClass();
  const searchValue = document
    .getElementById("input-value")
    .value.trim()
    .toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWord = data.data;
      const filterWords = allWord.filter((word) =>
        word.word.toLowerCase().includes(searchValue)
      );
      if (filterWords.length !== 0) {
        displayLevelWords(filterWords);
      } else {
        const wordsContainer = document.getElementById("words-container");
        wordsContainer.innerHTML = `
        <div class="col-span-full text-center lg:py-10 py-6 lg:space-y-3 space-y-2">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="font-bangla font-medium lg:text-4xl text-2xl">No Word Found</p>
        </div>
        `;
      }
    });
});
