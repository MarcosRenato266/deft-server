'use strict';
/**
 * @file Menu events
 * @namespace server.menu
 */

/**
 * Call inventory option.
 * @event callInventoryOption
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} item_id - Item id.
 * @param {string} option - Option id.
 * @fires browserExecute
 */
mp.events.add('callInventoryOption', (player, item_id, option) => {
  let item = yarp.items[item_id]
  item.options[option](player);
  let character = yarp.characters[player.name]
  character.takeItem(item,1);
  player.call('browserExecute', ['inventory', ['updateInventory', character.inventory[item_id]]]);
});

/**
 * Loads bank balance.
 * @event loadBankBalance
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} item_id - Item id.
 * @param {string} option - Option id.
 * @fires browserExecute
 */
mp.events.add('loadBankBalance', (player) => {
  player.call('browserExecute', ['menu', ['showBankOperations', JSON.stringify(yarp.characters[player.name].balance), player.name]]);
});

/**
 * Unbind toggle chat hotkey.
 * @event unbindToggleChat
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 */
mp.events.add('unbindToggleChat', (player) => {
  yarp.hotkeys['ToggleChat'].unbind(player);
});

/**
 * Purchase item for sale.
 * @event purchaseSaleItem
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} locationid - Location id.
 * @param {string} itemid - Item id.
 * @param {string} amount - Amount to purchase.
 * @fires browserExecute
 */
mp.events.add('purchaseSaleItem', (player, locationid, itemid, amount) => {
  let character = yarp.characters[player.name];
  let location = yarp.locations[locationid];
  if (location) {
    let item = yarp.items[itemid];
    let store_item = location.inventory[itemid];
    let total = store_item.price*amount;
    if (character.tryFullPayment(total)){
      store_item.amount -= amount;
      if (item.isWeapon()) {
        character.giveWeapon(yarp.weapons[item.id]);
      } else if (item.isAmmo()) {
        character.giveAmmo(item.id,amount);
      } else {
        character.giveItem(item,amount);
      }
      player.notify('Paid ~r~$'+total);
      player.notify('Received ~g~'+amount+' '+item.name);
      character.save();
    }
  }
});

/**
 * Execute bank operation.
 * @event executeBankOperation
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {number} operation - Operation id.
 * @param {string} amount - Amount of money.
 * @param {string} [target] - Target of transfer.
 * @fires browserExecute
 */
mp.events.add('executeBankOperation', (player, operation, amount, target) => {
  let character = yarp.characters[player.name];  
  if (character) {
    switch (operation) {
      case 1:
      if (character.tryWithdraw(Number(amount))){
        player.call('browserExecute', ['bank', ['bankBack']]);
        player.notify(`Você sacou ~g~$${amount}`);
      } else {
        player.notify('~r~Você não tem dinheiro Suficiente.');
        player.call('browserExecute', ['bank', ['showOperationError', 'Dinheiro Insuficiente']]);
      }
      break;
      case 2:
      if (character.tryDeposit(Number(amount))){
        player.call('browserExecute', ['bank', ['bankBack']]);
        player.notify(`Você depositou ~b~$${amount}`);
      } else {
        player.notify('~r~Você não tem dinheiro Suficiente.');
        player.call('browserExecute', ['bank', ['showOperationError', 'Dinheiro Insuficiente']]);
      }
      break;
      case 3:
      if (character.tryTransfer(target,Number(amount))){
        player.call('browserExecute', ['bank', ['bankBack']]);
        player.notify(`Transferred ~r~$${amount}`);
      } else {
        player.notify('~r~Not enough money in your bank account.');
        player.call('browserExecute', ['bank', ['showOperationError', 'Not enough money.']]);
      }
      break;
    }
  }
});

/**
 *Verify user login.
 * @event verifyLogin
 * @memberof server.menu
 * @param {object} player - The player that called the event.
 * @param {string} password - User password.
 * @fires showCharacterCreationMenu
 * @fires showPlayerCharacters
 * @fires createBrowser
 */
mp.events.add('verifyLogin', (player,password) => {
  let user = yarp.users[player.socialClub];
  if(user == null){
    user = new yarp.User(player.socialClub,password);
  }
  if (user.verifyPassword(password)) {
    user.updateLastLogin(player.ip);
    user.save();
    if(Object.keys(user.characters).length == 0){
      player.call('showCharacterCreationMenu');
    } else {
      player.call('showPlayerCharacters', [JSON.stringify(user.characters)]);
    }
  } else {
    player.call('createBrowser', ['menu', ['package://YARP/ui/html/accountLogin.html']]);
  }
});
