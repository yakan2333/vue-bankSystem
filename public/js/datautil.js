/* 
str 需要处理的字符串
frontLen  保留的前几位
endLen  保留的后几位
char  替换的字符串
*/
handleStr=(str,frontLen,endLen,char)=>{
	let len=str.length-frontLen-endLen
	let midStr=''
	for(let i=0;i<len;i++){
		midStr+=char
	}
	let leftStr=str.substring(0,frontLen)
	let rightStr=str.substring(str.length-endLen)
	let newStr=leftStr+midStr+rightStr
	return newStr;
}
export default {
  handleStr
}