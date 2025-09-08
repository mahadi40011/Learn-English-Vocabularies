const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
const displayLesson = (lessons) => {
  //get the container & make sure that's empty
  const lessonContainer = document.getElementById("lesson-container");
  lessonContainer.innerHTML = "";

  //get into every lesson
  for(let lesson of lessons){
    //create Element & set inner HTML
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button type="button" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `
    lessonContainer.append(btnDiv)
  }
  
};
loadLesson();
