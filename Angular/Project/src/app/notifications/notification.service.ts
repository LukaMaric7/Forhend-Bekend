// import the packages  
import { Injectable, EventEmitter } from '@angular/core';
import { LSE } from "app/localStorageEnum.model";

// declare the global variables  
declare var $: any;  

@Injectable()  
export class NotificationService {  
    // Declare the variables  
    private proxy: any;  
    private proxyName: string = 'notifications';  
    private connection: any;  

    // create the Event Emitter  
    public notificationReceived: EventEmitter < string >; 
    public notificationReceived2: EventEmitter < string >;   
    public connectionEstablished: EventEmitter < Boolean >;  
    public connectionExists: Boolean;  
   
    constructor() {  
        // Constructor initialization  
        this.connectionEstablished = new EventEmitter < Boolean > ();  
        this.notificationReceived = new EventEmitter < string > (); 
        this.notificationReceived2 = new EventEmitter < string > (); 

        this.connectionExists = false;  
        // create hub connection  
        this.connection = $.hubConnection("http://localhost:54042/");  
        // create new proxy as name already given in top  
        this.proxy = this.connection.createHubProxy(this.proxyName);  
        // register on server events  
        this.registerOnNotApprovedNotification();
        this.registerOnNewAccommodationNotification();

        // call the connecion start method to start the connection to send and receive events. 
        this.startConnection(); 
        
    }  
    // method to hit from client  
    public sendHello() {  
        // server side hub method using proxy.invoke with method name pass as param  
        this.proxy.invoke('Hello');  
    }  
    // check in the browser console for either signalr connected or not  
    public startConnection(): void {  
        this.connection.start().done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);  

            this.proxy.invoke('AddToGroup', localStorage.getItem(LSE.Id.toString()), localStorage.getItem(LSE.Role.toString()));
            this.connectionEstablished.emit(true);  
            this.connectionExists = true;  
        }).fail((error: any) => {  
            console.log('Could not connect ' + error);  
            this.connectionEstablished.emit(false);  
        });  
    }  

    public registerOnNotApprovedNotification(): void {  
        
        this.proxy.on('notApprovedAccommodationNotification', (data: string) => {  
            console.log('not approved accommodation: ' + data);  
            this.notificationReceived.emit(data);  
        }); 
    }  

    public registerOnNewAccommodationNotification(): void {  
        
        this.proxy.on('newAddommodationAddedNotification', (data: string) => {  
            console.log('received notification: ' + data);  
            this.notificationReceived2.emit(data);  
        }); 
    }
}  