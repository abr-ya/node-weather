import chalk from 'chalk'; // стилизация текста
import dedent from 'dedent-js'; // убирает лишние отступы

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи (текущий вывод)
		-t [API_KEY] для сохранения токена
		`
	);
};

// иконка погоды на основе кода
const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getTimeZone = (apiZone) => `UTC${apiZone >= 0 ? "+" : ""}${apiZone / 3600}`

const stamp2date = (stamp, timeZone='UTC') => {
	const dateObject = new Date(stamp * 1000); // важно: миллисекнды!
	return dateObject.toLocaleString('ru-RU', { timeZone });
};

const printWeather = (res) => {
	if (!res) {
		printError('Не передан объект результатов!');
	} else {
		const timeZone = getTimeZone(res.timezone);
		console.log(
			dedent`${chalk.bgBlue(' WEATHER ')} Погода в городе ${res.name} (${res.sys.country})
			Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
			Облачность: ${getIcon(res.weather[0].icon)}  ${res.weather[0].description}
			Влажность: ${res.main.humidity}%
			Скорость ветра: ${res.wind.speed}
			Часовой пояс: ${timeZone}
			Восход: ${stamp2date(res.sys.sunrise + res.timezone)} Закат: ${stamp2date(res.sys.sunset + res.timezone)}
			`
		);
	}
};

export { printError, printSuccess, printHelp, printWeather };