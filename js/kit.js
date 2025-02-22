document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const kitId = Number(urlParams.get("id"));

    document.getElementById("kit-title").innerHTML = `<h1 class="fw-bold">KIT ${kitId}</h1>`;

    if (!kitId) {
        document.getElementById("items-container").innerHTML = '<p class="text-center text-danger">Kit no encontrado</p>';
        return;
    }

    const items = JSON.parse(localStorage.getItem("items") || "[]");
    const kitItems = items.filter((item) => item.kitId === kitId);

    if (kitItems.length === 0) {
        document.getElementById("items-container").innerHTML = '<p class="text-center">No hay ítems en este kit</p>';
    } else {
        let itemsHtml = '<div class="d-flex flex-direction-row m-5">';
        kitItems.forEach((item) => {
            itemsHtml += `
                <div class="m-3" style="max-width: 20rem; min-width: 13rem">
                    <div class="card mb-4 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title text-center fw-bold">${item.name}</h5>
                            <p class="card-text text-center fw-bold">Calorías: ${item.calories}</p>
                            <p class="card-text text-center fw-bold">Peso: ${item.weight}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        itemsHtml += "</div>";
        document.getElementById("items-container").innerHTML = itemsHtml;
    }
});
