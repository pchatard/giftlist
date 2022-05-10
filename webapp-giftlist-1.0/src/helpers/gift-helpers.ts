export const validateGiftTitle = (title: string): string => {
	// Check title is not empty
	if (!title.trim()) {
		return "Ce champ est obligatoire.";
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

export const validateGiftPrice = (price: number): string => {
	if (price < 0) {
		return "Le prix ne peut pas être négatif.";
	}

	return "";
};

export const validateGiftLinkURL = (linkURL: string): string => {
	const urlRegex =
		/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
	if (!urlRegex.test(linkURL)) {
		return "Veuillez rentrer un lien valide.";
	}

	return "";
};
export const validateGiftBrand = (brand: string): string => {
	if (brand.length > 30) {
		return "Trop long";
	}

	return "";
};
export const validateGiftSize = (size: string): string => {
	if (size.length > 10) {
		return "Trop long";
	}

	return "";
};
export const validateGiftColor = (color: string): string => {
	if (color.length > 15) {
		return "Trop long";
	}

	return "";
};
export const validateGiftComments = (comments: string): string => {
	if (comments.length > 200) {
		return "Trop long";
	}

	return "";
};
