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

    this.activeActionIndex = -1;
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

  undo() {
    const previousAction = this.actions[this.activeActionIndex - 1];
    if (!previousAction) return;

    const { backlogItems, todaysList } = previousAction;
    this.backlogItems = backlogItems;
    this.todaysList = todaysList;
    this.activeActionIndex = this.activeActionIndex - 1;
  }

  redo() {
    const newActiveIndex = this.activeActionIndex + 1;
    const newAction = this.actions[newActiveIndex];
    if (!newAction) return;

    const { backlogItems, todaysList } = newAction;
    this.backlogItems = backlogItems;
    this.todaysList = todaysList;
    this.activeActionIndex = newActiveIndex;
  }

  getBacklogItemList() {
    return this.backlogItems;
  }
  getTodaysList() {
    return this.todaysList;
  }
}
