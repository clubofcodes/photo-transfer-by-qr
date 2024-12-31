import io from "socket.io-client";
import { GLOBAL_ENV } from "./env";

// Establish a socket connection to the server at the specified URL
export const socket = io(GLOBAL_ENV.BACKEND_BASE_URL);
