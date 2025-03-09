import { LocalStorageService } from "src/app/shared/service/local-storage.service";

export let protocol = 'https://'
let baseURL = "http://localhost:8080" //import.meta.env.NG_APP_API_URL
const hostname = new LocalStorageService().getToken('backendHostname');

export const environment = {
  production: true,
  apiUrl: hostname ? (hostname.includes(protocol) ? hostname : baseURL) : baseURL
};