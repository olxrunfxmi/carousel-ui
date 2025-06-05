const switcherEl = document.querySelector(".switcher");
const cardContainerEl = document.querySelector(".card-container");
const cardEls = document.querySelectorAll(".card");

const state = {
	updateX: 0,
	referenceX: cardContainerEl
		.querySelector("[data-focus]")
		.getBoundingClientRect().left,
	currentX: 0,
	updateY: 0,
	referenceY: cardContainerEl
		.querySelector("[data-focus]")
		.getBoundingClientRect().top,
	currentY: 0,
	get diffX() {
		return this.updateX + (this.currentX - this.referenceX);
	},
	get diffY() {
		return this.updateY + (this.currentY - this.referenceY);
	},
};

cardContainerEl.addEventListener("click", (e) => {
	const clickedCardEl = e.target.closest(".card");

	if (clickedCardEl && cardContainerEl.dataset.direction === "horizontal") {
		const cardProp = {
			size: "small",
			update: "updateX",
			reference: "referenceX",
			current: "currentX",
			difference: "diffX",
			direction: "left",
		};
		flip(executeCarousel, clickedCardEl, cardProp);
	} else if (
		clickedCardEl &&
		cardContainerEl.dataset.direction === "vertical"
	) {
		const cardProp = {
			size: "small",
			update: "updateY",
			reference: "referenceY",
			current: "currentY",
			difference: "diffY",
			direction: "top",
		};
		flip(executeCarousel, clickedCardEl, cardProp);
	}
});

switcherEl.addEventListener("click", (e) => {
	if (e.target.closest("#horizontal")) {
		cardContainerEl.dataset.direction = "horizontal";

		setAllCardsTo("small");
		resetLayout(cardEls[2]);

		e.target.closest("#horizontal").dataset.state = "active";
		e.target.closest("#horizontal").nextElementSibling.dataset.state =
			"inactive";
	} else if (e.target.closest("#vertical")) {
		cardContainerEl.dataset.direction = "vertical";

		setAllCardsTo("small");
		resetLayout(cardEls[2]);

		e.target.closest("#vertical").dataset.state = "active";
		e.target.closest("#vertical").previousElementSibling.dataset.state =
			"inactive";
	}
});

window.addEventListener("resize", () => {
	if (cardContainerEl.dataset.direction === "horizontal") {
		state.referenceX = cardContainerEl
			.querySelector("[data-focus]")
			.getBoundingClientRect().left;
	} else if (cardContainerEl.dataset.direction === "vertical") {
		state.referenceX = cardContainerEl
			.querySelector("[data-focus]")
			.getBoundingClientRect().top;
		console.log(state.referenceX);
	}
});

function resetLayout(mainCard) {
	cardContainerEl.style.setProperty("--diff", 0);
	mainCard.dataset.size = "big";
	mainCard.dataset.focus = "true";

	changeCardSeries(mainCard);
}

function setAllCardsTo(value) {
	cardEls.forEach((card) => {
		card.dataset.size = value;
		card.removeAttribute("data-focus");
	});
}

function changeCardSeries(card) {
	if (card.previousElementSibling) {
		card.previousElementSibling.dataset.size = "medium";
	}

	if (card.nextElementSibling) {
		card.nextElementSibling.dataset.size = "medium";
	}

	card.dataset.size = "big";
	card.dataset.focus = "true";
}

function executeCarousel(size, element) {
	setAllCardsTo(size);
	changeCardSeries(element);
}

function flip(func, element, prop) {
	// First Position
	const firstClickedCardRect = element.getBoundingClientRect();

	const currentDiff =
		getComputedStyle(cardContainerEl).getPropertyValue("--diff");
	state[prop.update] = Number(currentDiff);
	state[prop.reference] = cardContainerEl
		.querySelector("[data-focus]")
		.getBoundingClientRect()[prop.direction];

	requestAnimationFrame(() => {
		func(prop.size, element); // Effects UI Layout change
		state[prop.current] = element.getBoundingClientRect()[prop.direction];
		cardContainerEl.style.setProperty("--diff", state[prop.difference]);

		// Last Position
		const lastClickedCardRect = element.getBoundingClientRect();

		// Invert
		const dw = firstClickedCardRect.width / lastClickedCardRect.width;
		const dh = firstClickedCardRect.height / lastClickedCardRect.height;

		element.style.setProperty("--dw", dw);
		element.style.setProperty("--dh", dh);

		element.dataset.flip = "invert";

		requestAnimationFrame(() => {
			// Play
			element.dataset.flip = "play";
		});
	});
}
