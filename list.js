var vm = new Vue({
    el:'#app',
    data:{
        todos:[
        ],
        edTodo:"",
        state:'',
        currentTodo:""
    },
    methods:{
        reset(){
            this.currentTodo='';
        },
        changeTitle(todo){
            this.currentTodo =todo;
        },
        remove(todo){
            this.todos = this.todos.filter(function (item) {
                return todo != item;
            })
        },
        addTodo(){
            this.todos.push({title:this.edTodo,isChecked:false});
            this.edTodo ='';
        }
    },
    computed:{
        cloneTodo(){
            if(this.state == 'complete'){
                return this.todos;
            }
            if(this.state =='finish'){
                return this.todos.filter(function (item) {
                    return item.isChecked;
                })
            }else {
                return this.todos.filter(function (item) {
                    return !item.isChecked;
                })
            }
        },
        total(){
            return this.todos.filter(function (item) {
                return !item.isChecked;
            }).length;
        }
    },
    watch:{
        todos:{
            handler(){//必须写这个函数名
                localStorage.setItem('todos',JSON.stringify(this.todos));
            },
            deep:true
        }
    },
    directives:{
      focus(ele,val){
          if(val.value){
              ele.focus();
          }
      }
    },
    mounted(){
      this.todos = JSON.parse(localStorage.getItem('todos'))||[];
    }
});
var listener = function () {
    vm.state = window.location.hash.slice(1);
};
listener();
window.addEventListener('hashchange',listener,false);