const loadData = async (isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;

  const res = await fetch(url);
  const data = await res.json();

  // Skip cards with id equal to 6 and 11 beacuse they don't have image
  const tools = data.data.tools.filter(
    (tool) => tool.id !== "06" && tool.id !== "11"
  );

  displayData(tools, isShowAll);
};

const displayData = (tools, isShowAll) => {
  const cardContainer = document.getElementById("card-container");

  if (!isShowAll) {
    tools = tools.splice(0, 6);
  }

  cardContainer.textContent = "";

  tools.forEach((tool) => {
    const div = document.createElement("div");
    div.classList.add("card", "w-96", "bg-base-100", "border-2", "p-5");

    const featuresList = tool.features
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    div.innerHTML = `
        <figure>
        <img
            src="${tool.image}"
            alt="${tool.id}"
            class="rounded-xl"
        />
        </figure>
        <div class="px-2 pt-4">
        <h2 class="text-3xl font-bold mb-2">Features</h2>

        <ol class="list-decimal px-4 pt-1 space-y-2">
         ${featuresList}
        </ol>

        <hr class="my-3" />
        <div>
            <h4 class="text-2xl font-bold">${tool.name}</h4>
            <div class="flex items-center justify-between mt-2">
            <div class="flex gap-2">
                <img src="./img/Vector.svg" alt="Vector" />
                <p>${tool.published_in}</p>
            </div>
            <img src="./img/arrow.png" alt="arrow" />
            </div>
        </div>
        </div>
    `;

    cardContainer.appendChild(div);
  });
};

const showAllCard = () => {
  loadData(true);

  const showAllCardContainer = document.getElementById("show-all-card");
  showAllCardContainer.classList.add("hidden");
};

loadData();
