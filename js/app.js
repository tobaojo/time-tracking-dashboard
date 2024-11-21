const container = document.getElementById("container");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

const createUrlSafeTitle = ({ title }) => {
  return title.toLowerCase().replace(/\s/g, "-");
};

const handleClick = (filter) => {
  console.log(filter);
  const card = document.getElementById("cardEl");
  console.log(card);
};

const bgColorChecker = (element) => {
  switch (element.title) {
    case "Work":
      return "bg-customLightOrange";
    case "Play":
      return "bg-customSoftBlue";
    case "Study":
      return "bg-customLightRed";
    case "Exercise":
      return "bg-customLimeGreen";
    case "Social":
      return "bg-customViolet";
    case "Self Care":
      return "bg-customSoftOrange";
    default:
      break;
  }
};

const createCard = (element) => {
  console.log(element);
  const urlSafeTitle = createUrlSafeTitle(element);
  const color = bgColorChecker(element);
  const card = document.createElement("div");
  card.setAttribute("id", "cardEl");
  const img = document.createElement("img");
  img.setAttribute("src", `/images/icon-${urlSafeTitle}.svg`);
  const innerDiv = document.createElement("div");
  const textContent = document.createElement("div");
  textContent.classList.add("text-white", "flex", "flex-col");
  const title = document.createElement("div");
  title.classList.add("flex", "justify-between");
  const h3 = document.createElement("h3");
  h3.classList.add("text-white", "text-lg");
  h3.textContent = `${element.title}`;
  const elipsis = document.createElement("p");
  elipsis.classList.add("text-customPaleBlue", "hover:text-white");
  elipsis.textContent = "•••";
  const stats = document.createElement("div");
  stats.classList.add("flex", "flex-row", "justify-between", "md:flex-col");
  const hours = document.createElement("p");
  hours.classList.add("text-[2rem]", "md:text-[3.5rem]", "font-light");
  hours.textContent = `${element.timeframes?.weekly?.current}hrs`;
  const prevHours = document.createElement("span");
  prevHours.classList.add("text-customPaleBlue", "my-auto");
  prevHours.textContent = `Last Week - ${element.timeframes?.weekly?.previous}hrs`;
  img.classList.add("top-[-7px]", "absolute", "z-10", "right-4");

  innerDiv.classList.add(
    "bg-customDarkBlue",
    "max-w-md",
    "mx-auto",
    "rounded-xl",
    "p-9",
    "relative",
    "z-20",
    "shadow-2xl",
    "hover:bg-hoverBlue",
    "hover:cursor-pointer",
  );

  card.classList.add(
    `${color}`,
    "max-w-sm",
    "mx-auto",
    "rounded-2xl",
    "relative",
    "pt-11",
    "overflow-hidden",
    "w-full",
  );

  container.appendChild(card);
  card.appendChild(img);
  card.appendChild(innerDiv);
  innerDiv.appendChild(textContent);
  textContent.appendChild(title);
  title.appendChild(h3);
  title.appendChild(elipsis);
  textContent.appendChild(stats);
  stats.appendChild(hours);
  stats.appendChild(prevHours);
};

fetch("/data.json")
  .then((response) => {
    if (!response.ok) {
      console.log("something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((element) => {
      createCard(element);
    });
    return data;
  });
