// UNITÉ                  MONTANT
// _____________          _________________
// Penny	                $0.01(PENNY)
// Nickel	                $0.05(NICKEL)
// Dime	                  $0.1(DIME)
// Quarter	              $0.25(QUARTER)
// Dollar	                $1(ONE)
// Cinq Dollars	          $5(FIVE)
// Dix Dollars	          $10(TEN)
// Vingt Dollars	        $20(TWENTY)
// Cent Dollars         	$100(ONE HUNDRED)

// price : prix à payer
// cash : montant que donne le client
// cid : tableau à 2 dimensions avec l'argent disponible dans la caisse

// Retourner {status: "INSUFFICIENT_FUNDS", change: []} si il n'y a pas
// assez d'argent dans la caisse ou si on ne peut pas rendre pile la monnaie.

// Retourner {status: "CLOSED", change: [...]} si la monnaie dispo est égale
// à la monnaie à rendre (la caisse est vide ensuite du coup). Change doit alors
// contenir tout le tableau cid.

// Retourner {status: "OPEN", change: [...]} avec la monnaie à rendre, classé
// du plus gros montant au plus petit.

// Dans les 2 derniers cas "change" contient un tableau avec la monnaie rendue
// sur le modèle de cid.

function checkCashRegister(price, cash, cid) {
  const money = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  let change = cash - price;

  const totalCaisseValue = () => {
    let total = 0;
    for (let i = 0; i < cid.length; i++) {
      total += cid[i][1];
    }
    return total;
  };

  const totalCaisse = totalCaisseValue();

  if (change === totalCaisse) {
    return { status: "CLOSED", change: cid };
  }

  let changeArray = [];

  for (let i = money.length - 1; i >= 0; i--) {
    const coinName = money[i][0];
    const coinValue = money[i][1];
    const availableCoins = cid[i][1];
    let coinCount = Math.floor(availableCoins / coinValue);
    let coinToReturn = 0;

    while (change >= coinValue && coinCount > 0) {
      change -= coinValue;
      change = change.toFixed(2);
      coinCount--;
      coinToReturn++;
    }

    if (coinToReturn > 0) {
      changeArray.push([coinName, coinValue * coinToReturn]);
    }
  }

  if (change > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  const totalChangeValue = changeArray.reduce((acc, item) => acc + item[1], 0);

  if (totalChangeValue === totalCaisse) {
    return { status: "CLOSED", change: cid };
  }

  return { status: "OPEN", change: changeArray };
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]),
  "doit être égal à",
  { status: "OPEN", change: [["QUARTER", 0.5]] }
);
console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]),
  "doit être égal à",
  {
    status: "OPEN",
    change: [
      ["TWENTY", 60],
      ["TEN", 20],
      ["FIVE", 15],
      ["ONE", 1],
      ["QUARTER", 0.5],
      ["DIME", 0.2],
      ["PENNY", 0.04]
    ]
  }
);
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ]),
  "doit être égal à",
  { status: "INSUFFICIENT_FUNDS", change: [] }
);
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ]),
  "doit être égal à",
  { status: "INSUFFICIENT_FUNDS", change: [] }
);
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
  ]),
  "doit être égal à",
  {
    status: "CLOSED",
    change: [
      ["PENNY", 0.5],
      ["NICKEL", 0],
      ["DIME", 0],
      ["QUARTER", 0],
      ["ONE", 0],
      ["FIVE", 0],
      ["TEN", 0],
      ["TWENTY", 0],
      ["ONE HUNDRED", 0]
    ]
  }
);

export default checkCashRegister;
