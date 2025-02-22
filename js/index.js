document.addEventListener("DOMContentLoaded", function () {
    getKits();
});

function getKits() {
    let kits = JSON.parse(localStorage.getItem("kits") || "[]");

    let items = JSON.parse(localStorage.getItem("items") || "[]");

    let minCalories = JSON.parse(localStorage.getItem("minCalories") || "0");
    document.getElementById("min-calories").value = minCalories;

    let maxWeight = JSON.parse(localStorage.getItem("maxWeight") || "0");
    document.getElementById("max-weight").value = maxWeight;

    let kitsContainer = document.getElementById("kits-container");

    if (kits.length === 0) {
        kitsContainer.innerHTML = "<h2>No hay kits registrados</h2>";
    } else {
        kits.map((kit) => {
            let kitItems = items.filter((i) => i.kitId === kit.id);

            let kitMinCalories = kitItems.reduce((acc, i) => acc + Number(i.calories), 0);
            let kitMaxWeight = kitItems.reduce((acc, i) => acc + Number(i.weight), 0);

            if (kitMinCalories <= minCalories || kitMaxWeight > maxWeight) {
                kitsContainer.innerHTML = `<div class="card text-white bg-light mb-3 fw-bold" style="max-width: 20rem; min-width: 13rem">
                                                <div class="card-body text-center">
                                                    <p class="card-text text-center text-dark">KIT ${kit.id}</p>
                                                    <p class="card-text text-dark">Calorías míninas: ${minCalories}</p>
                                                    <p class="card-text text-dark">Peso máximo: ${maxWeight}</p>
                                                    <button class="btn btn-dark">
                                                        <a href="kit.html?id=${kit.id}" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Ver</a>
                                                    </button>
                                                </div>
                                            </div>`;
            } else {
                kitsContainer.innerHTML = `<div class="card mb-3 fw-bold border-3 border-danger" style="max-width: 20rem; min-width: 13rem">
                                                <div class="card-body text-center">
                                                    <p class="card-text text-center text-danger">NO COMPATIBLE</p>
                                                    <p class="card-text text-center text-dark">KIT ${kit.id}</p>
                                                    <p class="card-text text-dark">Calorías míninas: ${minCalories}</p>
                                                    <p class="card-text text-dark">Peso máximo: ${maxWeight}</p>
                                                    <button class="btn btn-dark">
                                                        <a href="kit.html?id=${kit.id}" class="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Ver</a>
                                                    </button>
                                                </div>
                                            </div>`;
            }
        });
    }

    let selectKit = document.getElementById("select-kit");

    kits.map((kit) => {
        let option = document.createElement("option");
        option.value = kit.id;
        option.text = `KIT ${kit.id}`;
        selectKit.appendChild(option);
    });
}

document.getElementById("save-max-params").addEventListener("click", function () {
    document.getElementById("max-params-form").addEventListener("submit", function (e) {
        e.preventDefault();
    });

    let minCalories = document.getElementById("min-calories").value;
    let maxWeight = document.getElementById("max-weight").value;

    localStorage.setItem("maxWeight", maxWeight);
    localStorage.setItem("minCalories", minCalories);

    getKits();
});

document.getElementById("save-kit").addEventListener("click", () => {
    document.getElementById("kit-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    let kits = JSON.parse(localStorage.getItem("kits") || "[]");

    let id;

    if (kits.length >= 1) {
        id = kits[kits.length - 1].id + 1;
    } else {
        id = 1;
    }
    let name = document.getElementById("kit-name").value;

    kits.push({
        id,
        name,
    });

    localStorage.setItem("kits", JSON.stringify(kits));

    getKits();
});

document.getElementById("save-item").addEventListener("click", () => {
    document.getElementById("item-form").addEventListener("submit", (e) => {
        e.preventDefault();
    });

    let items = JSON.parse(localStorage.getItem("items") || "[]");

    let id;

    if (items.length >= 1) {
        id = items[items.length - 1].id + 1;
    } else {
        id = 1;
    }

    let kitId = Number(document.getElementById("select-kit").value);
    let name = document.getElementById("item-name").value;
    let calories = document.getElementById("item-calories").value;
    let weight = document.getElementById("item-weight").value;

    items.push({
        id,
        kitId,
        name,
        calories,
        weight,
    });

    localStorage.setItem("items", JSON.stringify(items));

    getKits();
});
