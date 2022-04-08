/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/getting-started/configuration.html#general
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
//Manually created modules
const userModules = [
	{
		module: "alert",
	},
	//Clock
	{
		module: "clock",
		position: "top_right",
		config: {
			displaySeconds: false,
			showWeek: true
		},
	},
	//Current Weather
	{
		module: "weather",
		position: "top_right",
		header: "Weer in Amersfoort",
		config: {
			weatherProvider: "openweathermap",
			type: "current",
			location: "Amersfoort, Netherlands",
			locationID: "2759821", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
			apiKey: "97683926cb2e70daeabeea1967ea7d98"
		}
	},
	//Weather Forecast
	{
		module: "weather",
		position: "top_right",
		header: "Weersvoorspelling",
		config: {
			weatherProvider: "openweathermap",
			type: "forecast",
			location: "Amersfoort",
			locationID: "2759821", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
			apiKey: "97683926cb2e70daeabeea1967ea7d98"
		}
	},
	//F1 Calendar
	{
		module: "calendar",
		header: "F1 Kalender",
		position: "top_right",
		config: {
			dateFormat: "DD MMM",
			fullDayEventDateFormat: "DD MMM",
			maxTitleLength: 25,
			calendars: [
				{
					name: "F1",
					symbol: "solid fa-t",
					color: "#039BE5",
					url: "http://ics.maak-agenda.nl/v2/league/formula-1.ics?ba226f7b332ee617"
				},
			]
		}
	},
	//Anti Burn In
	{
		module: "MMM-BurnIn",
		config: {
		   updateInterval: 30, // in Minutes
		   invertDuration: 0.2 // in Seconds
		}
	}
];
//Calender URLS and colors for each household member
const household = {
	Iede: {
		color: "#8E24AA",
		url: "https://calendar.google.com/calendar/ical/ghh530ubnv98rdoqq8io6lf2pg%40group.calendar.google.com/private-f4c5f4be36660e2d8c55ca47bef7ec7f/basic.ics",
	},
	Phin: {
		color: "#7986CB",
		url: "https://calendar.google.com/calendar/ical/6fol4n5qpkri8v62fptudlusuc%40group.calendar.google.com/private-4d678607235cca6083dd50c7483135f3/basic.ics",
	},
	Tom: {
		color: "#D50000",
		url: "https://calendar.google.com/calendar/ical/qfhs3iv2sgdjf5jvfde39c26ks%40group.calendar.google.com/private-7157a750f8ee186aad3a72556649c1f5/basic.ics",
	},
	Sam: {
		color: "#795548",
		url: "https://calendar.google.com/calendar/ical/6fol4n5qpkri8v62fptudlusuc%40group.calendar.google.com/private-4d678607235cca6083dd50c7483135f3/basic.ics",
	},
	Theo: {
		color: "#039BE5",
		url: "https://calendar.google.com/calendar/ical/ttkoffeman%40gmail.com/private-9be8b89f49e31008ceeabed1fd3f5234/basic.ics",
	},
}
//Array containing all modules
let moduleArray = [];
//Pushes manual created modules to array "moduleArray"
userModules.forEach(element => {
	moduleArray.push(element);
});
//Iterates through ever person in array "household"
for (person in household) {
	//Creates module for each person in "household"
	if (household.hasOwnProperty(person)) {
		let people = household[person];
		let name = person;
		let calendar = {
			module: "calendar",
			header: "Kalender " + name,
			position: "top_left",
			config: {
				maximumEntries: 7,
				colored: true,
				maxTitleLength: 30,
				displaySymbol: false,
				dateFormat: "DD MMM",
				fullDayEventDateFormat: "DD MMM",
				timeFormat: "absolute",
				sliceMultiDayEvents: true,
				getRelative: 0,
				urgency: 0,
				calendars: [
					{
						name: name,
						color: people.color,
						url: "https://calendar.google.com/calendar/ical/ttkoffeman%40gmail.com/private-9be8b89f49e31008ceeabed1fd3f5234/basic.ics"
					},
				]
			}
		}
		//pushes create module to "moduleArray"
		moduleArray.push(calendar);
	}
}
let config = {
	address: "localhost", 	// Address to listen on, can be:
	// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	// - another specific IPv4/6 to listen on a specific interface
	// - "0.0.0.0", "::" to listen on any interface
	// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
	// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], 	// Set [] to allow all IP addresses
	// or add a specific IPv4 of 192.168.1.5 :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "nl",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
	// local for armv6l processors, default
	//   starts serveronly and then starts chrome browser
	// false, default for all NON-armv6l devices
	// true, force serveronly mode, because you want to.. no UI on this device

	modules: moduleArray
};
/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
