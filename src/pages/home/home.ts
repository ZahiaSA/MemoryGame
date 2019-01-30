import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private cardDeck = [];
  private numberOfCards = 6;
  private questionMarkUrl = "assets/imgs/question-mark.png";
  private timetoHide = 100;
  private previousCard = null;
  private previousCardIndex;
  private revealingCard = false;

  constructor(public navCtrl: NavController) {
    // appel fonction pour affichage des cartes
    this.generateDeck();
    //appel fonction pour melanger les cartes
    this.shuffleCards();
  }
  //creation fonction qui cré la pile de cartes 
  generateDeck() {
    for (let i = 0; i < this.numberOfCards; i++) {
      this.generateCardPair(i);
    }
  }
  //fonction generer deux cartes 
  generateCardPair(pos) {
    for (let k = 1; k <= 2; k++) {
      this.generateOneCard(pos);
    }
  }
  //fonction generer une seule carte
  generateOneCard(pos) {
    this.cardDeck.push(
      {
        activeImage: this.questionMarkUrl,
        cardImage: "assets/imgs/cards/" + pos + ".png",
        revealed: false
      }
    );
  }
  // fonction melange des cartes
  shuffleCards() {
    // boucle pour chaque indice  
    for (let position in this.cardDeck) {
      //définition d'une position aléatoire
      let randomPosition = Math.floor(Math.random() * this.cardDeck.length);
      //permutation des deux positions  de cartes et pour ca il faut une variable temporaire
      let tmp = this.cardDeck[position];//c'est la position de depart
      this.cardDeck[position] = this.cardDeck[randomPosition];
      // permutation
      this.cardDeck[randomPosition] = tmp;
    }
  }
  // fonction choisir une carte et l'affichier et recuperer sa position
  pickCard(card, pos) {
    // affichage de la carte uniquement si elle n'est pas revelée
    if (!card.revealed && !this.revealingCard) {
      //tester la precedente carte
      if (this.previousCard
        && (this.previousCardIndex != pos)
        && (this.previousCard.cardImage == card.cardImage)) {
        // affichage de deux cartes
        card.activeImage = card.cardImage;
        card.revealCard = true;
        this.previousCard.activeImage = card.cardImage;
        this.previousCard.revealCard = true;

      } else {
        // enregistrement de carte pour plus tard
        this.previousCard = card;
        this.previousCardIndex = pos;
        this.revealCard(card);
      }

    }

  }
  //
  revealCard(card) {

    // affichage de la carte
    card.activeImage = card.cardImage;
    card.revealed = true;
    let questionImage = this.questionMarkUrl;
    this.revealingCard = true;
    //masquage de la carte au bout 1.5 s
    setTimeout(() => {
      card.revealed = false;
      card.activeImage = questionImage
      this.revealingCard = false;
    },
      this.timetoHide
    );



  }
}

