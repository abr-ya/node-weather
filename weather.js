#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранён)');
    } catch (error) {
        printError('Ошибка сохранения токена!');
        printError(error.message);
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    // console.log(args);

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
        printWeather();
    }
};

initCLI();
