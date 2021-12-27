import { homedir } from 'os'; // получаем домашнюю папку (функция!)
import { join } from 'path'; // для "правильного" объединения
import { promises } from 'fs'; // асинхронная работа с файловой системой

const filePath = join(homedir(), 'weather-data.json'); // будем сохранять сюда

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city'
}

// проверим, что файл существует
const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};

const saveKeyValue = async (key, value) => {
	let data = {};
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		return data[key];
	}
	return undefined;
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };