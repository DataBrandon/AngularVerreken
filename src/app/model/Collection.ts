import { User } from './User';
import { Transfer } from './Transfer';

export class Collection{
    constructor(

    public total: number = 0,
    public transfers: Transfer[],
    public users:User[] = []
        
    ){}
        
}