let arr1 = [12,56,4,98,43,765,87]
let arr2 = [12,544,4,4,43,765,87]
let count = 0
arr1.forEach((element,index)=>{
    if(element != arr2[index]){
        count++
    }
})

console.log(count);