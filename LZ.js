function encode_LZ(data){
    let dict = new Map();
    console.log(data.length);
     let idx = 1;
     let tmp = "";
     let ans = "";
     let i = 0;
     while(i<data.length){
        let tmp = data[i++];
        while(i<data.length && dict.has(tmp)){
            tmp += data[i++];
        }
        dict.set(tmp,idx++);
        if(tmp.length>1){
            let ch = tmp[tmp.length-1];
            tmp = tmp.slice(0,-1);
            ans += dict.get(tmp) + ch;
        }
        else{
            ans += tmp;
        }
        tmp = "";
     }
     console.log(ans.length);
     return ans;

}

console.log(encode_LZM("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."));
