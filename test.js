import { ItemManager } from "./index";

describe("Take Home Test", () => {
  describe("add functionality", () => {
    it("properly adds to todays and removes from the backlog", () => {
      const backlog = ["a", "b"];
      const manager = new ItemManager(backlog);

      manager.add("a");
      const todaysList = manager.getTodaysList();
      const updatedBackLog = manager.getBacklogItemList();

      expect(todaysList).toHaveLength(1);
      expect(updatedBackLog).toHaveLength(1);
      expect(todaysList[0]).toEqual("a");
      expect(updatedBackLog[0]).toEqual("b");
    });

    it("doesnt add if it doesn't exist in the backlog", () => {
      const backlog = ["a", "b"];
      const manager = new ItemManager(backlog);

      manager.add("z");
      const todaysList = manager.getTodaysList();
      const updatedBackLog = manager.getBacklogItemList();

      expect(todaysList).toHaveLength(0);
      expect(updatedBackLog).toHaveLength(2);
      expect(updatedBackLog[0]).toEqual("a");
      expect(updatedBackLog[1]).toEqual("b");
    });
  });

  describe("undo", () => {
    it("works with a single undo", () => {
      const initialBacklog = ["a", "b", "c"];
      const manager = new ItemManager(initialBacklog);

      manager.add("a");
      manager.add("b");
      manager.undo();
      const todaysList = manager.getTodaysList();
      const updatedBackLog = manager.getBacklogItemList();

      expect(todaysList).toHaveLength(1);
      expect(updatedBackLog).toHaveLength(2);
      expect(todaysList[0]).toEqual("a");
      expect(updatedBackLog[0]).toEqual("b");
    });

    it("commits double undo", () => {
      const initialBacklog = ["a", "b", "c"];
      const manager = new ItemManager(initialBacklog);

      manager.add("a");
      manager.add("b");
      manager.undo();
      manager.undo();
      const todaysList = manager.getTodaysList();
      const updatedBackLog = manager.getBacklogItemList();

      expect(todaysList).toHaveLength(0);
      expect(updatedBackLog).toHaveLength(3);
      expect(updatedBackLog[0]).toEqual("a");
      expect(updatedBackLog[1]).toEqual("b");
      expect(updatedBackLog[2]).toEqual("c");
    });

    it("doesnt change if no undos have been called", () => {
      const initialBacklog = ["a", "b", "c"];
      const manager = new ItemManager(initialBacklog);

      manager.add("a");
      manager.add("b");
      manager.redo();

      const todaysList = manager.getTodaysList();
      const updatedBackLog = manager.getBacklogItemList();

      expect(todaysList).toHaveLength(2);
      expect(updatedBackLog).toHaveLength(1);
    });
  });

  describe("redo functionality", () => {
    it("redos once", () => {
      const initialBacklog = ["a", "b", "c"];
      const manager = new ItemManager(initialBacklog);

      manager.add("a");
      manager.add("b");
      manager.undo();
      manager.redo();

      const todaysList = manager.getTodaysList();
      const updatedBacklog = manager.getBacklogItemList();
      //   console.log("todaysList", todaysList, "updatedBacklog", updatedBacklog);

      expect(todaysList).toHaveLength(2);
      expect(updatedBacklog).toHaveLength(1);
      expect(todaysList[0]).toEqual("a");
      expect(todaysList[1]).toEqual("b");
      expect(updatedBacklog[0]).toEqual("c");
    });
  });

  describe("final output", () => {
    let initialBacklogList;
    let manager;

    beforeEach(() => {
      initialBacklogList = ["a", "g", "b", "z", "e"];
      manager = new ItemManager(initialBacklogList);
      manager.add("b");
      manager.add("z");
      manager.undo();
      manager.undo();
      manager.redo();
      manager.add("e");
    });

    it("backlog item list has length of 3", () => {
      const backlogItemList = manager.getBacklogItemList();

      expect(backlogItemList).toHaveLength(3);
    });

    it("todays item list has length of 2", () => {
      const todaysItemList = manager.getTodaysList();

      expect(todaysItemList).toHaveLength(2);
    });

    it("backlog item list contains all the proper elements", () => {
      const backlogItemList = manager.getBacklogItemList();

      expect(backlogItemList).toContain("a");
      expect(backlogItemList).toContain("g");
      expect(backlogItemList).toContain("z");
    });

    it("backlog elements are in order", () => {
      const backlogItemList = manager.getBacklogItemList();

      expect(backlogItemList[0]).toEqual("a");
      expect(backlogItemList[1]).toEqual("g");
      expect(backlogItemList[2]).toEqual("z");
    });

    it("todays item list contains all the proper elements", () => {
      const todaysItemList = manager.getTodaysList();

      expect(todaysItemList).toContain("b");
      expect(todaysItemList).toContain("e");
    });

    it("todays log elements are in order", () => {
      const todaysItemList = manager.getTodaysList();
      expect(todaysItemList[0]).toEqual("b");
      expect(todaysItemList[1]).toEqual("e");
    });
  });
});
