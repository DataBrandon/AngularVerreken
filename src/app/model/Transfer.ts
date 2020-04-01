import { User } from './User';

export class Transfer{
    constructor(
        public from:User,
        public to:User,
        public amount:number
    ){}
}