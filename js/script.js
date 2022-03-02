/* Function to Load Display Search result */

const loadSearchResult = () => {
  const inputField = document.querySelector("#input-search");
  const displaySection = document.querySelector("#display-section");
  const searchText = inputField.value;
  displaySection.textContent = "";
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
        <div class="card" id="card">
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
          controlDisplayProperty("spinning", "none");
          displaySection.appendChild(div);
          count++;
        }
      });
    } else {
      controlDisplayProperty("not-found", "block");
    }
  }
};

/* implementing details view of a single phone*/

/* utility functions */
const controlDisplayProperty = (id, status) => {
  document.getElementById(id).style.display = status;
};
