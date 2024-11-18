interface ICopyOptions {
  onError?: VoidFunction;
  onSuccess?: VoidFunction;
  onCopy?: VoidFunction;
}

const handleCopySuccess = (options: ICopyOptions) => {
	options.onSuccess?.();
};

const handleCopyError = (options: ICopyOptions) => {
	options.onError?.();
};


function fallbackCopy(text: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const textareaEl = document.createElement('textarea');
		const range = document.createRange();

		textareaEl.value = text;
		textareaEl.style.position = 'fixed'; // Avoid scrolling to bottom
		textareaEl.contentEditable = 'true';

		document.body.appendChild(textareaEl);

		textareaEl.focus();
		textareaEl.select();

		range.selectNodeContents(textareaEl);

		const selection = window.getSelection();
		if (selection) {
			selection.removeAllRanges();
			selection.addRange(range);
		}

		textareaEl.setSelectionRange(0, 999999);

		try {
			const successful = document.execCommand('copy');
			if (successful) {
				resolve(true);
			} else {
				reject(new Error('copy failed'));
			}
		} catch (error) {
			reject(error);
		}

		if (selection) {
			selection.removeAllRanges();
		}

		document.body.removeChild(textareaEl);
	});
}


export const copyTextToClipboard = async (text: string): Promise<boolean> => {
	try {
		if (!navigator.clipboard) {
			throw new Error('Cannot use navigator.clipboard');
		}

		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return fallbackCopy(text);
	}
};

export const copy = async (text: string, options?: ICopyOptions) => {
	if (!options) {
		options = {};
	}

	try {
		const copyResult = await copyTextToClipboard(text);

		if (copyResult) {
			handleCopySuccess(options);
		} else {
			handleCopyError(options);
		}

		options.onCopy?.();
	} catch {
		handleCopyError(options);
	}
};
