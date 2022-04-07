import { makeAutoObservable, action, runInAction } from 'mobx';
import { sleep } from '@src/utils';

class Count {
  constructor() {
    makeAutoObservable(this, {
      increment: action,
    });
  }

  counter = 0;

  increment = () => {
    this.counter++;
  };

  async testAsync() {
    await sleep(2000);
    // 异步状态更新需放在runInAction
    runInAction(() => {
      this.counter += 1;
    });
  }
}
const counterStore = new Count();
export { counterStore };
