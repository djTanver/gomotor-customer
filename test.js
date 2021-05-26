const testFunc = () => {
    const c = 50;
    console.log(a,b,c);  // 10 20 50
    var b = 20;
    let a = 10;
}

let testObj = {
    name:"nandeesh",
    show:function(){
        console.log(this.name);
    },
}

testObj.show();


// Call back

const callBack = (a) =>{
    console.log(a);
}

const takecallBack = (cb) =>{
    cb();
}

takecallBack(callBack);

const createPromise = new Promise((resolve,reject)=>{
    
    if(true){
        resolve("yes");
    }
    else{
        reject("error");
    }

})