/*
let [x=1]=[undefined]

console.log(x)


function f(){
	console.log('aaa');
}

let[x=f()]=[1];

console.log(x)

let{foo:baz}={foo:'aaa',bar:'bbb'}


console.log(baz);
console.log(foo);

let foo;
let{foo}={foo:1}

let foo;
({foo}={foo:1})

let obj={
	p:[
		'hello',
		{y:'world'}
	]
};

let{p:[x,{y}]}=obj;

console.log(x+' '+y)

let obj={};
let arr=[];
({foo:obj.prop,bar:arr[0]}={foo:123,bar:true});

console.log(obj);
console.log(arr);

var {x:y=3}={}
console.log(y)

let{log,sin,cos}=Math;
console.log(Math)
console.log(log);

const[a,b,c,d,e]='hello';
console.log(a+b+c+d+e)
let{length:len}='hello';
console.log(len)

let{toString:s}=123;
console.log(s===Number.prototype.toString)

console.log([[1,2],[3,4]].map(([a,b])=>a+b));
console.log([[1,2],[3,4]].map((a,b)=>a+b));

function move({x=0,y=0}={}){
	return[x,y]
}

move()

let x=1;
let y=2;
[x,y]=[y,x];
console.log(x+' '+y)


function example(){
	return [1,2,3,4]
}

let[a,b,c]=example()
console.log(a+' '+b+' '+c)

function example2(){
	return{
		foo:1,
		bar:2
	}
}
let{foo,bar}=example2();
console.log(foo+' '+bar)


var map=new Map();
map.set('first','hello');
map.set('second','world');

// for(let [key,value] of map){
// 	console.log(key+' '+value);
// }
console.log(map)


for(let [abc] of map){
	console.log(abc)
}

for(let[,value] of map){
	console.log(value)
}

'\u0061'


let s='𠮷'

console.log(s.length)
console.log(s.charAt(0))
console.log(s.charAt(1))
console.log(s.codePointAt(0))

console.log(String.fromCodePoint(0x20bb7))

let s='hello world!';

console.log(s.startsWith('hello'))
console.log(s.endsWith('!'))
console.log(s.includes('o'))
console.log('x'.padStart(5,'ab'))
console.log('x'.padEnd(3,'aba'))

console.log('1'.padStart(10,0))
console.log('12'.padStart(10,'YYYY-MM-DD'))

let name='bob', time='today';

console.log(`<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim())
*/

let str='return '+'`hello ${name}`';
let func=new Function('name',str);
console.log(func('jack'))




























