const state = {
  data: {
    tasks: [],
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("akerman-state");
    this.setState(JSON.parse(localData));
  },
  getState() {
    return this.data;
  },
  getEnabledTasks() {
    const currentState = this.getState();
    return currentState.tasks.filter((t) => !t.deleted);
  },
  addTask(title) {
    const currentState = this.getState();
    currentState.tasks.push({
      id: Math.trunc(Math.random() * 99999),
      title,
      completed: false,
    });
    this.setState(currentState);
  },
  changeItemState(id, value) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found.completed = value;
    this.setState(currentState);
  },
  deleteItem(id, deleted){
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found.deleted = deleted;
    this.setState(currentState);
  },
  setState(newState) {
    this.data = newState;
    for (const call of this.listeners) {
      call(newState);
    }
    localStorage.setItem("akerman-state", JSON.stringify(newState));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
export { state };
