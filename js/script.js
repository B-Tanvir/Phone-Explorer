/* Function to Load Display Search result */

const loadSearchResult = () => {
  const inputField = document.querySelector("#input-search");
  const displaySection = document.querySelector("#display-section");
  const searchText = inputField.value;
  displaySection.textContent = "";
  const detailsSection = document.getElementById("details");
  detailsSection.textContent = "";
  inputField.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  controlDisplayProperty("not-found", "none");
  controlDisplayProperty("spinning", "block");

  /* Load data according to search Result*/
  fetch(url).then((res) =>
    res.json().then((data) => {
      displayResult(data);
    })
  );

  /* Display Rusult */
  function displayResult(data) {
    const phones = data.data;
    console.log(phones);
    if (data.status) {
      const max = 20;
      let count = 0;

      phones.forEach((phone) => {
        if (count < max) {
          const div = document.createElement("div");
          div.classList.add = "col";
          div.innerHTML = `
        <div class="card" onclick="exploreDetails('${phone.slug}')">
              <img src="${phone.image}" class="card-img-top w-75 mx-auto mt-2" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <h6 class="card-text">
                  ${phone.phone_name}
                </h6>
                <button class="btn btn-outline-dark btn-success text-white">
                  Explore
                </button>
              </div>
        `;
          displaySection.appendChild(div);
          count++;
        }
      });
    } else {
      controlDisplayProperty("not-found", "block");
    }
    controlDisplayProperty("spinning", "none");
  }
};

/* implementing details view of a single phone*/
const exploreDetails = (id) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;

  /* Fetching data through API*/
  fetch(url).then((res) =>
    res.json().then((data) => {
      displayDetails(data);
    })
  );

  /* Displaying details data*/
  function displayDetails(data) {
    if (data.status) {
      console.log(data);
      const detailsSection = document.getElementById("details");
      detailsSection.textContent = "";
      const div = document.createElement("div");
      const phone = data.data;
      const mainFeatures = phone.mainFeatures;
      div.classList.add("card");
      div.classList.add("mx-auto");
      div.classList.add("w-75");

      let releaseDate;
      if (typeof phone.releaseDate == "string") {
        releaseDate = phone.releaseDate;
      } else {
        releaseDate = "No release date found";
      }
      div.innerHTML = `
    <img src="${phone.image}"  class="card-img-top mx-auto mt-2 w-25" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${phone.name}</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Display: ${mainFeatures.displaySize}</li>
            <li class="list-group-item">Release date: ${releaseDate}</li>
            <li class="list-group-item">Memory: ${mainFeatures.memory}</li>
            <li class="list-group-item">Chipset: ${mainFeatures.chipSet}</li>
            <li class="list-group-item">Storage: ${mainFeatures.storage}</li>
          </ul>
        </div>
    `;
      detailsSection.appendChild(div);
    }
  }
};

/* utility functions */
const controlDisplayProperty = (id, status) => {
  document.getElementById(id).style.display = status;
};
