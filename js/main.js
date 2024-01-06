class display {


    async getData() {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "79818c7a46msh9993d1a2e4c601ap1de517jsn149115e97faf",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        const dataGames = await fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/games`,
            options
        );

        const response = await dataGames.json();

        this.filterData(response);
    }



    filterData(response) {
        function filter(key) {
            let keySort = response.filter((obj) => {
                return obj.genre === `${key}`;
            });
            return keySort;
        }

        function games(key) {
            key = filter(key);
            return key;
        }

        let sections = Array.from(document.querySelectorAll(".nav-link"));
        for (let i = 0; i < sections.length; i++) {
            sections[i].addEventListener("click", function() {
                let active = document.querySelector(".active");
                active.classList.remove("active");
                sections[i].classList.add("active");
                let activePage = sections[i].getAttribute("data-category");
                let instanceObj = new display();
                instanceObj.displayData(games(activePage));
            });
        }
        this.displayData(games("MMORPG"));
    }

    displayData(response) {
        let box = "";
        for (let i = 0; i < response.length; i++) {
            box += `
  <div class="col-md-3" >
  <div class="datasec  text-center p-3 border border-1 border-black rounded-2 "id="data-show" data-id="${response[i].id}">
   <div class="data-img position-relative">
    <img src="${response[i].thumbnail}" alt="">
   </div>
    <div class="title d-flex justify-content-between align-items-center p-2 ">
      <p class="text-secondary p-0 m-0" id="title">${response[i].title}</p>
      <button id="free" class="btn text-white">Free</button>
    </div>
    <div class="desc">
    <p class="text-secondary py-1 m-0 " >${response[i].short_description}</p>
    </div>
    <div class="description d-flex justify-content-between align-items-center py-3 px-2  border-top border-1 border-black">
      <button class="btn bg-secondary text-white m-0 footer-btn p-2 fw-light rounded-pill  footer-btn" >${response[i].genre}</button>
      <button class="btn bg-secondary text-white m-0 footer-btn p-2 fw-light rounded-pill footer-btn">${response[i].platform}</button>
    </div>
  </div>
  </div>
  `;
        }

        let showData = document.getElementById("push-data");
        showData.innerHTML = box;

        let datasec = Array.from(document.querySelectorAll(".datasec"));
        for (let i = 0; i < datasec.length; i++) {
            datasec[i].addEventListener("click", function() {
                let id = datasec[i].getAttribute("data-id");
                let insObj = new display();
                insObj.getDetails(id);
                let data = document.getElementById("data").classList.add("d-none");
                let nav = document.querySelector(".navbar").classList.add("d-none");
                let backGround = document.querySelector(".background").classList.add("d-none");
                let details = document.querySelector("#details").classList.remove("d-none");
            });
        }
    }

    async getDetails(id) {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "79818c7a46msh9993d1a2e4c601ap1de517jsn149115e97faf",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };
        const details = await fetch(
            `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
            options
        );

        const response = await details.json();
        this.displayDetails(response);
    }

    displayDetails(response) {
        let box = `
        <div class="col-md-5">
                <h3 class="text-white mb-5">Details Game</h3>
                <div class="img-details">
                  <img src="${response.thumbnail}" alt="">
                </div>
              </div>
              <div class="col-md-5 m-auto text-white mt-2 ">
                <h3>Title: ${response.title}</h3>
                <p>Category : <button class="btn ms-2 p-1 rounded-2 text-black bg-info">${response.genre}</button></p>
                <p>Platform : <button class="btn ms-2 p-1 rounded-2 text-black bg-info">${response.platform}</button></p>
                <p>Status : <button class="btn ms-2 p-1 rounded-2 text-black bg-info">${response.status}</button></p>
                <p id="details-desc">${response.description}</p>
                <a href="${response.game_url}" class="btn p-2 text-white  rounded-2 mt-2" id="details-btn">Show Game</a>
              </div>`;

        let details = document.getElementById("details-sec");
        details.innerHTML = box;

        let close = document.getElementById("close");
        close.addEventListener("click", function() {
            let data = document.getElementById("data").classList.remove("d-none");
            let nav = document.querySelector(".navbar").classList.remove("d-none");
            let backGround = document
                .querySelector(".background")
                .classList.remove("d-none");
            let details = document.querySelector("#details").classList.add("d-none");
        });
    }
}

let instant = new display();
instant.getData().then(() => {
    let loadingSection = document.getElementById("loading").style.display = 'none';
});;