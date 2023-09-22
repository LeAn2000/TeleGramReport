$(document).ready(function () {
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn",
            },
        },
    });
	var dataSource = new kendo.data.DataSource({
		data: [
			{ CityID: 1, CityName: "Lisboa" },
			{ CityID: 2, CityName: "Moscow" },
			{ CityID: 3, CityName: "Napoli" },
			{ CityID: 4, CityName: "Tokyo" },
			{ CityID: 5, CityName: "Oslo" },
			{ CityID: 6, CityName: "Pаris" },
			{ CityID: 7, CityName: "Porto" },
			{ CityID: 8, CityName: "Rome" },
			{ CityID: 9, CityName: "Berlin" },
			{ CityID: 10, CityName: "Nice" },
			{ CityID: 11, CityName: "New York" },
			{ CityID: 12, CityName: "Sao Paulo" },
			{ CityID: 13, CityName: "Rio De Janeiro" },
			{ CityID: 14, CityName: "Venice" },
			{ CityID: 15, CityName: "Los Angeles" },
			{ CityID: 16, CityName: "Madrid" },
			{ CityID: 17, CityName: "Barcelona" },
			{ CityID: 18, CityName: "Prague" },
			{ CityID: 19, CityName: "Mexico City" },
			{ CityID: 20, CityName: "Buenos Aires" }
		],
		sort: { field: "CityName", dir: "asc" }
	});

	$("#kd-place-chooser").kendoDropDownList({
		filter: "contains",
		optionLabel: 'Please select city...',
		dataTextField: "CityName",
		dataValueField: "CityID",
		dataSource: dataSource
	});


});
