import { makeAutoObservable } from 'mobx';

class Count {
  constructor() {
    makeAutoObservable(this);
  }

  counter = 0;

  increment = () => {
    this.counter++;
  };
}
const counterStore = new Count();
export { counterStore };
