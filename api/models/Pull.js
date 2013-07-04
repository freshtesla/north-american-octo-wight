/*---------------------
	:: Pull
	-> model
---------------------*/
module.exports = {

	attributes	: {

		// Simple attribute:
    name: 'STRING',
    pull: 'INTEGER',
    req: {
        type: 'STRING',
        defaultValue: '{ "CR": 2, "QA": 1 }'
    },
    st: {
        typ: 'STRING',
        defaultValue: '{ "CR": 0, "QA": 0 }'
    }

		// Or for more flexibility:
		// phoneNumber: {
		//	type: 'STRING',
		//	defaultValue: '555-555-5555'
		// }
		
	}

};
