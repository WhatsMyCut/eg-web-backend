export const lib = {
	formatTime(date) {
		if(typeof date === 'object'){
			const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
			const yy = date.getFullYear();
			const MM = monthNames[date.getMonth()];
			const dd = date.getDate();
			let hh = date.getHours();
			const tt = hh >= 12 ? 'PM' : 'AM';
			hh = hh === 0 ? 12 : hh;
			hh = hh > 12 ? hh - 12 : hh;
			let mm = date.getMinutes();
			mm = (mm < 10) ? '0' + mm : mm;
			return `${MM} ${dd}, ${yy} - ${hh}:${mm} ${tt}`;
		} else {
			return '';
		}
		
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
