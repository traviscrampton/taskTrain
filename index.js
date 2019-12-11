import { tsThisType } from "@babel/types";

export class ItemManager {
  constructor(backlogItemsList) {
    this.backlogItems = backlogItemsList;
    this.todaysList = [];

    this.actions = [];
    this.activeActionIndex = -1;
  }

  createActionObject(type, from, fromIndex, to, toIndex) {
    return Object.assign({}, { type, from, fromIndex, to, toIndex });
  }

  updateActiveActionIndex(index) {
    this.activeActionIndex = index;
  }

  addToActionLog(newAction) {
    this.actions = [...this.actions, newAction];
  }

  add(element) {
    if (!this.backlogItems.includes(element)) return;

    // handle add between arrays
    const index = this.backlogItems.indexOf(element);
    const backlogItem = this.backlogItems[index];
    this.todaysList = this.insertAtIndex(
      this.todaysList,
      backlogItem,
      this.todaysList.length
    );
    this.backlogItems = this.removeAtIndex(this.backlogItems, index);

    // create actionObject
    const actionObject = this.createActionObject(
      "add",
      this.backlogItems,
      index,
      this.todaysList,
      this.todaysList.length - 1
    );

    this.addToActionLog(actionObject);
    this.updateActiveActionIndex(this.actions.length - 1);
  }

  insertAtIndex(list, element, index) {
    return [...list.slice(0, index), element, ...list.slice(index)];
  }

  addToTodaysList(element) {
    this.todaysList = [...this.todaysList, element];
  }

  removeAtIndex(list, index) {
    return [...list.slice(0, index), ...list.slice(index + 1, list.length)];
  }

  undo() {
    const latestAction = this.actions[this.activeActionIndex];
    if (!latestAction || latestAction.type !== "add") return;

    const { from, fromIndex, to, toIndex } = latestAction;
    const element = to[toIndex];
    this.backlogItems = this.insertAtIndex(from, element, fromIndex);
    this.todaysList = this.removeAtIndex(to, toIndex);
    this.activeActionIndex = this.activeActionIndex - 1;
  }

  redo() {
    const newActiveIndex = this.activeActionIndex + 1;
    const newAction = this.actions[newActiveIndex];
    if (!newAction) return;

    const { from, to } = newAction;
    this.backlogItems = from;
    this.todaysList = to;
    this.activeActionIndex = newActiveIndex;
  }

  getBacklogItemList() {
    return this.backlogItems;
  }
  getTodaysList() {
    return this.todaysList;
  }
}
