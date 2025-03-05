export function ruleRequired(value) {
	return !!value || "Требуется заполнить поле"
}

export function rulePassSer(value) {
	return /^\d{4}$/.test(value) || "Серия паспорта должна состоять из 4 цифр."
}
export function rulePassNo(value) {
	return /^\d{6}$/.test(value) || "Номер паспорта должен состоять из 6 цифр."
}

export function ruleFio(value) {
	const fioPattern = /^[\u0410-\u042F\u0401\u0430-\u044F\u0451]+(?:-[\u0410-\u042F\u0401\u0430-\u044F\u0451]+)?\s[\u0410-\u042F\u0401\u0430-\u044F\u0451]+(?:\s[\u0410-\u042F\u0401\u0430-\u044F\u0451]*)?$/
	// const fioPattern = /^[А-ЯЁа-яё]+(?:-[А-ЯЁа-яё]+)?\s[А-ЯЁа-яё]+(?:\s[А-ЯЁа-яё]*)?$/
	return fioPattern.test(value) || "ФИО должно быть на кириллице и соответствовать стандартному формату."
}
