let n = 8;
let number = 1;
let myArr = Array(n);
for(let i=0; i<n; i++){
  myArr[i] = [];
}
let y_start = 0;
let x_start = 0;
while(n>2){

  for(let y=y_start; y<n; y++){
    myArr[x_start][y]=number++;

    if(y===n-1){
      for(let x=x_start+1; x<n; x++){
        myArr[x][y] = number++;

        if(x===n-1){
          for(let y=n-2; y>=y_start; y--){
            myArr[x][y] = number++;

            if(y===y_start){
              for(let x=n-2; x>x_start; x--){
                myArr[x][y]= number++;

              }
            }
          }
        }

      }
    }

  }

  y_start++;
  x_start++;
  n--;

}
console.log(myArr);
