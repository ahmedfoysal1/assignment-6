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
      document.getElementById("loadingSpinner").classList.remove("hidden");
      document.getElementById("cardContainerSection").classList.add("hidden");
      document.getElementById("imageContainer").classList.add("hidden");
      document.getElementById('cardContainer').classList.add('hidden');
      setTimeout(() => {
        document.getElementById("imageContainer").classList.remove("hidden");
        document.getElementById("loadingSpinner").classList.add("hidden");
        document.getElementById("cardContainerSection").classList.add("hidden");
        document.getElementById('cardContainer').classList.remove('hidden');
        displayPetCard(data.data);
      }, 2000);
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

//display side image if like button click
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
  <h1 class="font-black text-2xl py-2">${card.pet_name}</h1>
     <p class="flex gap-1 text-gray-500"><img class="w-7" src="https://img.icons8.com/?size=48&id=afhqPNgpBQkL&format=png" alt="icon">Breed   : ${card.breed === null || card.breed === undefined || card.breed === '' ? "Not Specified": `${card.breed}`}</p>
     <p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=48&id=4p2G9EBQbqA4&format=png" alt=""> Birth  : ${card.date_of_birth === null || card.date_of_birth === undefined || card.date_of_birth === '' ? "Unknown": `${card.date_of_birth}`}</p>
     <p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=48&id=U3KBnMZtu3fk&format=png" alt=""> Gender :${card.gender === null || card.gender === undefined || card.gender === '' ? "Unspecified": `${card.gender}`}</p>
     <p class="flex gap-1 text-gray-500 border-b-2 pb-2"><img class="w-6" src="https://img.icons8.com/?size=52&id=58437&format=png" alt=""> Price  :${card.price === null || card.price === undefined || card.price === '' ? "TBA": `${card.price}`}</p>
    <div class="flex justify-center items-center gap-9 lg:gap-5">
      <button onclick="loadImage('${card.image}')" class="btn btn-sm bg-white"><img class="w-5" src="https://img.icons8.com/?size=48&id=u8MTpAq972MG&format=png" /></button>
      <button onclick="displayAdoptModal()" class="btn btn-sm bg-white color-btn btnHover">Adopt</button>
      <button onclick="loadDetails(${card.petId})" class="btn btn-sm bg-white color-btn btnHover">Details</button>
    </div>
  </div>
</div>
    `;
    petCardContainer.appendChild(div);
  });
};

//-----------------------------------------------------------pet details modal -----------------------------------------------

//pet details api  fetch -------------------------------------------------------
const loadDetails = async(id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await res.json();
  displayPetDetails(data.petData);
}

//pet details modal design and display  --------------------------------------------------------------------------------------------
const displayPetDetails = (details) =>{
  const modalContainer = document.getElementById('modal-content');
  modalContainer.innerHTML=`
  <img class="w-full rounded-lg" src="${details.image}" />
<h1 class="text-2xl py-2 font-bold">${details.pet_name}</h1>

<div class="flex gap-3 border-b py-3">
<div class="space-y-2">
<p class="flex gap-1 text-gray-500"><img class="w-5" src="https://img.icons8.com/?size=48&id=afhqPNgpBQkL&format=png" alt="">Breed : ${details.breed === null || details.breed === undefined || details.breed === '' ? "Didn't Mentioned": `${details.breed}`}</p>
 <p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=48&id=U3KBnMZtu3fk&format=png" alt=""> Gender :${details.gender}</p>
  <p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=48&id=U3KBnMZtu3fk&format=png" alt=""> vaccinated status :${details.vaccinated_status}</p>
</div>
<div class="space-y-2">
<p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=48&id=4p2G9EBQbqA4&format=png" alt=""> Birth  : ${details.date_of_birth === null || details.date_of_birth === undefined || details.date_of_birth === '' ? "Didn't Mentioned": `${details.date_of_birth}`}</p>
     <p class="flex gap-1 text-gray-500"><img class="w-6" src="https://img.icons8.com/?size=52&id=58437&format=png" alt=""> Price  :${details.price}</p>
</div>
</div>

<div class="space-y-2 pt-3">
<h1 class="font-bold">Details Information</h1>
<p class="text-gray-400">${details.pet_details}</p>
</div>
  `;
  document.getElementById('showModal').click();
}


//pet adopt modal display --------------------------------------------------------
const displayAdoptModal = (adoptModal) => {
  console.log(adoptModal);
  const closeBtn = document.getElementById('adoptModalClose');
  const adopted = document.getElementById('adoptedBtn');
  const countdownElement = document.getElementById("countdown");
  // const modal = document.getElementById('adoptModal');
  let countdown = 3;
  countdownElement.textContent = countdown;
  const countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      closeBtn.classList.add('hidden');
      adopted.classList.remove('hidden');
      countdownElement.classList.add('hidden');
      // modal.style.display= 'none';
      // detailsModal.closeModal()
    }
  }, 1000);
  countdownElement.classList.remove('hidden');
  closeBtn.classList.remove('hidden');
  adopted.classList.add('hidden');
  // adopted.innerHTML= 'close';

  document.getElementById("adoptModalButton").click();
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
