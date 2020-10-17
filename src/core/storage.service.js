class StorageService {
  setStorage(data) {

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);
  }

  clearStorage() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getExpirationDate() {
    return localStorage.getItem('expirationDate');
  }
}

export default StorageService;