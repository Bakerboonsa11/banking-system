'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
console.log("i am urs");


const display_moveme=function(acc){
  acc.movements.forEach (function(value,index){
  // containerMovements.innerHTML=" ";
  const type =value >0 ?"deposit":"withdrawal";
  const html=`
  <div class="movements__row">
  <div class="movements__type movements__type--${type}"> ${index+1} ${type}</div>
    <div class="movements__value">${value}$</div>
  </div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin',html);
  });
  
};



//  CHENGING THE CONTENT OF THE TOTAL BALANCE

const balance_calculator = function(acc){
  acc.total_balance=acc.movements.reduce(function( accumulator,value){
  return accumulator+value;
 },0)
 
 labelBalance.textContent=`${acc.total_balance} €`;

};
const in_setter1 = function(acc){
  const indisplayer = acc.movements.filter(mov=>mov>0).reduce(( accumulator,mov)=> accumulator+mov,0);
  labelSumIn.textContent=indisplayer;
  const outdisplayer = acc.movements.filter(mov=>mov<=0).reduce(( accumulator,mov)=> accumulator+mov,0);
  labelSumOut.textContent=outdisplayer;
 const rate_displayer = acc.movements.filter(mov=>mov>0).map(mov=>(mov*1.2)/100).reduce((accumulator,mov)=>accumulator+mov,0);
 labelSumInterest.textContent=`${rate_displayer}€`;

};



const rate_calculator = function(){
  
}






// first add event listner to the sibbmit button


let curent_account;

console.log("i am ures");
btnLogin.addEventListener("click",function(e){
  e.preventDefault();
  // console.log("loged in ")
curent_account = accounts.find((acc)=>acc.owner===inputLoginUsername.value);

if(curent_account?.pin=== Number(inputLoginPin.value)){
  labelWelcome.textContent=`WELCOME ${curent_account.owner}`
  // adding a movement 
  display_moveme(curent_account);
  containerApp.style.opacity = 1;
  
  balance_calculator(curent_account);
in_setter1(curent_account);
inputLoginUsername.value=inputLoginPin.value=''
//  removing the in put content

};
});
// THIS FUNCITION IS CREATED FOR THE PURPOSSE OF REDAIBLITY
 function Transcereter(acc){
  display_moveme(acc);
  
  
  balance_calculator(acc);
// in_setter1(curent_account.movements);
 };

btnTransfer.addEventListener("click",function(e){
 e.preventDefault();
 let amount=Number(inputTransferAmount.value);
 let reciver_acc = accounts.find(acc=>acc.owner===inputTransferTo.value);
 curent_account.movements.push(-amount);
 reciver_acc.movements.push(amount);
 
 inputTransferTo.value= inputTransferAmount.value='';

 if(amount<=curent_account.total_balance&&reciver_acc&& reciver_acc!==curent_account ){
    Transcereter(curent_account);
    // Transcereter(reciver_acc);
    // display_moveme(curent_account);
    // balance_calculator(curent_account);
 }
 

})


// EVALUATING THE LOAN PART
btnLoan.addEventListener("click" ,function(e){
  e.preventDefault();

  let ammount_wanna_loan= Number(inputLoanAmount.value);
  if(ammount_wanna_loan>=0 && curent_account.movements.some(mov=> mov >= ammount_wanna_loan*0.1))  {
    curent_account.movements.push(ammount_wanna_loan);
    console.log("current account after it asked for 100 birr loan");
    console.log(curent_account.movements);
    inputLoanAmount.value='';
  
    Transcereter(curent_account);
  }

 

})

//  THIS  PAGE IS ABOUT DEVELOPING THE CLOSE ACCOUNT PART

btnClose.addEventListener("click",function(e){
e.preventDefault();
// let to_be_removed_name = accounts.findIndex(acc=>acc.owner===inputCloseUsername.value

// )
// const to_be_removed_pin = accounts.findIndex(acc=>acc.owner===inputCloseUsername.value

//   )
if(  curent_account.owner===inputCloseUsername.value && 
  curent_account.pin===Number(inputClosePin.value)){

    const index = accounts.findIndex(acc=>acc.owner=== inputCloseUsername.value)
    console.log(curent_account.owner=== inputCloseUsername.value)
    accounts.splice(index,1);
    console.log(`this account is banned ${accounts[index]} abd index is${index}`);
    containerApp.style.opacity=0;
    // here we have implement the welcome class some how to make it real
    labelWelcome.textContent=`Log in to get started`;
    inputCloseUsername.value=inputClosePin.value="";

  };






console.log(`the account only contain ${accounts}`)

})


//BLOW IS PRACTICE


//  THE FLAT AND THE FLATMAP METHOD
// let the_test_account = [1,2,[2,6],[34,87],["jala","tokkumma"]];
// console.log(accounts.map(acc=>acc.movements).flat())
// const looped_array = accounts.map(acc=>acc.movements).flat().reduce((accumulator,value)=>
// accumulator+value
// ,0);


// console.log(`the final end result of the calculation is ${looped_array}`);

// const flatmapcheaker = accounts.flatMap(acc=>acc.movements).reduce((accumulator,value)=>
//  accumulator-value,0
// );
// console.log(flatmapcheaker);

// console.log(`the result of the onject after we multplied by a 0 is this one ${}`)

let myarray =["age","name ","bilisumma"];
let mynuber_array=[1,2,3,4,5,6,78,-17,44,22,89,-5];
console.log(myarray.sort())
console.log(`the converted form of array is this one`)
console.log(mynuber_array.sort());
// TO SOLVE THE MAIN ERROR OF THE FLAT METHOD WHEN WE ARE USING THE ARRAY OF NUMBERS
// clearly in the concept of sort the minus value indicate stay in ur condition 
// while the possotive value indicate change ur state
mynuber_array.sort((x,y)=>{
  if(x >y) return -1;
  if(x<y) return 1;
  return 0 ;
})
console.log(mynuber_array);

