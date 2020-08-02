
//export { BinaryHeap }

class BinaryHeap {

    constructor() {
        this.heap = [];
    }

    insert(value) {
        console.log("inserting " + value[0])
        this.heap.push(value);
        this.bubbleUp();
    }

    size() {
        return this.heap.length;
    }

    empty(){
        return ( this.size()===0 );
    }

    //using iterative approach
    bubbleUp() {
        let index = this.size() - 1;

        while (index > 0) {
            let element = this.heap[index][0]
            let parentIndex = Math.floor((index - 1) / 2)
            //    console.log("PI " + parentIndex)
            let parent = this.heap[parentIndex][0];

            if (parent >= element) break;
            let tmp = this.heap[parentIndex]
            this.heap[parentIndex] = this.heap[index]
            this.heap[index] = tmp;

            index = parentIndex;
        }
    }

    extractMax() {
        const max = this.heap[0];
        let size = this.heap.length-1
        if(size>=0)
            this.heap[0] = this.heap[size]
        this.heap.pop();
        if(!this.empty()) {
           // this.heap[0] = tmp;
            this.sinkDown(0);
        }
        return max;
    }

   

    sinkDown(index) {

        let left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index;
        const length = this.size();

        // console.log(this.heap[left], left, length, this.heap[right], right, length, this.heap[largest]);

        if (left < length && this.heap[left][0] > this.heap[largest][0]) {
            largest = left
        }
        if (right < length && this.heap[right][0] > this.heap[largest][0]) {
            largest = right
        }
        // swap
        if (largest !== index) {
            let tmp = this.heap[largest];
            this.heap[largest] = this.heap[index];
            this.heap[index] = tmp;
            this.sinkDown(largest)
        }
    }
}
//module.exports = BinaryHeap;
/* Heap testing
let heap = new BinaryHeap;
heap.insert([30,"Mayank"])
heap.insert([10,"Devashish"])
heap.insert([13,"Ankit"])
heap.insert([48,"Savya"])
heap.insert([8,"Milind"])
while(!heap.empty()){
    console.log(heap.extractMax());
}
*/
