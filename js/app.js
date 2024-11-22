const container = document.getElementById("container");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

const createUrlSafeTitle = ({ title }) => {
  return title.toLowerCase().replace(/\s/g, "-");
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

const createCard = (element, timeframe) => {
  const currentHours = element.timeframes?.[timeframe]?.current || 0;
  const previousHours = element.timeframes?.[timeframe]?.previous || 0;
  const urlSafeTitle = createUrlSafeTitle(element);
  const color = bgColorChecker(element);
  const card = document.createElement("div");
  card.setAttribute("id", "cardEl");
  const img = document.createElement("img");
  img.setAttribute("src", `./images/icon-${urlSafeTitle}.svg`);
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
  stats.classList.add(
    "flex",
    "flex-row",
    "justify-between",
    "md:flex-col",
    "gap-2",
  );
  const hours = document.createElement("p");
  hours.classList.add("text-[2rem]", "md:text-[3.5rem]", "font-light");
  hours.textContent = `${currentHours}hrs`;
  const prevHours = document.createElement("span");
  prevHours.classList.add("text-customPaleBlue", "my-auto", "gap-2");
  prevHours.setAttribute("id", "test");
  prevHours.textContent = `Last Week - ${previousHours}hrs`;
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
    "card",
    `${color}`,
    "max-w-sm",
    "mx-auto",
    "rounded-2xl",
    "relative",
    "pt-11",
    "overflow-hidden",
    "w-full",
  );

  card.setAttribute("id", "card");

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

let elementObjArray = [];

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      console.log("something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    elementObjArray = data.map((element) => {
      const processedElement = timeframeChecker(element);
      createCard(element, "weekly");
      return processedElement;
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

const clearContainer = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((element) => {
    element.remove();
  });
};

const handleClick = (timeframe) => {
  clearContainer();

  updateTimeframeButtonStyles(timeframe);
  const newArr = elementObjArray.map((element) => {
    const filteredElement = {
      title: element.title,
      timeframes: { [timeframe]: element.timeframes[timeframe] },
    };
    createCard(filteredElement, timeframe);
    return filteredElement;
  });
  return newArr;
};

const updateTimeframeButtonStyles = (selectedTimeframe) => {
  const buttons = ["daily", "weekly", "monthly"];
  buttons.forEach((timeframe) => {
    const button = document.getElementById(timeframe);
    if (timeframe === selectedTimeframe) {
      button.classList.add("text-white");
    } else {
      button.classList.remove("text-white");
    }
  });
};

const timeframeChecker = (element) => {
  return element;
};
