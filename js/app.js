fetch("/data.json")
  .then((response) => {
    if (!response.ok) {
      console.log("something went wrong");
    }
    return response.json();
  })
  .then((data) => console.log(data));
