import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,i=0,pc=0,st=0;
const n=p.length,done=x=>({o:o.slice(0,l),c:x});
for(;;){
if(st===1e6)return done(10);
if(pc<0||pc>=n)return done(9);
const op=p[pc];
if(!(op<8||(op>15&&op<35&&op!=31)||(op>47&&op<53)||op==64||op==65||(op>79&&op<84)))return done(5);
const im=op==1?1:op==2?4:op>47&&op<52?2:0;
const po=op==7?3:op==5||op==6||op==65||(op>15&&op<35&&op!=23&&op!=27)?2:op<3||op==48||op==51||op==52||op==82?0:1;
const pu=op==6||op==7?3:op==4||op==5?2:op==0||op==3||(op>47&&op<53)||op==65||(op>79&&op!=82)?0:1;
if(pc+im>=n)return done(9);
st++;
const nx=pc+1+im;
if(s<po)return done(2);
if(s-po+pu>256)return done(3);
pc=nx;
if(op>15&&op<35&&op!=23&&op!=27){
const b=D[s-1],a=D[s-2];
let r;
if(op===16)r=a+b|0;
else if(op===17)r=a-b|0;
else if(op===18)r=Math.imul(a,b);
else if(op===19){if(!b)return done(4);r=a===-2147483648&&b===-1?a:a/b|0;}
else if(op===20){if(!b)return done(4);r=b===-1?0:a%b|0;}
else if(op===21){if(!b)return done(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
else if(op===22){if(!b)return done(4);r=(a>>>0)%(b>>>0)|0;}
else if(op===24)r=a&b;
else if(op===25)r=a|b;
else if(op===26)r=a^b;
else if(op===28)r=a<<(b&31);
else if(op===29)r=a>>(b&31);
else if(op===30)r=a>>>(b&31)|0;
else if(op===32)r=a===b?1:0;
else if(op===33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;
}else switch(op){
case 0:return done(0);
case 1:D[s++]=(p[nx-1]<<24)>>24;break;
case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const rel=(p[nx-2]|p[nx-1]<<8)<<16>>16;
let t=1;
if(op!==48){const v=D[--s];t=op===49?v===0:v!==0;}
if(t)pc=nx+rel;
break;
}
case 51:
if(c===64)return done(7);
C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
case 52:
if(!c)return done(8);
pc=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255)return done(6);D[s-1]=M[a];break;}
case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>255)return done(6);s-=2;M[a]=v;break;}
case 80:{const t=String(D[s-1]);if(l+t.length>65536)return done(11);s--;for(let k=0;k<t.length;k++)o[l++]=t.charCodeAt(k);break;}
case 81:
if(l+1>65536)return done(11);
o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return done(D[--s]&255);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const r=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),r.o);
writeFileSync(join(O,id,'exit.txt'),r.c+'\n');
}
