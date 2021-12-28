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

const getForecast = async () => {
	try {
		const city = await getKeyValue(TOKEN_DICTIONARY.city);
		const weather = await getWeather(city || 'moscow');
		printWeather(weather);
	} catch (e) {
		printError(e.message);
	}
};

const initCLI = () => {
    const args = getArgs(process.argv); // преобразуем аргументы вызова в объект

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        // сохранить город
        saveKeyValue('city', args.s);
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
