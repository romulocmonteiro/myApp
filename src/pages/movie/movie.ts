import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Aqui foi incluído o MovieProvider
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the MoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

// Aqui foi incluído o MovieProvider
@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html',
  providers: [
    MovieProvider
  ]
})
export class MoviePage {

  // Primeiro, foram criadas variáveis para substituir os textos fixos dos cards no feed
  // public user_name:string = "Romulo Monteiro";
  // public update_date:any = "18/12/1981";

  // Depois, foi criado um json mock para popular os dados no lugar das variáveis
  // public json_movie = {
  //   avatar: "",
  //   name: "Romulo Monteiro",
  //   date: "18/12/1981",
  //   desc: "Estou criando meu primeiro app, começando por uma página de feed de filmes.",
  //   qtd_likes: 12,
  //   qtd_comments: 12,
  //   time_comment: "10h ago"
  // }

  //
  public tmdb_image_url:string = "https://image.tmdb.org/t/p/w500";
  public list_movies = new Array<any>();
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    // aqui foi incluído manualmente o MovieProvider após ser criado por ionic cli
    private movieProvider: MovieProvider) {
  }

  goToPage(page_module:string) {
    this.navCtrl.push(page_module);
  }

  public go
  ionViewDidLoad() {
    console.log('ionViewDidLoad MoviePage');

    // Aqui foi chamada a funçao criada dentro do provider
    this.movieProvider.getMovies("now_playing").subscribe(
      data  => { 
        // crio um objeto para receber a resposta da chamada http
        // fazendo um cast da estrutura data para any (semelhante a void)
        const response = (data as any);
        // crio um novo objeto contendo apenas o body deste retorno
        // convertendo o seu conteúdo de string para o formato json, por meio de JSON.parse
        const obj_return = JSON.parse(response._body);
        // carrego meu arrey de filmes list_movies com o campo results do JSON de retorno
        this.list_movies = obj_return.results;
        
        // retorno para o console a url da conexão http
        // esta linha de código não é obrigatória
        console.log(data.url);
        // retorno para o console a estrutura do JSON de forma mais legível
        // esta linha de código não é obrigatória
        console.log(obj_return);
      },
      error => { console.log(error); }
    )
  }

}