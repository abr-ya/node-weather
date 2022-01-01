#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getWeather } from './services/api.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен.');
        return
    }
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранён)');
    } catch (error) {
        printError('Ошибка сохранения токена!');
        printError(error.message);
    }
};

const saveCity = async (city) => {
    if (!city.length || city.length < 3) {
        printError('Введите имя города не меньше 3х символов!');
        return
    }
    try {
        // здесь можно бы сделать проверку на существование
        // но надо или запросить погоду - тогда точно нужен токен
        // или использовать альтернативный API с именами городов
        await saveKeyValue('city', city);
        printSuccess(`Город ${city} сохранён в вашем рабочем каталоге)`);
    } catch (error) {
        printError('Ошибка сохранения города!');
        printError(error.message);
    }
};

// основной запрос погоды сейчас здесь!
// обработка ошибок будет здесь же
const getForecast = async () => {
	try {
        // смотрим, нет ли в ENV?))
		const city = process.env.CITY || await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city || 'moscow');
		printWeather(weather);
	} catch (e) {
        if (e?.response?.status === 404) {
            printError('Неверно указан город (ошибка Axios 404)');
        } else if (e?.response?.status === 401) {
            printError('Неверно указан токен (ошибка Axios 401)');
        } else {
            printError(e.message);
        }
	}
};

const initCLI = () => {
    const args = getArgs(process.argv); // преобразуем аргументы вызова в объект

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        // сохранить город
        saveCity(args.s);
    }
    
    if (args.t) {
        // сохранить токен
        saveToken(args.t);
    }

    if (Object.keys(args).length === 0) {
        getForecast();
    }
};

initCLI();
