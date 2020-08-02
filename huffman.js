

class HuffmanCoder{

    stringify(node){
        if(typeof(node[1])==="string"){
            return '\''+node[1];//using ' to tackle if node[1] == 0 or 1.
        }
        //inorder traversal
        return '0' + this.stringify(node[1][0]) + '1' + this.stringify(node[1][1]);
    }

    display(node, modify, index=1){
        if(modify){
            node = ['',node];
            if(node[1].length===1)
                node[1] = node[1][0];
        }

        if(typeof(node[1])==="string"){
            return String(index) + " = " + node[1];
        }

        let left = this.display(node[1][0], modify, index*2);
        let right = this.display(node[1][1], modify, index*2+1);
        let res = String(index*2)+" <= "+index+" => "+String(index*2+1);
        return res + '\n' + left + '\n' + right;
    }

    destringify(data){
        let node = [];
        if(data[this.ind]==='\''){
            this.ind++;
            console.log("making node for " + data[this.ind]);
            node.push(data[this.ind]);
            this.ind++;
            return node;
        }
        //if(data[this.ind]==='0')
            this.ind++;
        let left = this.destringify(data);
        node.push(left);
        //if(data[this.ind]==='1')
            this.ind++;
        let right = this.destringify(data);
        node.push(right);

        return node;
    }

    getMappings(node, path){
        //leaf node
        if(typeof(node[1])==="string"){
            this.mappings[node[1]] = path;
            console.log("Mapping for " + node[1] + " is " + path);
            return;
        }

        this.getMappings(node[1][0], path+"0");//left
        this.getMappings(node[1][1], path+"1");//right
    }

    encode(data){

        this.heap = new BinaryHeap();

        const mp = new Map();
        //get frequency characterwise
        for(let i=0;i<data.length;i++){
            if(data[i] in mp){
                mp[data[i]] = mp[data[i]] + 1;
            } else{
                mp[data[i]] = 1;
            }
        }
        //using maxheap as minheap
        for(const key in mp){
            this.heap.insert([-mp[key], key]);
        }
        //creating huffman tree
        while(this.heap.size() > 1){
            const node1 = this.heap.extractMax();
            const node2 = this.heap.extractMax();

            const node = [node1[0]+node2[0],[node1,node2]];
            this.heap.insert(node);
        }
        //final value is root for Huffman tree
        const huffman_encoder = this.heap.extractMax();
        //creating character to huffman code mapping
        this.mappings = {};
        this.getMappings(huffman_encoder, "");
        //making a binary_string using mappings
        let binary_string = "";
        for(let i=0;i<data.length;i++) {
            binary_string = binary_string + this.mappings[data[i]];
        }
        // padding
        let rem = (8 - binary_string.length%8)%8;
        let padding = "";
        for(let i=0;i<rem;i++)
            padding = padding + "0";
        binary_string = binary_string + padding;
        // converting binary string to compressed/encoded format
        let result = "";
        for(let i=0;i<binary_string.length;i+=8){
            let num = 0;
            for(let j=0;j<8;j++){
                num = num*2 + (binary_string[i+j]-'0');
            }
            result = result + String.fromCharCode(num);//extracting ASCII char for num
        }
        //final_res is tree + padding_length + result_string
        let final_res = this.stringify(huffman_encoder) + '<>' + rem + '<>' + result;
        console.log("Final Result is :" + final_res)
        let info = "Compression Ratio : " + data.length/final_res.length;
        info = "Compression complete and file sent for download" + '\n' + info;
        return [final_res, this.display(huffman_encoder, false), info];
    }

    decode(data){
        data = data.split('<>');
        console.log("Data is " + data);
     
        this.ind = 0;
        console.log("tree is " + data[0]);
        const huffman_decoder = this.destringify(data[0]);
        const text = data[2];

        let binary_string = "";
        for(let i=0;i<text.length;i++){
            let num = text[i].charCodeAt(0);
            let bin = "";
            for(let j=0;j<8;j++){
                bin = num%2 + bin;
                num = Math.floor(num/2);
            }
            binary_string = binary_string + bin;
        }
        binary_string = binary_string.substring(0,binary_string.length-data[1]);

        console.log(binary_string.length);

        let res = "";
        let node = huffman_decoder;
        for(let i=0;i<binary_string.length;i++){
            if(binary_string[i]==='0'){
                node = node[0];
            } else{
                node = node[1];
            }

            if(typeof(node[0])==="string"){
                res = res + node[0];
                node = huffman_decoder;
            }
        }
        let info = "Decompression complete and file sent for download";
        return [res, this.display(huffman_decoder, true), info];
    }
}