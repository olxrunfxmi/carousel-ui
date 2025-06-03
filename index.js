const navigationEl = document.querySelector(".navigation");
const dropdownEl = document.querySelector(".dropdown");

navigationEl.addEventListener("mousemove", (e) => {
	// console.log(e.target.closest(".hover-board"));
	const hoverBoardEl = e.target.closest(".hover-board");

	if (hoverBoardEl) {
		console.log(hoverBoardEl.getBoundingClientRect().left);
		const leftValue = hoverBoardEl.getBoundingClientRect().left + "px";
		dropdownEl.dataset.visible = "true";
		dropdownEl.dataset.type = hoverBoardEl.dataset.info;
		dropdownEl.style.left = leftValue;
	} else if (e.target.matches("a")) {
		dropdownEl.dataset.visible = "false";
	}
});

navigationEl.addEventListener("mouseleave", () => {
	dropdownEl.dataset.visible = "false";
});
