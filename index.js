const navigationEl = document.querySelector(".navigation");
const dropdownEl = document.querySelector(".dropdown");

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
		tracker.current = hoverBoardEl.getBoundingClientRect().left;

		dropdownEl.dataset.visible = "true";
		dropdownEl.dataset.type = hoverBoardEl.dataset.info;
		dropdownEl.style.setProperty("--position", tracker.position);
	} else if (e.target.matches("a")) {
		dropdownEl.dataset.visible = "false";
	}
});

navigationEl.addEventListener("mouseleave", () => {
	dropdownEl.dataset.visible = "false";
});
