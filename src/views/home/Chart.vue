<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图表</el-breadcrumb-item>
	    <el-breadcrumb-item>图表管理</el-breadcrumb-item>
    </el-breadcrumb>
   <el-row :gutter="23" >
      <el-col :span="6" class="data-time">
          <el-row>
            <el-col :span="8" class="text-c">
              <el-radio v-model="type" label="day">日</el-radio>
            </el-col>
            <el-col :span="8" class="text-c">
              <el-radio v-model="type" label="month">月</el-radio>
            </el-col>
            <el-col :span="8" class="text-c">
              <el-radio v-model="type" label="years">年</el-radio>
            </el-col>
          </el-row>
      </el-col>
    </el-row>

    <el-row>
    		<el-col :md="8">
    			<div class="users" @click="getUserCount">
    				<div class="count">
    					{{aboutStatistical.userCount}}
    				</div>
    				<div class="desc">
    					<i class="el-icon-loading"></i>
    					<span>用户总数</span>
    				</div>
    			</div>
    		</el-col>
    		<el-col :md="8">
    			<div class="goods" @click="getGoodsCount">
    				<div class="count">
    					{{aboutStatistical.productCount}}
    				</div>
    				<div class="desc">
    					<i class="el-icon-goods"></i>
    					<span>商品总数</span>
    				</div>
    			</div>
    		</el-col>
    		<el-col :md="8">
    			<div class="oders" @click="getOdersCount">
    				<div class="count">
    					{{aboutStatistical.orderCount}}
    				</div>
    				<div class="desc">
    					<i class="el-icon-tickets"></i>
    					<span>订单总数</span>
    				</div>
    			</div>
    		</el-col>
    	</el-row>


   <!-- 条形|线性统计图 -->
    <el-row :gutter="23">
      <el-col :span="12" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="SCEchart"></div>
        </div>
      </el-col>
      <el-col :span="12" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="SUMEchart"></div>
        </div>
      </el-col>
      <el-col :span="12" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="ClickEchart"></div>
        </div>
      </el-col>
      <el-col :span="12" class="text-c">
        <div class="st-gbox">
          <div class="cavasbox" ref="CountEchart"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 饼形统计图 -->
    <div>
      <el-row :gutter="23">
        <el-col :span="12" class="text-c">
          <div class="paybox">
            <div class="cavasbox" ref="payEchart"></div>
          </div>
        </el-col>
        <el-col :span="12" class="text-c">
          <div class="paybox">
            <div class="cavasbox" ref="payNumEchart"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Chart from 'echarts'
export default {
  name: "welcome",
  data() {
    return {
      aboutStatistical:{
        userCount:1235,
        productCount:659,
        orderCount:9865
      },
      type: 'day',
      //  销售总笔数
      SCEoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '销售总笔数',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [{
          name: '销售总笔数',
          type: 'bar',
          barGap: 0,
          data: [50000, 70000, 80000, 40000, 50000, 30000, 40000, 60000, 50000, 40000, 60000, 40000],
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new Chart.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              color: new Chart.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ]
              )
            }
          }
        }]
      },
      //  销售总金额
      SUMoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '销售总金额',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [{
          name: '销售总金额',
          //   type: 'bar',
          type: 'line',
          barGap: 0,
          data: [50000, 70000, 80000, 40000, 50000, 30000, 40000, 60000, 50000, 40000, 60000, 40000],
          barWidth: 10,
          itemStyle: {
            color: "#108ff9"
          }
        }]
      },
      //  总点击量
      Clickoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '总点击量',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [{
          name: '总点击量',
          type: 'bar',
          barGap: 0,
          data: [50000, 10000, 80000, 30000, 50000, 60000, 40000, 80000, 50000, 20000, 60000, 40000],
          barWidth: 10,
          itemStyle: {
            color: "#48cefd"
          }
        }]
      },
      //  流量收益总金额
      Countoption: {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [{
            name: '流量收益总金额',
            icon: 'rect'
          }],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [{
          name: '流量收益总金额',
          //   type: 'bar',
          type: 'line',
          barGap: 0,
          data: [2000, 5200, 4500, 7500, 2100, 3074, 8500, 4520, 7510, 7510, 1240, 4520],
          barWidth: 10,
          itemStyle: {
            color: "#48cefd"
          }
        }]
      },

      //  支付方式统计
      payoption: {
        backgroundColor:'darkslategray',
        title: {
          text: '支付方式统计(金额)',
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '支付方式统计(金额)',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '支付宝' },
              { value: 300, name: '微信支付' },
              { value: 250, name: '银商二维码' },
              { value: 274, name: '会员' },
              { value: 100, name: 'Pos通' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      },
      payNumoption: {
        backgroundColor: 'darkslategray',
        title: {
          text: '支付方式统计(笔数)',
          left: 10,
          top: 5,
          textStyle: {
            fontSize: 12,
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 100,
          max: 800,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '支付方式统计(笔数)',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: [
              { value: 350, name: '支付宝' },
              { value: 310, name: '银商二维码' },
              { value: 274, name: '会员' },
              { value: 455, name: '微信支付' },
              { value: 100, name: 'Pos通' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      },
    }
  },
  created() {
    var that=this
    this.$axios.get("api/manage/statistic/base_count.do")
    .then(res=>{
    	// console.log(res.data.data)
    	that.aboutStatistical=res.data.data
    })
  },
  // 挂载结束状态(里面是操作)
  mounted() {
    this.getSCE()
    this.getSUM()
    this.getClick()
    this.getCount()
    this.getpay()
    this.getpayNum()
  },
  // 里面的函数只有调用才会执行
  methods: {
    getUserCount(){
    	this.$router.push('../user/Users')
    },
    getGoodsCount(){
    	this.$router.push('../basic/goods/Goods')
    },
    getOdersCount(){
    	this.$router.push('../order/Orders')
    },
    // 交易总笔数
    getSCE() {
      this.chart = Chart.init(this.$refs.SCEchart)
      this.chart.setOption(this.SCEoption)
    },
    // 交易总金额
    getSUM() {
      this.chart = Chart.init(this.$refs.SUMEchart)
      this.chart.setOption(this.SUMoption)
    },
    // 总点击量
    getClick() {
      this.chart = Chart.init(this.$refs.ClickEchart)
      this.chart.setOption(this.Clickoption)
    },
    // 流量收益总金额
    getCount() {
      this.chart = Chart.init(this.$refs.CountEchart)
      this.chart.setOption(this.Countoption)
    },
    // 支付方式统计
    getpay() {
      this.chart = Chart.init(this.$refs.payEchart)
      this.chart.setOption(this.payoption)
    },
    // 支付方式统计
    getpayNum() {
      this.chart = Chart.init(this.$refs.payNumEchart)
      this.chart.setOption(this.payNumoption)
    }

  }
};
</script>
<style>
.data-time{
    margin: 10px 0 25px 1250px;
}
.text-c {
  text-align: center;
}
.users{
		height: 160px;
		background-color: #f0ad4e;
		color: #fff;
		padding: 20px 0;
		box-sizing: border-box;
		text-align: center;
    cursor: pointer;
}
.count{
		font-size: 50px;
		height: 80px;
		line-height: 80px;
}
.goods{
		height: 160px;
		background-color: #5cb85c;
		color: #fff;
		padding: 20px 0;
		box-sizing: border-box;
		text-align: center;
    cursor: pointer;
}
.oders{
		height: 160px;
		background-color: #4cb1cf;
		color: #fff;
		padding: 20px 0;
		box-sizing: border-box;
		text-align: center;
    cursor: pointer;
}
.desc{
  font-size: 18px;
  margin-top: 10px;
}
.st-gbox {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 5px;
  height: 30vh;
  box-sizing: border-box;
  padding: 10px;
}
.cavasbox {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.paybox {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 20px;
  height: 32vh;
}
.el-main{
  background: #F3F3F3;
}
.dbt{
		min-height: 1px;
		padding-right: 15px;
		padding-left: 15px;
}
.bt{
		padding-bottom: 5px;
		margin: 10px 0 20px;
		border-bottom: 1px solid transparent;
		font-size: 36px;
		font-weight: 500;
}
.el-col{
		padding: 0 15px;
}
.el-col div:hover{
  color:#2B2E33;
  transition: all 1s
}
</style>
