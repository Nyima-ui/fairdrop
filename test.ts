function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) resolve("Data fetched successfully!");
      else reject("Error: Failed to fetch data");
    }, 3000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
