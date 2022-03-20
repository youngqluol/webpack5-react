import { makeAutoObservable } from 'mobx';

class PageData {
  constructor() {
    makeAutoObservable(this);
  }

  title = '';

  changeTitle = (newTitle: string) => {
    this.title = newTitle;
    return this.title;
  };
}
const pageDataStore = new PageData();
export { pageDataStore };
