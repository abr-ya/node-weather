#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printError, printSuccess, printHelp, printWeather } from './services/log.service.js';

const initCLI = () => {
    const args = getArgs(process.argv);
    // console.log(args);

    if (args.h) {
        printHelp();
    }

    if (args.s) {
        // сохранить город
    }
    
    if (args.t) {
        // сохранить токен
    }

    if (Object.keys(args).length === 0) {
        printWeather();
    }
};

initCLI();
