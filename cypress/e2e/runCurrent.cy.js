const fetchMock = require('../mocks/fetch');
const oneMeal = require('../mocks/oneMeal');
const oneDrink = require('../mocks/oneDrink');
const { getId } = require('../utils/getId');

afterEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

describe('31 - Redirecione a pessoa usuária caso o botão \"Start Recipe\" seja clicado, a rota deve mudar para a tela de receita em progresso', () => {
  it('Redireciona para tela de receita da comida em progresso', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/meals/52771/in-progress'));
  });

  it('Redireciona para tela de receita da bebida em progresso', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="start-recipe-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks/178319/in-progress'));
  });
});
describe('32 - Implemente um botão de compartilhar e um de favoritar a receita', () => {
  it('Verifica se os botões estão disponíveis na tela de detalhes de uma comida', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="share-btn"]').should('exist');
    cy.get('[data-testid="favorite-btn"]').should('exist');
  });

  it('Verifica se os botões estão disponíveis na tela de detalhes de uma bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="share-btn"]').should('exist');
    cy.get('[data-testid="favorite-btn"]').should('exist');
  });
});

describe('33 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link da receita dentro do app deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer', () => {
  it('Verifica a mensagem "Link copied!" e se o link da receita da comida foi copiado para o clipboard', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;

        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });

    cy.get('[data-testid="share-btn"]').click();
    cy.contains('Link copied!');
    cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/meals/52771`);
  });

  it('Verifica a mensagem "Link copied!" e se o link da receita da bebida foi copiado para o clipboard', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
        
        cy.stub(win.navigator.clipboard, 'writeText').resolves('URL').as('clipboard');
      },
    });

    cy.get('[data-testid="share-btn"]').click();
    cy.contains('Link copied!');
    cy.get('@clipboard').should('be.calledWithExactly', `http://localhost:3000/drinks/178319`);
  });
});

describe('34 - Salve as receitas favoritas no `localStorage` na chave `favoriteRecipes`', () => {
  it('Verifica se após favoritar receita de uma comida, ela é salva corretamente no localStorage', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]').click().then(() => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const expectedFavoriteRecipes = [
        {
          id: '52771',
          type: 'meal',
          nationality: 'Italian',
          category: 'Vegetarian',
          alcoholicOrNot: '',
          name: 'Spicy Arrabiata Penne',
          image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        },
      ];

      expect(favoriteRecipes).to.deep.eq(expectedFavoriteRecipes);
    });
  });

  it('Verifica se após favoritar receita de uma bebida, ela é salva corretamente no localStorage', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]').click().then(() => {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const expectedFavoriteRecipes = [
        {
          id: '178319',
          type: 'drink',
          nationality: '',
          category: 'Cocktail',
          alcoholicOrNot:  'Alcoholic',
          name: 'Aquamarine',
          image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        },
      ];

      expect(favoriteRecipes).to.deep.eq(expectedFavoriteRecipes);
    });
  });
});

describe('35 - Implemente o ícone do coração (favorito) de modo que: deve vir preenchido caso a receita esteja favoritada e \"despreenchido\" caso contrário', () => {
  it('Verifica se a comida favoritada vem com o coração preenchido', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "52771",
          "type": "meal",
          "nationality": "Italian",
          "category": "Vegetarian",
          "alcoholicOrNot": "",
          "name": "Spicy Arrabiata Penne",
          "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('Verifica se a comida não favoritada vem com o coração "despreenchido"', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('Verifica se a bebida favoritada vem com o coração preenchido', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "178319",
          "type": "drink",
          "nationality": "",
          "category": "Cocktail",
          "alcoholicOrNot": "Alcoholic",
          "name": "Aquamarine",
          "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('Verifica se a bebida não favoritada vem com o coração "despreenchido"', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });
});

describe('36 - Implemente a lógica no botão de favoritar. Caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para \"despreenchido\" e vice-versa', () => {
  it('Favorita a comida', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('Desfavorita a comida', () => {
    cy.visit('http://localhost:3000/meals/52771', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "52771",
          "type": "meal",
          "nationality": "Italian",
          "category": "Vegetarian",
          "alcoholicOrNot": "",
          "name": "Spicy Arrabiata Penne",
          "image": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('Favorita a bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');
  });

  it('Desfavorita a bebida', () => {
    cy.visit('http://localhost:3000/drinks/178319', {
      onBeforeLoad(win) {
        const favoriteRecipes = [{
          "id": "178319",
          "type": "drink",
          "category": "Cocktail",
          "alcoholicOrNot": "Alcoholic",
          "name": "Aquamarine",
          "image": "https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg",
        }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'blackHeartIcon');

    cy.get('[data-testid="favorite-btn"]').click();

    cy.get('[data-testid="favorite-btn"]')
      .should('have.attr', 'src')
      .should('include', 'whiteHeartIcon');
  });

  it('Verifica a cobertura de 90% da Tela de Detalhes da Receita', () => {
    cy.task('getCoverage', getId()).its('RecipeDetails.functions.pct', { timeout: 0 }).should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('RecipeDetails.lines.pct', { timeout: 0 }).should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('RecipeDetails.branches.pct', { timeout: 0 }).should('be.gte', 90.00);
  });
});
