"use strict";

import getCar from "./getCar.js";

// 🍪 Cookie helper function
function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.startsWith(nameEQ)) {
            return c.substring(nameEQ.length);
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", () => {
    // Cookies
    const cookieNotification = document.getElementById('cookie-notification');
    const acceptCookiesButton = document.getElementById('accept-cookies');

    if (cookieNotification && acceptCookiesButton) {
        const hasAccepted = getCookie("cookiesAccepted");

        if (hasAccepted === "true") {
            cookieNotification.style.display = "none";
        } else {
            cookieNotification.style.display = "block";
        }

        acceptCookiesButton.addEventListener("click", () => {
            document.cookie = "cookiesAccepted=true; max-age=31536000; path=/";
            cookieNotification.style.display = "none";
        });
    }

    // Pagination 
    const carsToShow = 6;
    let currentIndex = 0;
    const carImages = document.querySelectorAll('.mid_sec-card');
    const showMoreButton = document.getElementById('show-more-btn');

    function showInitialCars() {
        for (let i = 0; i < carsToShow; i++) {
            if (carImages[i]) {
                carImages[i].classList.add('visible');
            }
        }
        currentIndex = carsToShow;
    }

    function showMoreCars() {
        for (let i = currentIndex; i < currentIndex + carsToShow; i++) {
            if (carImages[i]) {
                carImages[i].classList.add('visible');
            }
        }
        currentIndex += carsToShow;
        if (currentIndex >= carImages.length) {
            showMoreButton.style.display = 'none';
        }
    }

    showInitialCars();
    showMoreButton.addEventListener('click', showMoreCars);

    // search bar
    document.getElementById("year").addEventListener("submit", function (e) {
        e.preventDefault();

        const year = document.getElementById("input").value.trim();

        if (!year || isNaN(year)) {
            alert("Please enter a valid year!");
            return;
        }

        fetchCarsByYear(year);
    });

    // fetching the cars from api
    function fetchCarsByYear(year) {
        fetch("https://www.freetestapi.com/api/v1/cars")
            .then((response) => response.json())
            .then((cars) => {
                const filteredCars = cars.filter(car => car.year == year);
                displayCars(filteredCars);
            })
            .catch((error) => {
                console.error("Error fetching cars by year:", error);
                document.getElementById("car-list").innerHTML = "<p>Failed to fetch cars.</p>";
            });
    }

    // showing the cars in a list
    function displayCars(cars) {
        const carList = document.getElementById("car-list");
        carList.innerHTML = "";

        if (cars.length === 0) {
            carList.innerHTML = "<p>No cars found for that year.</p>";
            return;
        }

        cars.forEach((car) => {
            const carCard = document.createElement("div");
            carCard.classList.add("car-item");

            carCard.innerHTML = `
                <strong>${car.make} ${car.model}</strong><br>
                Year: ${car.year}<br>
                Price: ${car.price}<br>
                Mileage: ${car.mileage}<br>
                Fuel: ${car.fuelType}
                <hr>
            `;

            carList.appendChild(carCard);
        });
    }

    // Toggle 
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("car-accordion-element") ||
            event.target.classList.contains("car-accordion-title")) {
            event.target.classList.toggle("active");
        }
    });

    // Scroll to top
    const mybutton = document.getElementById("myBtn");
    const header = document.getElementById("navbar");
    const sticky = header.offsetTop;

    function scrollFunction() {
        if (document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    function stick() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    function top() {
        document.documentElement.scrollTop = 0;
    }

    window.onscroll = function () {
        scrollFunction();
        stick();
    };

    mybutton.addEventListener("click", top);

    // form
    const formElement = document.getElementById("registration");
    formElement.addEventListener("submit", function (event) {
        event.preventDefault();
        const errors = {};
        let usernameValue = document.getElementById("name").value;
        let reviewValue = document.getElementById("review").value;
        let passwordValue = document.getElementById("password").value;
        let passwordConfirmValue = document.getElementById("passwordConfirm").value;
        let checkInput = document.getElementById("terms").checked;

        if (usernameValue == "") errors.username = "Dont forget ur name pooks";
        if (reviewValue == "") errors.review = "u seem forgetful, fill this in pls";
        if (passwordValue == "") errors.password = "at least put ur dogs birthday or smth but make a password";
        if (passwordValue != passwordConfirmValue) errors.passwordConfirm = "cmon now, it has to be the same";
        if (!checkInput) errors.terms = "pls just agree to these terms bro its not that deep";

        formElement.querySelectorAll(".error-text").forEach((el) => el.textContent = " ");

        for (let item in errors) {
            let errorPElement = document.getElementById("error-" + item);
            errorPElement.textContent = errors[item];
        }

        if (Object.keys(errors).length == 0) {
            formElement.submit();
        }
    });

    // pasword visibility
    const password = document.getElementById("password");
    const icon = document.getElementById("icon");
    icon.addEventListener("click", function () {
        if (password.type == "password") {
            password.setAttribute("type", "text");
            icon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            password.setAttribute("type", "password");
            icon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });

    // Email 
    const email = document.getElementById("email");
    email.addEventListener("keyup", function () {
        const emailValue = email.value;
        const emailErrorText = document.getElementById("error-email");
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (regex.test(emailValue)) {
            emailErrorText.textContent = "Your Email Is Valid";
            emailErrorText.style.color = "green";
        } else {
            emailErrorText.textContent = "Your Email Is Invalid";
            emailErrorText.style.color = "red";
        }

        if (emailValue == "") {
            emailErrorText.innerHTML = "Please tell me if you have a brain problem";
        }
    });

    // prefill 
    const storedName = getCookie('username');
    const storedEmail = getCookie('email');
    const storedReview = getCookie('review');

    if (storedName && storedEmail && storedReview) {
        document.getElementById('name').value = storedName;
        document.getElementById('email').value = storedEmail;
        document.getElementById('review').value = storedReview;
    }

    // cookies romelic datas inaxavs
    document.getElementById('registration').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const review = document.getElementById('review').value;

        if (name && email && review) {
            document.cookie = `username=${name}; max-age=604800; path=/`;
            document.cookie = `email=${email}; max-age=604800; path=/`;
            document.cookie = `review=${review}; max-age=604800; path=/`;
            alert('Your information has been saved!');
        } else {
            alert('Please fill in all fields.');
        }
    });

    // burgeris menu
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("navLinks");

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        navLinks.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });
    });

    // Dark mode 
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        }
    });

    // Greeting saxelis sheyvanit
    const savedName = sessionStorage.getItem('username');
    if (savedName) {
        document.getElementById('greeting').innerHTML = `Welcome to this website, ${savedName}!`;
        document.getElementById('nameForm').style.display = 'none';
    } else {
        document.getElementById('greeting').innerHTML = 'Please enter your name.';
    }

    document.getElementById('nameForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        if (name) {
            sessionStorage.setItem('username', name);
            document.getElementById('greeting').innerHTML = `Welcome to this website, ${name}!`;
            document.getElementById('nameForm').style.display = 'none';
        }
    });

    // View button romelic midis car details pageze
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("mid_sec-card-button")) {
            const card = e.target.closest(".mid_sec-card");
            const carName = card.querySelector(".mid_sec-card-title").textContent.trim();
            sessionStorage.setItem("selectedCarName", carName);
            window.location.href = "car-details.html";
        }
    });
});
