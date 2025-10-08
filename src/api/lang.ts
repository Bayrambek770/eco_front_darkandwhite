export type Lang = 'ru' | 'en' | 'uz';

const KEY = 'apiLang';

let current: Lang = (localStorage.getItem(KEY) as Lang) || 'ru';

export function getApiLanguage(): Lang {
  return current;
}

export function setApiLanguage(lang: Lang) {
  current = lang;
  localStorage.setItem(KEY, lang);
}
