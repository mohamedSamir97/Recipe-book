import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    constructor( private dataStorageService:DataStorageService,private authService :AuthService ){}
//    @Output() featureSelected = new EventEmitter<string>();
//     onSelect(feature:string){
//         this.featureSelected.emit(feature);
//     }
isAuthenticated=false;
private subscription:Subscription;
ngOnInit(): void {
    this.subscription=this.authService.user.subscribe(user =>{
    this.isAuthenticated= !user? false:true;
    //this.isAuthenticated = !!user;
    console.log(!user);
    console.log(!!user);
    });
}
onSaveData(){
    this.dataStorageService.storeRecipes();
}

onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
}
onLogout(){
    this.authService.logout();
}

ngOnDestroy(): void {
    this.subscription.unsubscribe();
}
}