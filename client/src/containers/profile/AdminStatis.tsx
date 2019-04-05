import React from 'react'
import { Input, Button, Icon, Upload, Popover, Modal } from 'antd'
import styles from '../friends/FriendsIndex.module.scss'
import { serverOrigin } from '../../utils/API'
import ForwardActCard from '../friends/components/ForwardActCard'
import ImagesContainer from '../friends/components/ImagesContainer';
// import TextArea from 'antd/lib/input/TextArea';

const MAX_IMAGE = 9
const TextArea = Input.TextArea
class AdminStatis extends React.Component {
  private myInput: React.RefObject<any>
  private uploader: React.RefObject<HTMLInputElement>
  constructor(props) {
    super(props)
    this.myInput = React.createRef()
    this.uploader = React.createRef()
  }
  state = {
    imageList: [{
      uid: '-1',
      name: 'xxx',
      status: 'done',
      url: ''
    }] as Array<any>,
    previewImage: '',
    previewVisible: false,
    showImageContainer: false,
  }
  handlePublish = () => {
    // const value = this.myInput.current.value
    (window as any).input = this.myInput.current;
    let value = this.myInput.current.textAreaRef.value
    if (value) {
      value = value.replace(/\n/g, '<br />')
      value = value.replace(/\t/g, ' ')
      console.log(value)
    }
    // 把/n换成<br />后提交后台
  }
  onUploadImage = (options) => {
    const { file } = options
    let { imageList } = this.state
    let formData = new FormData()
    formData.append('file', file)
    fetch(serverOrigin + '/file/upload', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((res) => res.json()).then((json) => {
      if (json.code === 0) {
        imageList.push({
          uid: `${imageList.length}`,
          name: file.name,
          status: 'done',
          url: serverOrigin + '/' + json.data
        })
        this.setState({
          imageList
        })
      }
    })
  }
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handlePreviewCancel = () => {
    this.setState({
      previewImage: '',
      previewVisible: false,
    })
  }
  handleChange = (file) => this.setState({ imageList: this.state.imageList.filter((f) => f.url !== file.url) })

  renderImagePopover = () => {
    const { imageList } = this.state
    const uploadButton = (
      <div style={{ display: 'inline-block' }}>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className={styles.imageContainer}>
        <div className={styles.desc}>共{imageList.length}张, 还能上传{MAX_IMAGE - imageList.length}张</div>
        <Upload
          customRequest={this.onUploadImage}
          // action={`${serverOrigin}+ '/file/upload`}
          listType="picture-card"
          fileList={imageList}
          onPreview={this.handlePreview}
          onRemove={this.handleChange}
          // onChange={this.handleChange}
        >
          {imageList.length < 9 ? uploadButton : null}
        </Upload>
      </div>
    )
  }

  componentDidMount() {
    var echarts = require('echarts')

    var option2 =  {
      title : {
        text: '网站用户增长趋势',
        x:'center'
      },
      tooltip: {},
      grid: {
        top: '8%',
        left: '1%',
        right: '1%',
        bottom: '8%',
        containLabel: true,
      },
      legend: {
        itemGap: 50,
        x:'right',
        y:'bottom',
        data: ['注册总量' ,'最新注册量'],
        textStyle: {
          color: '#000',
          borderColor: '#fff'
        },
      },
      xAxis: [{
        type: 'category',
        boundaryGap: true,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#000'
          },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#000',
            margin: 15,
          },
        },
        axisTick: {
          show: false,
        },
        data: ['12月','1月', '2月', '3月', '4月', ],
      }],
      yAxis: [{
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 7,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#000'
          }
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          margin: 20,
          textStyle: {
            color: '#000',

          },
        },
        axisTick: {
          show: false,
        },
      }],
      series: [{
        name: '注册总量',
        type: 'line',
        // smooth: true, //是否平滑曲线显示
        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: "#28ffb3", // 线条颜色
          },
          borderColor: '#f0f'
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#000',
          }
        },
        itemStyle: {
          normal: {
            color: "#28ffb3",

          }
        },
        tooltip: {
          show: false
        },
        areaStyle: { //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(0,154,120,1)'
            },
              {
                offset: 1,
                color: 'rgba(0,0,0, 0)'
              }
            ], false),
            shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: [8, 30, 30, 44, 56]
      }, {
        name: '最新注册量',
        type: 'bar',
        barWidth: 20,
        tooltip: {
          show: false
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#000',
          }
        },
        itemStyle: {
          normal: {

            color: function(params) {
              var colorList = ['#0ec1ff', '#10cdff', '#12daff', '#15ebff', '#17f8ff', '#1cfffb', '#1dfff1'];
              return colorList[params.dataIndex];
            }
          }
        },
        data: [8, 22, 0, 14, 12]
      }]
    };
    var linesChart = echarts.init(document.getElementById('doubleline'));
    linesChart.setOption(option2)

    // 用户认证饼图
    var myChart = echarts.init(document.getElementById('piechart'));
    var option = {
      title : {
        text: '用户认证情况',
        x:'center'
      },
      color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {
            show: true,
            type: ['pie', 'funnel']
          },
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      series : [
        {
          name:'用户认证数据统计',
          type:'pie',
          radius : [40, 150],

          roseType : 'area',
          data:[
            {value:16, name:'已认证'},
            {value:5, name:'已申请未通过'},
            {value:22, name:'未认证'},

          ]
        }
      ]
    };
    myChart.setOption(option)

    //

  }


  render() {
    const { previewVisible, previewImage } = this.state
    const popoverTitle = (
      <div className={styles.popoverTitle}>
        <span>本地上传</span>
        <Icon type='close' onClick={() => this.setState({ imageList: [], showImageContainer: false })} />
      </div>
    )





    return (
      <div className={styles.container} >

        <div id="piechart"  style={{ width: 500, height: 400 }}></div>

        <div id="doubleline"  style={{ width: 500, height: 400 }}></div>

        <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default AdminStatis