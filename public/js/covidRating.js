function displayRadioValue() {
	let section1 = document.querySelectorAll('.section-1 > input[type="radio"]');
	let section2 = document.querySelectorAll('.section-2 > input[type="radio"]');
	let section1Total = 0;
	let section2Total = 0;
	let section1Question = 0;
	let section2Question = 0;
	let section1Res = document.querySelector(".section-1-results");
	let section2Res = document.querySelector(".section-2-results");
	let result1 = "";
	let result2 = "";

	//Section 1
	section1.forEach(function (radio, index) {
		if (radio.checked) {
			section2Question++;
			console.log(section2Question);
			section1Total += +radio.value;
		}
		console.log(section2Question);
	});
	let multiple = section2Question * 5;
	let result = section1Total / multiple;
	let percentage = result * 100;
	percentage = percentage.toFixed(2);
	
	//Section 1
	result1 += "<b>Results:</b><br>";
	result1 += "Total: " + section1Total + "<br>";
	result1 += "Percentage: " + percentage + "%";
	section1Res.innerHTML = result1;
}
