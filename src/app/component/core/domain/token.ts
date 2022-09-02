import { Iusername } from "./username";

export interface Token {
    access_token: string;
    user: Iusername;
}