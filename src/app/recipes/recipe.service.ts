
import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();
    // private recipes : Recipe[]=[
    //     new Recipe('Tasty Schnitzel',
    //     'A super tasty schnitzel',
    //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('French fries',20)
    //     ]),
    //     new Recipe('Big Fat Burger',
    //     'What else need to say',
    //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',

    //    [
    //        new Ingredient('buns',2),
    //        new Ingredient ('Meat',1)
    //    ])
    //   ];

      /**
       *
       */
      private recipes:Recipe[]=[];
      constructor(private slService:ShoppingListService) {
          
      }
      setRecipes(recipes:Recipe[]){
          this.recipes=recipes;
          this.recipeChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index:number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
            this.slService.addIngredients(ingredients); 
    } 

    addRecipe(recipe:Recipe){
       this.recipes.push(recipe); 
       this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
       this.recipeChanged.next(this.recipes.slice());
 
    }
    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}