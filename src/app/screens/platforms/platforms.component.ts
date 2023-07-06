import { Component, OnInit } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css'],
})
export class PlatformsComponent implements OnInit {
  platformsCollection: CollectionReference<DocumentData> | any;
  platforms: any;
  isAdmin: boolean = false;
  constructor(private readonly firestore: Firestore, private userService: UserService) {
    this.platformsCollection = collection(this.firestore, 'plataformas');
  }

  ngOnInit(): void {
    this.getPlatforms();
    this.isAdmin = this.userService.checkUserIsAdmin()
  }

  getPlatforms() {
    return collectionData(this.platformsCollection, {
      idField: 'id',
    }).subscribe((plataformas: any) => {
      this.platforms = plataformas;
    });
  }
}