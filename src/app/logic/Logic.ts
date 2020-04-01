import{Transfer} from '../model/Transfer';
import {User} from '../model/User';
import {Collection} from '../model/Collection';
import { findIndex } from 'rxjs/operators';
import { element } from 'protractor';
import { fromEventPattern } from 'rxjs';

export class Logic{
    constructor(){}

    calculate(users:User[]) : Collection {
        
        var transfers:Transfer[];
        var delta = [];
        var total = 0;
        users.forEach(element => {
            total = total + element.amount;
        });

        const avg = Math.round((total /users.length) * 100) / 100;
        users.forEach(element => {
            delta.push(element.amount-avg);
        });

        let deltaclear:Boolean = false;
        var overflow:number = 0;
        transfers=[];
        console.log(transfers);
        
        while(overflow < 50){
            if(delta.every((val) => val == 0)){
                break;
            }

            let lowest:number = 0;
            let highest:number = 0;
            var ilow;
            var ihigh;

            //find lowest
            delta.forEach(function(value,i){
                if(value < lowest){
                    lowest = value;
                    ilow= i; 
                }
            });

            //find highest
            delta.forEach(function(value,i){
                if(value > highest){
                    highest = value;
                    ihigh= i; 
                }
            });

            if(lowest === 0 || highest == 0){
                break;
            }

            console.log("lowest = "+lowest ," highest = "+highest ," indexlow = "+ilow ,"indexhighest = "+ihigh);
            let from:User = users[ilow];
            let to:User = users[ihigh];
            console.log("lowest person= "+from.name ," highest person= "+ to.name );
            if(from.name == to.name){
                break;
            }
            let item = new Transfer(from,to,highest);
            //console.log("from : " + item.from.name +"  to : " + item.to.name + "amount : " + item.amount  )
            transfers.push(item);
            console.log("after transfer: "+delta);

            //high = 0
            if( Math.abs(Math.round(delta[ilow] * 100) / 100) <= 0.001){
                delta[ilow]= 0;
            }
            else{
                // //low heeft rest
                
                if(highest+lowest > 0){
                    delta[ilow] = 0;
                }
                else{delta[ilow]= lowest+ highest;}

                if(Math.abs(Math.round(delta[ilow] * 1000) / 1000) <= 0.001){
                    delta[ilow] = 0;
                }
                //delta[ilow] = 0;
            }
            console.log("after Low if: "+delta);



            if( Math.abs(Math.round(delta[ihigh] * 1000) / 1000) <= 0.001){
                delta[ihigh]= 0;
            }
            else{
                // delta[ihigh]= highest + lowest;

                if(highest+lowest < 0){
                    delta[ihigh] = 0;
                }
                else{delta[ihigh]= lowest+ highest;}

                
                if(Math.abs(Math.round(delta[ihigh] * 1000) / 1000) <= 0.001){
                    delta[ihigh] = 0;
                }
            }
            // delta[ihigh] = 0;
            console.log("after high if: "+delta);
            

            
            highest = 0;
            lowest = 0;
            //console.log("Status delta clear" + deltaclear);
            overflow++;


            if(delta.every((val) => val == 0)){
                break;
            }
            
        }
        console.log(transfers);
        const collection = new Collection(total,transfers,users);
        return collection;
    }

}