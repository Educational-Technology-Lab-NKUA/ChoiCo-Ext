function setUpCommunication(gameInstance)
{ 
	//create a wiil instance
	try {
		var wiil = Wiil.getInstance();
		onplatform = true;
	} catch (e) {
		if (e instanceof ReferenceError) {
			onplatform = false;
		}
	}
	if(onplatform){
	var choicoWidget = gameInstance;
	//register this component as [malt] with wiil
	var componentID = "choico";
	wiil.setComponentID(componentID);

	//register host page as peer with name [host]
	var peer = window.parent.name;
	wiil.register(false, peer, parent);

	//set up my public interface  Name: type, events: events names
	var events = {'elements': [{'name': 'playmode', 'events': ['point_selection', 'change_layer','point_row','game_over', 'player_performance', 'player_activity', 'switch_mode']}, {'name': 'map_editor', 'events': ['new_point', 'modify_point', 'modify_graphics' , 'design_activity']}, {'name': 'database', 'events': ['change_value','add_field', 'database_activity']}, {'name': 'codespace', 'events': ['initial_settings_activity', 'gameplay_rules_activity' , 'end_rules_activity', 'debug']}]}

	//set up public interface
	wiil.pushFunction
	(
		"logData",
		function(data)
		{
			console.log(data);
		}
	);

	wiil.pushFunction
	(
		"setState", // state is a JSON object that holds all the info needed to initialise or reset the state of the malt instance
		function(activity)
		{
			if (jQuery.isEmptyObject(activity.initial_state)){
				// newGame.resetState();
			}
			else {
			var res = choicoWidget.setState(activity.initial_state);
		}
		}
	);

	wiil.pushFunction
	(
		"getState", // the function returns the state of the malt instance as a JSON object
		function()
		{
			return choicoWidget.getState();
		}
	);

	wiil.pushFunction
	(
		"getMetaData", 	// the function returns a JSON object that shows the types of elements we can have in a malt instance and the events they can be associated with
		function()
		{
			return events;
		}
	);

	sendState = function()
	{   //sends the current state to host. It is called when the button "save online" is clicked by the teacher
		console.log ("Sending state:")
		var currentState = choicoWidget.getState();			//get state from choico game (plamyMode.js)
		var message = wiil.createMessage(null, "saveState", [currentState], null);
		console.log (message);
		wiil.sendMessage(peer, message);
	};

	sendEvent = function(msg)
	{
		//console.log ("Sending event:")
		//console.log (msg)
		var message = wiil.createMessage(null, "logAction", [msg], null);
		wiil.sendMessage(peer, message);
	};
	//Send a message when everything has loaded
	sendReady = function()
	{
		//ask host page to register this component as peer
		var message = wiil.createMessage(null, "register", [true, componentID], null);
		wiil.sendMessage(peer, message);
	};
}
}

