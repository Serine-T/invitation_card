class StorageManager {
  static setItem = (key: string, data: any) => {
    try {
      const serializedState = JSON.stringify(data);

      localStorage.setItem(key, serializedState);
    } catch {
      // ignore write errors
    }
  };

  static getItem = (key: string) => {
    try {
      const serializedState = localStorage.getItem(key);

      if (serializedState === null) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return JSON.parse(serializedState);
    } catch (err) {
      // ignore write errors
    }
  };

  static removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  static clearItems = () => {
    localStorage.clear();
  };
}

export default StorageManager;
