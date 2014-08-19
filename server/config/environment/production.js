'use strict';

// Production specific configuration
module.exports = {
	// Server IP
	ip: 	process.env.OPENSHIFT_NODEJS_IP ||
				process.env.IP ||
				void 0,

	// Server port
	port: process.env.OPENSHIFT_NODEJS_PORT ||
				process.env.PORT ||
				8080
};
