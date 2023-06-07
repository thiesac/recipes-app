import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { callMealsRecipe, callDrinksRecipe } from '../../services/eatApi';

/* Após o login (page 'Login.js'), o usuário será redirecionado para a page 'Meals.js'.
Nela, pelo que vi, haverá o component 'Header.js', no qual haverá a opção de buscar, isto é,
o component 'SearchBar.js'. Ao ser clicado, deve aparecer as opções de pesquisa.
OBS: Criar estado Global (useContext) para as API?
A fim de evitar confusão:
APIs:       callMealsRecipe e callDrinksRecipe
useContext: apiMeals (estado), setApiMeals (método) e apiDrinks (estado), setApiDrinks (método)
Documentos criados/modificados:
Criados:
- SearchBar.js + pasta 'components';
eatAPI + pasta 'services'
Modificados:
- MyProvider.js */

function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const magicNumber = 12;
  const isMealSearch = history.location.pathname === '/meals'; // variável booleana que indica se a busca é para refeições (true) ou para bebidas (false).

  /* O 'searchType' representa o tipo de busca que está sendo realizado.
  Ele pode ter três possíveis valores: 'ingredient' (ingrediente), 'name' (nome) ou 'first-letter' (primeira letra). */
  // O 'searchInput' representa o valor da entrada de busca

  const onSearchClick = async () => {
    if (searchType === 'first-letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    if (history.location.pathname === '/meals') {
      const eatenApiMeal = await callMealsRecipe(searchInput, searchType);
      setSearchResults(eatenApiMeal);
      if (!eatenApiMeal || eatenApiMeal.length === 0) {
        return global
          .alert('Sorry, we haven\'t found any recipes for these filters.');
      }

      const finalIndex = 12; // define o índice final que será utilizado no slice. No caso, 12 primeiros elementos do array 'eatenApiMeal'
      const slicedMealData = eatenApiMeal.slice(0, finalIndex);

      setSearchResults(slicedMealData);

      if (eatenApiMeal.length === 1) {
        history.push(`/meals/${eatenApiMeal[0].idMeal}`);
      }
    }
    if (history.location.pathname === '/drinks') {
      const eatenApiDrink = await callDrinksRecipe(searchInput, searchType);
      setSearchResults(eatenApiDrink);
      if (!eatenApiDrink || eatenApiDrink.length === 0) {
        return global
          .alert('Sorry, we haven\'t found any recipes for these filters.');
      }

      const finalIndex = 12;
      const slicedDrinkData = eatenApiDrink.slice(0, finalIndex);

      setSearchResults(slicedDrinkData);

      if (eatenApiDrink.length === 1) {
        history.push(`/drinks/${eatenApiDrink[0].idDrink}`);
      }
    }
  };

  /* Explicação dos trechos mais complexos da função:
     Linha 34 a 44:   obs: linhas 45 a 56 são iguais às citadas, muda de 'meals' para 'drinks'
  Ela verifica se a localização atual (location.pathname) no histórico de navegação é '/meals'. Se essa condição for verdadeira,
  significa que estamos na página de refeições. Nessa linha, a função 'callMealsRecipe' é chamada com os parâmetros 'searchInput' e 'searchType',
  fazendo uma chamada à API para buscar as receitas de acordo com os filtros fornecidos.

  O resultado dessa chamada é armazenado na variável 'eatenApiMeal'. Em seguida, o método 'setApiMeals' é chamado para atualizar
  o estado (useContext) 'apiMeals' (array de objetos)  com o valor retornado pela chamada da API.
  Por fim, Se o comprimento de 'eatenApiMeal' for igual a 1 '(eatenApiMeal.length === 1)', significa que foi encontrada apenas uma receita.
  Nesse caso, é feito um redirecionamento para a página dessa receita específica, utilizando o 'history.push' para atualizar a URL.

  Sendo mais preciso.... o trecho de código /meals/${eatenApiMeal[0].idMeal} está construindo uma URL para redirecionar o usuário para a página de uma receita específica.
  'eatenApiMeal' é uma variável que armazena o resultado da chamada da API de busca de receitas. Ela é um array que contém as receitas encontradas com base nos filtros especificados.
  Ao acessar eatenApiMeal[0], estamos obtendo o primeiro elemento do array de receitas. Isso é feito porque a condição eatenApiMeal.length === 1 verifica se há apenas uma receita encontrada.
  Portanto, se há somente uma receita, queremos redirecionar o usuário para a página dessa receita.
  'idMeal', por sua vez, epresenta o ID único da receita. Logo, 'eatenApiMeal[0].idMeal' está acessando o ID da primeira receita no array. */

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        name={ searchInput }
        placeholder="Search Recipe"
        onChange={ ({ target: { value } }) => setSearchInput(value) }
      />
      <div>
        <label>
          <input
            type="radio"
            name={ searchType }
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          Ingredients
        </label>
        <label>
          <input
            type="radio"
            name={ searchType }
            data-testid="name-search-radio"
            value="name"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            name={ searchType }
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ ({ target: { value } }) => setSearchType(value) }
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ onSearchClick } // Ao clicar, executará as condições da função 'onSearchClick'
      >
        Search
      </button>
      <div>
        {searchResults.slice(0, magicNumber).map((recipe, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe[isMealSearch ? 'strMealThumb' : 'strDrinkThumb'] }
              alt={ recipe[isMealSearch ? 'strMeal' : 'strDrink'] }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {recipe[isMealSearch ? 'strMeal' : 'strDrink']}

            </p>
          </div>
        ))}
      </div>

    </form>
  );
}

/* Quando o componente 'SearchBar' é renderizado, o código dentro dele é executado para criar a estrutura do formulário de busca e a exibição dos resultados.
Logo, o 'map' será executado toda vez que o componente é renderizado.
'recipe' é o objeto que representa uma receita retornada da API. Ele contém propriedades como strMealThumb (imagem da refeição) e strDrinkThumb (imagem da bebida).
Se 'isMealSearch' for true, ou seja, a busca é para refeições, então a expressão será avaliada como recipe['strMealThumb'], o que acessa a propriedade 'strMealThumb' do objeto recipe.
Se 'isMealSearch' for false, ou seja, a busca é para bebidas, então a expressão será avaliada como recipe['strDrinkThumb'], o que acessa a propriedade 'strDrinkThumb' do objeto recipe.
O mesmo vale para as outras propriedades. */

export default SearchBar;
