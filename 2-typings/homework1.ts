'use strict';

// ❌ Следующая цель для исправления: старые импорты
var makeOrdinal = require('./makeOrdinal');
var isFinite = require('./isFinite');
var isSafeNumber = require('./isSafeNumber');

const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1000000;
const ONE_BILLION = 1000000000;           
const ONE_TRILLION = 1000000000000;       
const ONE_QUADRILLION = 1000000000000000; 
const MAX = 9007199254740992;             

const LESS_THAN_TWENTY: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED: string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

function toWords(number: number | string, asOrdinal?: boolean): string {
    let words: string = '';
    const num = parseInt(number.toString(), 10);

    if (!isFinite(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    
    // ✅ Исправлено: убрали ошибочный .join(' '), так как функция ниже уже возвращает готовую строку
    words = generateWords(num);
    return asOrdinal ? makeOrdinal(words) : words;
}

// ✅ Исправлено: words теперь снова массив строк по умолчанию
function generateWords(number: number, words: string[] = []): string {
    let remainder: number = 0;
    let word: string = '';

    if (number === 0) {
        // ✅ Вернули метод .join(' '), так как words это массив
        return words.length > 0 ? words.join(' ').replace(/,$/, '') : 'zero';
    }
    
    if (!words) {
        words = [];
    }
    
    if (number < 0) {
        words.push('minus'); // ✅ Теперь push работает корректно
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number] ?? '';
    } else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)] ?? '';
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    } else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';
    } else if (number < ONE_MILLION) {
        remainder = number % ONE_THOUSAND;
        word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';
    } else if (number < ONE_BILLION) {
        remainder = number % ONE_MILLION;
        word = generateWords(Math.floor(number / ONE_MILLION)) + ' million,';
    } else if (number < ONE_TRILLION) {
        remainder = number % ONE_BILLION;
        word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion,';
    } else if (number < ONE_QUADRILLION) {
        remainder = number % ONE_TRILLION;
        word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';
    } else if (number <= MAX) {
        remainder = number % ONE_QUADRILLION;
        word = generateWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion,';
    }
    
    words.push(word); // ✅ И здесь push работает
    return generateWords(remainder, words);
}

// ✅ Исправлено: Экспорт находится на своем месте
export default toWords;