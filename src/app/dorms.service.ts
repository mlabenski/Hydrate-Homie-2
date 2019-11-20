import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'dorms';
let dorms = [{ "name" : "Northside", "src": "../../assets/photos/dorms/York-College-Northside.jpg", "doorsidedelivery":"true"},
  { "name" : "Country Club", "src": "../../assets/photos/dorms/York-College-CountryClub.jpg", "doorsidedelivery":"true"},
  { "name" : "Spring Garden", "src": "../../assets/photos/dorms/York-College-SpringGarden.jpg", "doorsidedelivery":"true"}, 
  { "name" : "Tyler Run", "src": "../../assets/photos/dorms/York-College-TylerRun.jpg", "doorsidedelivery":"true"},
  { "name" : "Susquehanna", "src": "../../assets/photos/dorms/York-College-Susquehanna.jpg", "doorsidedelivery":"true"}]


@Injectable({
  providedIn: 'root'
})
export class DormsService {

  constructor(public storage: Storage) { }

  getAllDorms() {
    return this.storage.get(STORAGE_KEY);
  }

}
