const checkString = (text, length) => text.length <= length;

checkString('проверяемая строка', 20);
checkString('проверяемая строка', 18);
checkString('проверяемая строка', 10);

const isPalindrome = (text) => {
  const normalized = text.replaceAll(' ', '').toLowerCase();
  const reversed = normalized.split('').reverse().join('');
  return normalized === reversed;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

const extractNumber = (text) => {
  const string = text.toString();
  let digits = '';

  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      digits += string[i];
    }
  }

  return parseInt(digits, 10);
};

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');
extractNumber(2023);
