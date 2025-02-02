import { Char } from "./Char";
import { ClueCollection } from "./Clue";
import Grid, { Mode } from "./Grid";

const lines = [
  "BAUDELAIRE",
  "ACTIVATION",
  "R##CENT#GN",
  "R#OT#CEANS",
  "IP#E#EIRE#",
  "CALECONS#V",
  "ANA#ALTERE",
  "DA#KLEENEX",
  "EMOI#E#IVE",
  "RAMPES#CES",
];

const chars = lines.map((line) => line.split("")).flat();

const grid = new Grid(chars as Char[], 10, Mode.Solve);

const definitions = [
  "Poète français",
  "Mise en marche",
  "Unité divisionnaire de l'euro",
  "Guinée",
  "Office de tourisme",
  "Ici même",
  "Institut polytechnique",
  "Irlande gaélique",
  "Sous-vêtements",
  "Cahier de textes",
  "Détérioré",
  "Accord russe",
  "Mouchoir en papier",
  "Émotion soudaine",
  "Bugle",
  "Plans inclinés",
  "Collège",

  "Fermer solidement",
  "Actinium",
  "Pays d'Amérique centrale",
  "Ancien do",
  "Donne le ton",
  "Club marseillais",
  "Exercice littéraire",
  "Monnaie du Laos",
  "Première femme",
  "Durcissement de l'épiderme",
  "Finies en pointe",
  "Préjudice",
  "Deux romain",
  "Poison",
  "Mauvaise humeur",
  "Songe",
  "Affluent du Danube",
  "Contraries",
];

const clues = Object.values(grid.clueCollection.getClues()).map((clue, index) =>
  clue.withClue(definitions[index])
);

export default new Grid(
  chars as Char[],
  10,
  Mode.Solve,
  new ClueCollection(clues)
).clean();
