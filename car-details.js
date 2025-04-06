"use strict";

// სხვანაირად არ აჩნს ფოტოებს იმ ახალ ფეიჯზე ხოდაამ with this dictionnary itll basically use it later on yk for the pics//
const carImages = {
    "Toyota Corolla": "https://upload.wikimedia.org/wikipedia/commons/2/2f/2022_Toyota_Corolla_L_in_Classic_Silver_Metallic%2C_Front_Right%2C_03-20-2022.jpg",
    "Honda Accord": "https://vehicle-images.dealerinspire.com/9053-110008765/SHHFK7H49MU208257/e18a53f83de12b3a4e361428b3d29a66.jpg",
    "Ford Mustang": "https://lp-auto-assets.s3.amazonaws.com/20/Ford/mustang/T1/header.jpg",
    "Chevy Equinox": "https://static.foxdealer.com/513/2019/10/2019-Chevy-Equinox-Kinetic-Blue-Metallic-side-view_o.jpg",
    "Nissan Altima": "https://images.customwheeloffset.com/web-compressed/1923093-1-2020-altima-nissan-sr-stock-stock-esr-rf1-black.jpg",
    "BMW 3 Series": "https://hips.hearstapps.com/hmg-prod/images/2021-bmw-3-series-mmp-1-1593549868.jpg",
    "Tesla Model 3": "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2021/12/tesla-model-3-2022-2562335.jpg?tf=3840x",
    "Audi Q5": "https://hips.hearstapps.com/hmg-prod/images/2021-audi-q5-mmp-1-1616682622.jpg",
    "Chevrolet Silverado": "https://images.clickdealer.co.uk/vehicles/5290/5290711/2820x2115/123123359.jpg",
    "Chevy SUVs": "https://di-uploads-pod2.dealerinspire.com/carlblackchevybuickgmckennesaw/uploads/2018/07/chevy-suvs-0302.png",
    "Subaru Outback": "https://static.motor.es/fotos-noticias/2021/03/subaru-outback-2021-fecha-lanzamiento-202176682-1617008744_1.jpg",
    "BMW X5": "https://storage.googleapis.com/wackk-images-production-4f204ab/ok8rrj84oued155evu3bdz9zzyhs",
    "Ford F-150 Raptor": "https://upload.wikimedia.org/wikipedia/commons/3/34/Ford_F-150_Raptor_2020.jpg",
    "Mercedes-Benz G-Class": "https://upload.wikimedia.org/wikipedia/commons/5/5c/2021_Mercedes-Benz_G-Class_4MATIC_5.5_V8_Black.jpg",
    "Ford PowerBoost Hybrid F150": "https://www.ford.com/cmslibs/content/dam/brand_ford/en_us/brand/resources/general/newsroom/2020/2020_Ford_Powerboost_Hybrid_F150.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg",
    "Jeep Grand Cherokee": "https://carphotos.cardomain.com/ride_images/3/479/5739/32834830029_large.jpg",
    "Jeep Wrangler": "https://upload.wikimedia.org/wikipedia/commons/a/a3/2018_Jeep_Wrangler.jpg",
    "Jeep Cherokee": "https://upload.wikimedia.org/wikipedia/commons/7/70/2021_Jeep_Cherokee.jpg"
  };
  

  const carName = sessionStorage.getItem("selectedCarName");
  const container = document.getElementById("car-details-container");
  
  if (!carName) {
    container.textContent = "No car selected.";
  } else {
    fetch("https://www.freetestapi.com/api/v1/cars")
      .then(response => response.json())
      .then(cars => {
        const selectedCar = cars.find(car =>
          `${car.make} ${car.model}`.toLowerCase().trim() === carName.toLowerCase().trim()
        );
  
        if (!selectedCar) {
          container.textContent = "Car not found.";
          return;
        }
  
        // Create wrapper
        const wrapper = document.createElement("div");
        wrapper.classList.add("car-detail-card");
  
        // Add title
        const fullName = `${selectedCar.make} ${selectedCar.model}`;
        const title = document.createElement("h2");
        title.textContent = fullName;
        wrapper.appendChild(title);
  
        // Add image from dictionary
        const imageUrl = carImages[fullName] || "https://via.placeholder.com/400x300?text=No+Image";
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = fullName;
        img.style.width = "100%";
        img.style.maxWidth = "400px";
        img.style.marginBottom = "1rem";
        wrapper.appendChild(img);
  
        // Add details
        const details = [
          { label: "Year", value: selectedCar.year },
          { label: "Color", value: selectedCar.color },
          { label: "Mileage", value: selectedCar.mileage },
          { label: "Price", value: selectedCar.price },
          { label: "Fuel Type", value: selectedCar.fuelType },
          { label: "Transmission", value: selectedCar.transmission },
          { label: "Engine", value: selectedCar.engine },
          { label: "Horsepower", value: selectedCar.horsepower },
          { label: "Owners", value: selectedCar.owners },
          { label: "Features", value: selectedCar.features }
        ];
  
        details.forEach(detail => {
          const p = document.createElement("p");
          p.innerHTML = `<strong>${detail.label}:</strong> ${detail.value}`;
          wrapper.appendChild(p);
        });
  
        // Append everything
        container.appendChild(wrapper);
      })
      .catch(error => {
        console.error("API Error:", error);
        container.textContent = "Error loading car data.";
      });
  }