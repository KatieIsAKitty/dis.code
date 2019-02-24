// our argument parsing Regex
// requires a space to be padded to the end of the string to capture all arguments
// first group is a double quoted argument
// second group is a single quoted argument
// third group is a non-quoted argument (this has to be the last group)
const arg_parser_regex = /(?:"(.+?)" |'(.+?)' |(.+?) )/;

module.exports = function(cmd_prefix, input) {
	
	// check whether our input is a command...
	// firstly check whether the user prefixed their command with the command prefix
	// secondly check whether the user hasn't just typed the command prefix
	
	if (input.startsWith(cmd_prefix) && input.trimRight() !== cmd_prefix) {
		// initialise our arguments list
		let args = [];
		
		// extract the command + args from the input
		let cmd = input.substr(cmd_prefix.length);
		
		// find the first space in the input
		let first_space = cmd.indexOf(" ");
		// if there's no space then there's no arguments,
		// so we can just return our command and its empty arguments
		if (first_space === -1) return {cmd, args};
		
		// extract the arguments out of our command
		let unparsed_args = cmd.substr(first_space + 1) + " ";
		// start a while loop to iterate through our Regex matches
		while (true) {
			// execute our Regex
			let exec = arg_parser_regex.exec(unparsed_args);
			// if there's no matches left, we've parsed every argument
			// so we can break out of the loop
			if (!exec) break;
			
			// extract the argument from our three matched Regex groups
			// third group is most common (no quotations)
			// first group is 2nd most common (double quotes)
			// second group is least common (single quotes)
			args.push(exec[3] || exec[1] || exec[2]);
			
			// remove the parsed argument from our unparsed arguments
			unparsed_args = unparsed_args.substr(exec[0].length);
		}
		
		// return the command and its arguments
		return {
			cmd: cmd.substr(0, first_space),
			args
		};
	}
	
	// not a command
	return false;
	
};
