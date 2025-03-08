import { LocalStorageService } from "src/app/shared/service/local-storage.service";

export let protocol = 'https://'
let baseURL = "http://localhost:8080"
const hostname = new LocalStorageService().getToken('backendHostname');

export const environment = {
  production: false,
  apiUrl: hostname ? (hostname.includes(protocol) ? hostname : baseURL) : baseURL
};