const navigationEl = document.querySelector(".navigation");
const dropdownEl = document.querySelector(".dropdown-wrapper");
const mobileIconEl = document.querySelector("#identifier");

const tracker = {
	reference: 0,
	current: 0,
	get position() {
		return this.current - this.reference;
	},
};

navigationEl.addEventListener("mousemove", (e) => {
	tracker.reference = navigationEl.getBoundingClientRect().left;

	const hoverBoardEl = e.target.closest(".hover-board");

	if (hoverBoardEl) {
		const details = hoverBoardEl.getBoundingClientRect().width / 2;

		if (hoverBoardEl.getBoundingClientRect().left <= tracker.reference) {
			tracker.current = hoverBoardEl.getBoundingClientRect().left - details;
		} else {
			tracker.current =
				hoverBoardEl.getBoundingClientRect().left - details + 24;
		}

		dropdownEl.dataset.visible = "true";
		dropdownEl.dataset.type = hoverBoardEl.dataset.info;
		dropdownEl.style.setProperty("--position", tracker.position);
	} else if (e.target.matches(".hover-link")) {
		dropdownEl.dataset.visible = "false";
	}
});

navigationEl.addEventListener("mouseleave", () => {
	dropdownEl.dataset.visible = "false";
});

mobileIconEl.addEventListener("click", () => {
	navigationEl.dataset.mobileopen =
		navigationEl.dataset.mobileopen === "true" ? "false" : "true";
});

window.addEventListener("resize", () => {
	if (window.innerWidth > 860) {
		navigationEl.removeAttribute("data-mobileopen");
	}
});
