import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon = [];

  constructor(private pokeService: PokemonService) { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadmore = false, event?) {

    if(loadmore){
      this.offset += 25;
    }

    this.pokeService.getPokemon(this.offset).subscribe(res => {
      console.log('result: ', res);
      this.pokemon = [...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }

    });
  }

  onSearchChange(e) {
    let value = e.detail.value;

    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    },
      err => {
        this.pokemon = [];
      });
  }

  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.reload();
      //complete()  signify that the refreshing has completed and to close the refresher
      event.target.complete();
    }, 500);
  }
  ionPull(event) {
    //Emitted while the user is pulling down the content and exposing the refresher.
    
  }
  ionStart(event) {
    //Emitted when the user begins to start pulling down.    
  }
  
  reload() {
    window.location.reload();
  }
}
