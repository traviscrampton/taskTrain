export class ItemManager {
  constructor(backlogItemsList) {
    this.backlogItems = backlogItemsList;
    this.todaysList = [];

    this.actions = [
      {
        backlogItems: backlogItemsList,
        todaysList: []
      }
    ];

    this.activeActionIndex = 0;
  }

  updateActiveActionIndex(index) {
    this.activeActionIndex = index;
  }

  addToActionLog() {
    const newAction = Object.assign(
      {},
      { backlogItems: this.backlogItems, todaysList: this.todaysList }
    );

    this.actions = [...this.actions, newAction];
  }

  add(element) {
    if (!this.backlogItems.includes(element)) return;
    
    const index = this.backlogItems.indexOf(element);
    const backlogItem = this.backlogItems[index];
    this.todaysList = this.addToTodaysList(backlogItem);
    this.backlogItems = this.removeAtIndex(this.backlogItems, index);
    this.addToActionLog();
    this.updateActiveActionIndex(this.actions.length - 1);
  }

  insertAtIndex(list, element, index) {
    return [...list.slice(0, index), element, ...list.slice(index)];
  }

  addToTodaysList(element) {
    return [...this.todaysList, element];
  }

  removeAtIndex(list, index) {
    return [...list.slice(0, index), ...list.slice(index + 1, list.length)];
  }

  traverseActionsArray(direction) {
    const newActionIndex = this.activeActionIndex + direction;
    const desiredAction = this.actions[newActionIndex];
    if (!desiredAction) return;

    const { backlogItems, todaysList } = desiredAction;
    this.backlogItems = backlogItems;
    this.todaysList = todaysList;
    this.activeActionIndex = newActionIndex;
  }

  undo() {
    this.traverseActionsArray(-1);
  }

  redo() {
    this.traverseActionsArray(1);
  }

  getBacklogItemList() {
    return this.backlogItems;
  }

  getTodaysList() {
    return this.todaysList;
  }
}
