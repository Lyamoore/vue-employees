//
export function getFirstLetter(name) {
	return name?.charAt ? `${name.charAt(0)}.` : ""
}

export function formatFio(fio) {
	const [lastName, firstName, middleName] = fio.split(" ")
	return `${lastName} ${(getFirstLetter(firstName))} ${(getFirstLetter(middleName))}`.trim()
}
