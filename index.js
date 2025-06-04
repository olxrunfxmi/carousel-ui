const switcherEl = document.querySelector(".switcher");
const cardContainerEl = document.querySelector(".card-container");

switcherEl.addEventListener("click", (e) => {
	if (e.target.closest("#horizontal")) {
		cardContainerEl.dataset.direction = "horizontal";
		e.target.closest("#horizontal").dataset.state = "active";
		e.target.closest("#horizontal").nextElementSibling.dataset.state =
			"inactive";
	} else if (e.target.closest("#vertical")) {
		cardContainerEl.dataset.direction = "vertical";
		e.target.closest("#vertical").dataset.state = "active";
		e.target.closest("#vertical").previousElementSibling.dataset.state =
			"inactive";
	}
});
