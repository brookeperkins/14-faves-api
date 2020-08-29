require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  const margarita = {
    strdrink: 'Whitecap Margarita',
    strglass: 'Cocktail glass'
  };

  let token;

  beforeAll(async done => {
    execSync('npm run setup-db');

    client.connect();

    const signInData = await fakeRequest(app)
      .post('/auth/signup')
      .send({
        email: 'jon@user.com',
        password: '1234'
      });

    token = signInData.body.token;

    return done();
  });

  afterAll(done => {
    return client.end(done);
  });

  test('returns search results from cocktail api', async(done) => {
    const expectation =
    {
      "drinks": [
        {
          "idDrink": "11007",
          "strDrink": "Margarita",
          "strDrinkAlternate": null,
          "strDrinkES": null,
          "strDrinkDE": null,
          "strDrinkFR": null,
          "strDrinkZH-HANS": null,
          "strDrinkZH-HANT": null,
          "strTags": "IBA,ContemporaryClassic",
          "strVideo": null,
          "strCategory": "Ordinary Drink",
          "strIBA": "Contemporary Classics",
          "strAlcoholic": "Alcoholic",
          "strGlass": "Cocktail glass",
          "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
          "strInstructionsES": null,
          "strInstructionsDE": "Reiben Sie den Rand des Glases mit der Limettenscheibe, damit das Salz daran haftet. Achten Sie darauf, dass nur der äußere Rand angefeuchtet wird und streuen Sie das Salz darauf. Das Salz sollte sich auf den Lippen des Genießers befinden und niemals in den Cocktail einmischen. Die anderen Zutaten mit Eis schütteln und vorsichtig in das Glas geben.",
          "strInstructionsFR": null,
          "strInstructionsZH-HANS": null,
          "strInstructionsZH-HANT": null,
          "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
          "strIngredient1": "Tequila",
          "strIngredient2": "Triple sec",
          "strIngredient3": "Lime juice",
          "strIngredient4": "Salt",
          "strIngredient5": null,
          "strIngredient6": null,
          "strIngredient7": null,
          "strIngredient8": null,
          "strIngredient9": null,
          "strIngredient10": null,
          "strIngredient11": null,
          "strIngredient12": null,
          "strIngredient13": null,
          "strIngredient14": null,
          "strIngredient15": null,
          "strMeasure1": "1 1/2 oz ",
          "strMeasure2": "1/2 oz ",
          "strMeasure3": "1 oz ",
          "strMeasure4": null,
          "strMeasure5": null,
          "strMeasure6": null,
          "strMeasure7": null,
          "strMeasure8": null,
          "strMeasure9": null,
          "strMeasure10": null,
          "strMeasure11": null,
          "strMeasure12": null,
          "strMeasure13": null,
          "strMeasure14": null,
          "strMeasure15": null,
          "strCreativeCommonsConfirmed": "Yes",
          "dateModified": "2015-08-18 14:42:59"
        },
        {
          "idDrink": "11118",
          "strDrink": "Blue Margarita",
          "strDrinkAlternate": null,
          "strDrinkES": null,
          "strDrinkDE": null,
          "strDrinkFR": null,
          "strDrinkZH-HANS": null,
          "strDrinkZH-HANT": null,
          "strTags": null,
          "strVideo": null,
          "strCategory": "Ordinary Drink",
          "strIBA": null,
          "strAlcoholic": "Alcoholic",
          "strGlass": "Cocktail glass",
          "strInstructions": "Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.",
          "strInstructionsES": null,
          "strInstructionsDE": "Den Rand des Cocktailglases mit Limettensaft einreiben. Den Rand in grobes Salz tauchen. Tequila, blauen Curacao und Limettensaft mit Eis schütteln, in das mit Salz umhüllte Glas abseihen und servieren.",
          "strInstructionsFR": null,
          "strInstructionsZH-HANS": null,
          "strInstructionsZH-HANT": null,
          "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/bry4qh1582751040.jpg",
          "strIngredient1": "Tequila",
          "strIngredient2": "Blue Curacao",
          "strIngredient3": "Lime juice",
          "strIngredient4": "Salt",
          "strIngredient5": null,
          "strIngredient6": null,
          "strIngredient7": null,
          "strIngredient8": null,
          "strIngredient9": null,
          "strIngredient10": null,
          "strIngredient11": null,
          "strIngredient12": null,
          "strIngredient13": null,
          "strIngredient14": null,
          "strIngredient15": null,
          "strMeasure1": "1 1/2 oz ",
          "strMeasure2": "1 oz ",
          "strMeasure3": "1 oz ",
          "strMeasure4": "Coarse ",
          "strMeasure5": null,
          "strMeasure6": null,
          "strMeasure7": null,
          "strMeasure8": null,
          "strMeasure9": null,
          "strMeasure10": null,
          "strMeasure11": null,
          "strMeasure12": null,
          "strMeasure13": null,
          "strMeasure14": null,
          "strMeasure15": null,
          "strCreativeCommonsConfirmed": "Yes",
          "dateModified": "2015-08-18 14:51:53"
        },
        {
          "idDrink": "17216",
          "strDrink": "Tommy's Margarita",
          "strDrinkAlternate": null,
          "strDrinkES": null,
          "strDrinkDE": null,
          "strDrinkFR": null,
          "strDrinkZH-HANS": null,
          "strDrinkZH-HANT": null,
          "strTags": "IBA,NewEra",
          "strVideo": null,
          "strCategory": "Ordinary Drink",
          "strIBA": "New Era Drinks",
          "strAlcoholic": "Alcoholic",
          "strGlass": "Old-Fashioned glass",
          "strInstructions": "Shake and strain into a chilled cocktail glass.",
          "strInstructionsES": null,
          "strInstructionsDE": "Schütteln und in ein gekühltes Cocktailglas abseihen.",
          "strInstructionsFR": null,
          "strInstructionsZH-HANS": null,
          "strInstructionsZH-HANT": null,
          "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/loezxn1504373874.jpg",
          "strIngredient1": "Tequila",
          "strIngredient2": "Lime Juice",
          "strIngredient3": "Agave syrup",
          "strIngredient4": null,
          "strIngredient5": null,
          "strIngredient6": null,
          "strIngredient7": null,
          "strIngredient8": null,
          "strIngredient9": null,
          "strIngredient10": null,
          "strIngredient11": null,
          "strIngredient12": null,
          "strIngredient13": null,
          "strIngredient14": null,
          "strIngredient15": null,
          "strMeasure1": "4.5 cl",
          "strMeasure2": "1.5 cl",
          "strMeasure3": "2 spoons",
          "strMeasure4": null,
          "strMeasure5": null,
          "strMeasure6": null,
          "strMeasure7": null,
          "strMeasure8": null,
          "strMeasure9": null,
          "strMeasure10": null,
          "strMeasure11": null,
          "strMeasure12": null,
          "strMeasure13": null,
          "strMeasure14": null,
          "strMeasure15": null,
          "strCreativeCommonsConfirmed": "No",
          "dateModified": "2017-09-02 18:37:54"
        },
        {
          "idDrink": "16158",
          "strDrink": "Whitecap Margarita",
          "strDrinkAlternate": null,
          "strDrinkES": null,
          "strDrinkDE": null,
          "strDrinkFR": null,
          "strDrinkZH-HANS": null,
          "strDrinkZH-HANT": null,
          "strTags": null,
          "strVideo": null,
          "strCategory": "Other/Unknown",
          "strIBA": null,
          "strAlcoholic": "Alcoholic",
          "strGlass": "Margarita/Coupette glass",
          "strInstructions": "Place all ingredients in a blender and blend until smooth. This makes one drink.",
          "strInstructionsES": null,
          "strInstructionsDE": "Alle Zutaten in einen Mixer geben und mischen.",
          "strInstructionsFR": null,
          "strInstructionsZH-HANS": null,
          "strInstructionsZH-HANT": null,
          "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/srpxxp1441209622.jpg",
          "strIngredient1": "Ice",
          "strIngredient2": "Tequila",
          "strIngredient3": "Cream of coconut",
          "strIngredient4": "Lime juice",
          "strIngredient5": null,
          "strIngredient6": null,
          "strIngredient7": null,
          "strIngredient8": null,
          "strIngredient9": null,
          "strIngredient10": null,
          "strIngredient11": null,
          "strIngredient12": null,
          "strIngredient13": null,
          "strIngredient14": null,
          "strIngredient15": null,
          "strMeasure1": "1 cup ",
          "strMeasure2": "2 oz ",
          "strMeasure3": "1/4 cup ",
          "strMeasure4": "3 tblsp fresh ",
          "strMeasure5": null,
          "strMeasure6": null,
          "strMeasure7": null,
          "strMeasure8": null,
          "strMeasure9": null,
          "strMeasure10": null,
          "strMeasure11": null,
          "strMeasure12": null,
          "strMeasure13": null,
          "strMeasure14": null,
          "strMeasure15": null,
          "strCreativeCommonsConfirmed": "No",
          "dateModified": "2015-09-02 17:00:22"
        },
        {
          "idDrink": "12322",
          "strDrink": "Strawberry Margarita",
          "strDrinkAlternate": null,
          "strDrinkES": null,
          "strDrinkDE": null,
          "strDrinkFR": null,
          "strDrinkZH-HANS": null,
          "strDrinkZH-HANT": null,
          "strTags": null,
          "strVideo": null,
          "strCategory": "Ordinary Drink",
          "strIBA": null,
          "strAlcoholic": "Alcoholic",
          "strGlass": "Cocktail glass",
          "strInstructions": "Rub rim of cocktail glass with lemon juice and dip rim in salt. Shake schnapps, tequila, triple sec, lemon juice, and strawberries with ice, strain into the salt-rimmed glass, and serve.",
          "strInstructionsES": null,
          "strInstructionsDE": "Cocktailglasrand mit Zitronensaft und Tauchrand in Salz wenden. Schnaps, Tequila, Triple-Sec, Zitronensaft und Erdbeeren mit Eis schütteln, in das salzige Glas sieben und servieren.",
          "strInstructionsFR": null,
          "strInstructionsZH-HANS": null,
          "strInstructionsZH-HANT": null,
          "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/tqyrpw1439905311.jpg",
          "strIngredient1": "Strawberry schnapps",
          "strIngredient2": "Tequila",
          "strIngredient3": "Triple sec",
          "strIngredient4": "Lemon juice",
          "strIngredient5": "Strawberries",
          "strIngredient6": "Salt",
          "strIngredient7": null,
          "strIngredient8": null,
          "strIngredient9": null,
          "strIngredient10": null,
          "strIngredient11": null,
          "strIngredient12": null,
          "strIngredient13": null,
          "strIngredient14": null,
          "strIngredient15": null,
          "strMeasure1": "1/2 oz ",
          "strMeasure2": "1 oz ",
          "strMeasure3": "1/2 oz ",
          "strMeasure4": "1 oz ",
          "strMeasure5": "1 oz ",
          "strMeasure6": null,
          "strMeasure7": null,
          "strMeasure8": null,
          "strMeasure9": null,
          "strMeasure10": null,
          "strMeasure11": null,
          "strMeasure12": null,
          "strMeasure13": null,
          "strMeasure14": null,
          "strMeasure15": null,
          "strCreativeCommonsConfirmed": "No",
          "dateModified": "2015-08-18 14:41:51"
        }
      ]
    }

    const data = await fakeRequest(app)
      .get('/search?s=margarita')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

    done();
  });

  test('creates a new favorite on POST', async(done) => {
    const expectation = {
      ...margarita,
      id: 5,
      user_id: 2
    };

    const data = await fakeRequest(app)
      .post('/api/favorites')
      .set('Authorization', token)
      .send(margarita)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

    done();
  });

  test('gets all favorites for a user on GET', async(done) => {
    const expectation = [{
      ...margarita,
      id: 5,
      user_id: 2
    }];

    const data = await fakeRequest(app)
      .get('/api/favorites')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

    done();
  });

  test('deletes a favorite on DELETE', async(done) => {
    const expectation = [];

    await fakeRequest(app)
      .delete('/api/favorites/5')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    const data = await fakeRequest(app)
      .get('/api/favorites')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

    done();
  });

});
