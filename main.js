// Test.startAllTests();

create_exel(get_screen_size());

function create_exel([width, height]) {
	const colls = Math.floor(width / 100);
	const rows = Math.floor(height / 17);

	new SpreadsheetHtml(rows, colls);
}

function get_screen_size() {
	return [window.innerWidth, window.innerHeight];
}