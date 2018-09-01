const Utilities = {
	currentDate() { return moment().format('DD/MMMM/YYYY') },
	currentYear() { return moment().format('YYYY') },
	currentMonth() { return moment().format('MMMM') },
	sum(array) {
		if(!array || !array.length) return;
		return array.reduce((a, b) => a + b)
	},
	initialPayloadState() {
		return {
			items: [],
			expenses: [],
			temp: null,
			savedYear: null,
			savedMonth: null,
			currentMonth: '',
			currentYear: '',
			popin:  {
				isActiv: false,
				message: '',
				type: ''
			}
		}
	},
	initialAuthState() {
		return {
			user: null,
			loading: false,
			error: null
		}
	}
}

export default Utilities