import { Address } from "./Address";
import { UserCompany } from "./UserCompany";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: UserCompany;
}