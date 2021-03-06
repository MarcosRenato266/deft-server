'use strict';
/**
 * Loads the pools on server-side asynchronously.
 */

module.exports = async () => {
  // Loading pools
  try {
    console.log(chalk.hex('#3E3E3E').bold('[LEGACY] ')+'Carregando Pools');
    /**
     * @namespace yarp.blips
     * @extends {yarp.Pool<yarp.Blip>}
     */
    yarp.blips = new yarp.Pool(yarp.Blip);

    /**
     * @namespace yarp.characters
     * @extends {yarp.Pool<yarp.Character>}
     */
    yarp.characters = new yarp.Pool(yarp.Character);

    /**
     * @namespace yarp.checkpoints
     * @extends {yarp.Pool<yarp.Checkpoint>}
     */
    yarp.checkpoints = new yarp.Pool(yarp.Checkpoint);

    /**
     * @namespace yarp.colshapes
     * @extends {yarp.Pool<yarp.Colshape>}
     */
    yarp.colshapes = new yarp.Pool(yarp.Colshape);

    /**
     * @namespace yarp.commands
     * @extends {yarp.Pool<yarp.Command>}
     */
    yarp.commands = new yarp.Pool(yarp.Command);

    /**
     * @namespace yarp.doors
     * @extends {yarp.Pool<yarp.Door>}
     */
    yarp.doors = new yarp.Pool(yarp.Door);

    /**
     * @namespace yarp.events
     * @extends {yarp.Pool<yarp.Event>}
     */
    yarp.events = new yarp.Pool(yarp.Event);

    /**
     * @namespace yarp.groups
     * @extends {yarp.Pool<yarp.Group>}
     */
    yarp.groups = new yarp.Pool(yarp.Group);

    /**
     * @namespace yarp.jobs
     * @extends {yarp.Pool<yarp.Job>}
     */
    yarp.jobs = new yarp.Pool(yarp.Job);

    /**
     * @namespace yarp.hotkeys
     * @extends {yarp.Pool<yarp.Hotkey>}
     */
    yarp.hotkeys = new yarp.Pool(yarp.Hotkey);

    /**
     * @namespace yarp.items
     * @extends {yarp.Pool<yarp.Item>}
     */
    yarp.items = new yarp.Pool(yarp.Item);

    /**
     * @namespace yarp.labels
     * @extends {yarp.Pool<yarp.Label>}
     */
    yarp.labels = new yarp.Pool(yarp.Label);

    /**
     * @namespace yarp.locations
     * @extends {yarp.Pool<yarp.Location>}
     */
    yarp.locations = new yarp.Pool(yarp.Location);

    /**
     * @namespace yarp.markers
     * @extends {yarp.Pool<yarp.Marker>}
     */
    yarp.markers = new yarp.Pool(yarp.Marker);

    /**
     * @namespace yarp.npcs
     * @extends {yarp.Pool<yarp.Npc>}
     */
    yarp.npcs = new yarp.Pool(yarp.Npc);

    /**
     * @namespace yarp.props
     * @extends {yarp.Pool<yarp.Prop>}
     */
    yarp.props = new yarp.Pool(yarp.Prop);

    /**
     * @namespace yarp.transactions
     * @extends {yarp.Pool<yarp.Transaction>}
     */
    yarp.transactions = new yarp.Pool(yarp.Transaction);

    /**
     * @namespace yarp.users
     * @extends {yarp.Pool<yarp.User>}
     */
    yarp.users = new yarp.Pool(yarp.User);

    /**
     * @namespace yarp.variables
     * @extends {yarp.Pool<yarp.Variable>}
     */
    yarp.variables = new yarp.Pool(yarp.Variable);

    /**
     * @namespace yarp.vehicles
     * @extends {yarp.Pool<yarp.Vehicle>}
     */
    yarp.vehicles = new yarp.Pool(yarp.Vehicle);

    /**
     * @namespace yarp.weapons
     * @extends {yarp.Pool<yarp.Weapon>}
     */
    yarp.weapons = new yarp.Pool(yarp.Weapon);

    /**
     * @namespace yarp.realstates
     * @extends {yarp.Pool<yarp.Realstate>}
     */
    yarp.realstates = new yarp.Pool(yarp.Realstate);

    /**
     * @namespace yarp.crimes
     * @extends {yarp.Pool<yarp.Crime>}
     */
    yarp.crimes = new yarp.Pool(yarp.Crime);
      /**
     * @namespace yarp.acesslogs
     * @extends {yarp.Pool<yarp.Acesslog>}
     */
    yarp.acesslogs = new yarp.Pool(yarp.Acesslog);
    /**
* @namespace yarp.garages
* @extends {yarp.Pool<yarp.Garage>}
*/
    yarp.garages = new yarp.Pool(yarp.Garage);

  } catch(err) {
    console.log(chalk.redBright('[LEGACY] ')+'PoolError: '+err.message+'\n'+err.stack);
  }
};
