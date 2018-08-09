# range
## 在VUE框架基础上开发的一款简单的滑块插件。  

#### 安装  
npm i range 
#### 自定义参数  

    width: 500 （滑块进度条宽，默认值500）
    height: 10 （滑块进度条高，默认值10）
    dotSize: 26 （圆点尺寸，默认值26）
    max: 100 （最大值，默认值100）
    min: 0 （最小值，默认值0）  
    
#### 接收值方法   

绑定`callback`方法，接收滑块进度值  

           getRangeData(nowVal){
            this.value = nowVal
           }  
           
#### 综合举例  

    <Range v-bind="rangeData" @callback="getRangeData"></Range>
    
      export default {
      name: 'app',
      data () {
        return {
          rangeData:{
            width:300,
            height:400,
            dotSize:50,
            min:50,
            max:1000
          },
          abc:null
        }
      },
      methods: {
          getRangeData(nowVal){
          this.abc = nowVal
      } 
      }
    }
