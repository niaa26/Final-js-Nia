    export default function getCar(year) {
        fetch("https://freetestapi.com/api/v1/cars", {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error, status = " + response.status);
                }
                return response.json();
            })
            .then((responseJSON) => {
                const fragment = document.createDocumentFragment();
                let div_list = document.createElement("div");
                div_list.classList.add("car-accordion-body");

                responseJSON.forEach((item) => {
                    if (item.year == year) {
                        let div_element = document.createElement("div");
                        div_element.classList.add("car-accordion-element");

                        let paraCarName = document.createElement("h2");
                        paraCarName.classList.add("car-accordion-title");
                        paraCarName.textContent = `${item.make} ${item.model}`;

                        let description = document.createElement("p");
                        description.classList.add("car-content");

                        let year = document.createElement("p");
                        year.textContent = `Year: ${item.year}`;

                        let color = document.createElement("p");
                        color.textContent = `Color: ${item.color}`;

                        let mileage = document.createElement("p");
                        mileage.textContent = `Mileage: ${item.mileage}`;

                        let price = document.createElement("p");
                        price.textContent = `Price: ${item.price}`;

                        let fuelType = document.createElement("p");
                        fuelType.textContent = `Fuel type: ${item.fuelType}`;

                        let transmission = document.createElement("p");
                        transmission.textContent = `Transmission: ${item.transmission}`;

                        let engine = document.createElement("p");
                        engine.textContent = `Engine displacement: ${item.engine}`;

                        let hp = document.createElement("p");
                        hp.textContent = `Horsepower: ${item.horsepower}`;

                        let feats = document.createElement("p");
                        feats.textContent = `Features: ${item.features}`;

                        let owners = document.createElement("p");
                        owners.textContent = `Owners: ${item.owners}`;

                        description.appendChild(year);
                        description.appendChild(color);
                        description.appendChild(mileage);
                        description.appendChild(price);
                        description.appendChild(fuelType);
                        description.appendChild(transmission);
                        description.appendChild(engine);
                        description.appendChild(hp);
                        description.appendChild(feats);
                        description.appendChild(owners);

                        div_element.appendChild(paraCarName);
                        div_element.appendChild(description);
                        div_list.appendChild(div_element);
                        fragment.appendChild(div_list);
                    }
                });
                document.getElementById("list-cars").innerHTML = " ";
                document.getElementById("list-cars").appendChild(fragment);
            })
            .catch((error) => {
                console.error("Error:", error);
                let pError = document.createElement("p");
                pError.textContent = "Server Error";
                document.getElementById("server-api").appendChild(pError);
            });
    }

