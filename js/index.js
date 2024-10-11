//fetch and display category button
const loadCategoryButton = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategoryButton(data.categories);
};

//display all category button

const displayCategoryButton = (categoryBtn) => {
  const btnContainer = document.getElementById("btnContainer");
  categoryBtn.forEach((categoryItem) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <button id="btn-${categoryItem.category}" onclick="displayCategoryWise('${categoryItem.category}')" class="btn lg:px-10 bg-white border-gray-300 category-btn"><img class=" w-5 lg:w-9" src="${categoryItem.category_icon}"/>${categoryItem.category} </button>
  `;
    btnContainer.appendChild(div);
  });
};

//categoryWise petCard display -------------------------------------------------------------------------
const displayCategoryWise = (categoryName) => {
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  )
    .then((res) => res.json())
    .then((data) => {
      //remove active class
      removeActiveClass();
      //on clic active class
      const activeButton = document.getElementById(`btn-${categoryName}`);
      activeButton.classList.add("active");
      displayPetCard(data.data);
    })
    .card((err) => console.log(err));
};

//remove active class
const removeActiveClass = () => {
  const btns = document.getElementsByClassName("category-btn");
  for (let btn of btns) {
    btn.classList.remove("active");
    btn.classList.remove("bg-white");
    btn.classList.remove("border-gray-300");
  }
};

//   const res = await fetch(
//     `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
//   );
//   const data = await res.json();
//   const btn = document.getElementById(`btn-${categoryName}`);
//   btn.classList.add("active");
//   displayPetCard(data.data);
// };

//All pet data -------------------------------------------------------------------------------------------------------------
const loadAllPetsData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  document.getElementById("loadingSpinner").classList.remove("hidden");
  document.getElementById("imageContainer").classList.add("hidden");
  const data = await res.json();
  setTimeout(() => {
    displayPetCard(data.pets);
    document.getElementById("loadingSpinner").classList.add("hidden");
    document.getElementById("imageContainer").classList.remove("hidden");
  }, 2000);
  document.getElementById("sortBtn").addEventListener("click", function () {
    const sortedPets = data.pets.sort(
      (a, b) => (b.price || 0) - (a.price || 0)
    );
    displayPetCard(sortedPets);
  });
};

//display image if like button click
const loadImage = (image) => {
  const imageContainer = document.getElementById("imageContainer");
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="border rounded-lg p-1 gap-2">
  <img class="rounded-lg" src="${image}" />
  </div>
  `;
  imageContainer.appendChild(div);
};

//pet card display funtion
const displayPetCard = (petCard) => {
  // console.log(petCard);
  const petCardContainer = document.getElementById("cardContainer");
  petCardContainer.innerHTML = "";
  if (petCard.length === 0) {
    petCardContainer.innerHTML = `
    <div class="flex flex-col justify-center gap-4 border rounded-lg text-center items-center w-full p-10 bg-gray-100">
    <img class="w-32" src="images/error.webp"/>
    <h1 class="text-3xl font-bold">No Information Available </h1>
    <p class="text-gray-400 text-xs">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a </p>
    </div>
    `;
    petCardContainer.classList.remove("grid");
    return;
  } else {
    petCardContainer.classList.add("grid");
  }
  petCard.forEach((card) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 border border-gray-300 rounded-lg">
  <figure class="px-3 pt-3">
    <img
      src="${card.image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body p-5">
     <p class="flex gap-1 text-gray-500"><img class="w-7" src="https://img.icons8.com/?size=48&id=afhqPNgpBQkL&format=png" alt="">Breed   : ${card.breed}</p>
     <p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=48&id=4p2G9EBQbqA4&format=png" alt=""> Birth  : ${card.date_of_birth}</p>
     <p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=48&id=U3KBnMZtu3fk&format=png" alt=""> Gender :${card.gender}</p>
     <p class="flex gap-1 text-gray-500 border-b-2 pb-2"><img class="w-6" src="https://img.icons8.com/?size=52&id=58437&format=png" alt=""> Price  :${card.price}</p>
    <div class="flex justify-center items-center gap-9 lg:gap-5">
      <button onclick="loadImage('${card.image}')" class="btn btn-sm bg-white"><img class="w-5" src="https://img.icons8.com/?size=48&id=u8MTpAq972MG&format=png" /></button>
      <button class="btn btn-sm bg-white color-btn btnHover">Adopt</button>
      <button class="btn btn-sm bg-white color-btn btnHover">Details</button>
    </div>
  </div>
</div>
    `;
    petCardContainer.appendChild(div);
  });
};

//view more button funtion to ----------------------------------------------------------------------------------------------
function moveToFooter() {
  const adoptBest = document.getElementById("adoptBestFriend").offsetTop;
  window.scrollTo({
    top: adoptBest,
    behavior: "smooth",
  });
}

loadCategoryButton();
loadAllPetsData();
