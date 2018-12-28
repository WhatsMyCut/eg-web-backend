export const lib = {
	formatTime(date) {
		const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
		let MM = monthNames[date.getMonth()];
		let dd = date.getDate();
		let hh = date.getHours();
		let mm = date.getMinutes();
		mm = (mm < 10) ? '0' + mm : mm;
		return `${MM} ${dd} ${hh}:${mm}`;
	  },
	
	//Helper function to tell whether a value exists in an
	//array or not. This is because IE does not
	//support Array.includes().
	arrayIncludes(array, value) {
		if (Array.isArray(array)) {
		return array.some(arrayValue => {
			return arrayValue === value;
		});
		} else {
		return false;
		}
	},

	trueFalseToYesNo(value){
		return value ? 'Yes' : 'No';
	}
};
