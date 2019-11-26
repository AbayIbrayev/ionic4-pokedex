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

}
