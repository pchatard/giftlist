import labels from "@/labels/fr/labels.json";

const getInitDate = (): Date => {
	const date = new Date();
	date.setDate(date.getDate() + 1);
	const offset = date.getTimezoneOffset();
	return new Date(date.getTime() - offset * 60 * 1000);
};

export const formatInitDate = (): string => {
	return getInitDate().toISOString().split("T")[0];
};

export const validateListTitle = (title: string): string => {
	// Check title is not empty
	if (!title.trim()) {
		return labels.newList.step1.inputs.title.errors.mandatory;
	}

	// Check title is not too long
	if (title.length > 30) {
		return "Trop long";
	}

	// Check title matches regex : Only alphanumeric values + some special characters
	if (!/^[A-zÀ-ú0-9\s:()',]*$/.test(title)) {
		return "Le titre contient des caractères invalides. Caractères spéciaux autorisés : espace,:()'`";
	}

	return "";
};

export const validateListDescription = (description: string): string => {
	// Check title is not too long
	if (description.length > 100) {
		return "La description de la liste est trop longue.";
	}

	// Check title matches regex : Only alphanumeric values + some special characters
	if (!/^[A-zÀ-ú0-9\s:()',]*$/.test(description)) {
		return "La description contient des caractères invalides. Caractères spéciaux autorisés : espace,:()'`";
	}

	return "";
};

export const validateListClosureDate = (closureDate: string): string => {
	const dateIsInPast = new Date(closureDate) <= new Date();
	if (dateIsInPast) {
		return labels.newList.step1.inputs.termDate.errors.pastDate;
	}

	return "";
};
