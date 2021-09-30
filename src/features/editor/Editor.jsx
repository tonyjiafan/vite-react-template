import React, {Component} from 'react'
import 'open-vector-editor/umd/main.css'
import 'open-vector-editor/umd/open-vector-editor.js'
import exampleSequenceData from "./exampleSequenceData"
import styles from './Editor.module.less'
// import {Editor} from "open-vector-editor"

class VectorEditor extends Component {
  constructor(props) {
    console.log('this.props :>> ', props);
    super(props)
  }
  state = {
    vectorObj: null,
  }

  // 初始化
  init(nextProps) {
    const {
      editorName,
      withPreviewMode,
      isFullscreen
    } = nextProps ? nextProps : this.props

    console.log('initProps :>> ', this.props);

    const editorProps = {
      editorName: editorName,
      height: 700,
      isFullscreen: isFullscreen,
      hideSingleImport: false, // 隐藏但文件导入
      displayMenuBarAboveTools: false, // 在工具上方显示菜单栏
      withPreviewMode: withPreviewMode, // 预览模式 只显示一个小图
      showCircularity: false, // 显示圆度
      overrideToolbarOptions: true, // 覆盖工具栏
      menuOverrideExample: true, // 覆盖菜单
      propertiesOverridesExample: true, // 覆盖属性
      clickOverridesExample: true, // 覆盖单击事件
      showMenuBar: true, // 顶层菜单
      showReadOnly: false, // 显示只读
      disableSetReadOnly: false, // 禁用设置只读
      shouldAutosave: false, // 默认情况下，编辑器不会自动保存，将此设置为 true 将在对 sequenceData 进行任何更改后触发 onSave 回调
      showAvailability: true, // 设置为tru以显示材料可用性状态
      overrideRightClickExample: true, // 允许覆盖右键单击事件
      rightClickOverrides: { // 被右键单击时发生的情况 覆盖当给定的特征/部分/底漆/翻译/orf/cutsite/selectionLayer/lineageLine 
        selectionLayerRightClicked: (items /* { annotation }, props */ ) => {
          console.log('rightClickOverrides :>> ', items);
          if (Math.ceil(Math.random() * 10) < 5) {
            return [{
                text: "自定义菜单项-1",
                onClick: () => window.toastr.warning("hey! 111!")
              },
              "--",
              {
                text: "自定义菜单项-2",
                onClick: () => window.toastr.warning("hey! 222!")
              },
              "--",
              {
                text: "自定义菜单项-3",
                onClick: () => window.toastr.warning("hey! 333!")
              },
            ];
          } else {
            return [
              ...items,
            ];
          }
        }
      },
      onSave: function (opts, sequenceDataToSave, editorState, onSuccessCallback) { // 进行任何更改后触发 onSave 回调
        console.info("onSave -> opts:", opts);
        console.info("onSave -> sequenceData:", sequenceDataToSave);
        console.info("onSave -> editorState:", editorState);
        onSuccessCallback()
      },
      onDelete: (data) => { // 删除
        console.warn("would delete", data);
      },
      // 复制
      onCopy: function (event, copiedSequenceData, editorState) { // 复制的SequenceData 是在teselagen 序列格式中复制的序列的子集
        console.info("event:", event);
        console.info("sequenceData:", copiedSequenceData);
        console.info("editorState:", editorState);
        const clipboardData = event.clipboardData;
        clipboardData.setData(
          "application/json",
          JSON.stringify(copiedSequenceData)
        );
        event.preventDefault();
      },
      // 粘贴
      onPaste: function (event, editorState) {
        // 这里的 onPaste 必须返回 teselagen 数据格式的 sequenceData
        const clipboardData = event.clipboardData;
        let jsonData = clipboardData.getData("application/json")
        if (jsonData) {
          jsonData = JSON.parse(jsonData)
          if (jsonData.isJbeiSeq) {
            jsonData = convertJbeiToTeselagen(jsonData)
          }
        }
        const sequenceData = jsonData || {
          sequence: clipboardData.getData("text/plain")
        }
        return sequenceData
      },
      // 自定义header菜单
      menuFilter: (menuDef /*参数*/ ) => {
        // menuDef.push({
        //   text: "自定义菜单",
        //   submenu: ["copy"]
        // });
        // if (!_this.preview) {
        //   menuDef.push({ text: _this.isFullscreen ? "取消全屏" : "全屏", onClick: () => {
        //     _this.isFullscreen = !_this.isFullscreen
        //     window.toastr.warning("全屏时布局层级还有问题，还有必须重新初始化组件!")
        //   }})
        // }

        // menuDef[0].submenu.find(i => i.text && i.text.includes("Export"))
        //   .submenu.push({
        //     text: "Custom export option!",
        //     onClick: () => alert("Custom export")
        //   });
        //   menuDef[3].submenu.push({
        //   text: "My Custom Tool",
        //   onClick: () => alert("Some custom tool")
        // });
        return menuDef;
      },
      // 自定义单击事件
      clickOverrides: {
        // 特性点击事件
        featureClicked: ({
          event
        }) => {
          console.log('featureClicked -> :>> ', event);
          window.toastr.success("Feature Click Override Hit!");
          event.stopPropagation();
          return true; // 返回真值会阻止常规点击动作的发生
        },

        // 部件单击事件
        partClicked: (e) => {
          console.log('partClicked -> :>> ', e);
          window.toastr.success("Part Click Override Hit!");
          //默认情况下（又名返回 falsy）通常的点击动作发生
        }
      },
      PropertiesProps: { // 右侧视图容器中 属性面板中显示的选项卡列表
        propertiesList: [{
            name: 'features',
            title: '特征'
          },
          {
            name: 'translations',
            title: '翻译'
          },
          {
            name: 'cutsites',
            title: '切工'
          },
          {
            name: 'orfs',
            title: 'ORFS'
          },
          // "general","parts","primers","cutsites","genbank"
        ]
      },
      ToolBarProps: { //Top menus
        toolList: [
          "saveTool",
          "downloadTool",
          "importTool", // 导入
          "undoTool", // 后退
          "redoTool", // 前进
          "partTool",
          "cutsiteTool", // cut
          "featureTool", // 功能
          {
            name: "editTool", // 是否允许编辑
            disabled: true,
          },
          "findTool", // 查询
        ]
      },
      StatusBarProps: {
        showCircularity: false,
        showReadOnly: false,
        showAvailability: false
      },
    }
    var vector = window.createVectorEditor(document.getElementById('vectorEditorTag'), {
      ...editorProps,
    })
    return Promise.resolve(vector)
  }
  // 更新
  updateVector({vectorObj}, {sequenceData}) {
    console.log('更新Fn传入的 -> vectorObj :>> ', vectorObj);
    vectorObj.updateEditor({
      sequenceData,
      sequenceDataHistory: {}, // 如果前一个序列有任何剩余，则清除 sequenceDataHistory
      annotationVisibility: {
        features: true,
        orfTranslations: true,
      },
      readOnly: false,
      selectionLayer: {
        start: 0,
        end: 0
      },
      panelsShown: [
        [{
            id: "circular",
            name: "Circular Map[环形图]",
            active: true,
            canClose: false,
            // fullScreen: true,
          },
          {
            id: "sequence",
            name: "Sequence Map[序列图]",
            active: false,
            canClose: false,
          },
          {
            id: "rail",
            name: "Linear Map[线形图]",
            active: false,
            canClose: false,
          },
          {
            id: "properties",
            name: "Properties[属性设置]",
            active: false,
            canClose: false,
          },
        ],
      ],
      // 支持的注释
      annotationsToSupport: {
        features: true,
        translations: true,
        parts: true,
        orfs: true,
        cutsites: true,
        primers: true,
      }
    })
  }
  
  /**
   * 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；
   * 每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state
   * */ 
  static getDerivedStateFromProps(props, state) { 
    // console.log('getDerivedStateFromProps 生命周期 props :>> ', props);
    return state
  }
  // 获取到javascript错误
  componentDidCatch(error, info) {
    console.log('error :>> ', error);
    console.log('info :>> ', info);
  }

  // 挂载后
  async componentDidMount() {
    const {sequenceData} = this.props
    this.init().then(vector => {
      // 初始化后立即赋值
      this.setState({vectorObj: vector})
      this.updateVector({vectorObj: vector}, {sequenceData: sequenceData || exampleSequenceData})
    })
  }   
  // 组件Props或者state改变时触发，true：更新，false：不更新
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('组件Props或者state改变时触发 -> nextProps :>> ', nextProps);
    // console.log('组件Props或者state改变时触发 -> nextState :>> ', nextState);
    if (nextProps.withPreviewMode !== this.props.withPreviewMode || nextProps.dataType !== this.props.dataType || nextProps.isFullscreen !== this.props.isFullscreen) {
      this.init(nextProps).then(vector => {
        // 初始化后立即赋值
        this.setState({
          vectorObj: vector
        })
        this.updateVector(nextState, nextProps)
      })
      return true
    } else {
      return false
    }
  }
  // 组件更新前触发
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // console.log('组件更新前触发 -> prevProps :>> ', prevProps);
    // console.log('组件更新前触发 -> prevState :>> ', prevState);
  }
  // 组件更新后触发
  componentDidUpdate() {}
  // 组件卸载时触发
  componentWillUnmount() {
    console.log('卸载组件 :>> ', this.state);
    this.state.vectorObj.close()
  }

  // 渲染
  render() {
    return (
      <div className={styles.vectorEditorTag} id="vectorEditorTag"></div>
    )
  }
}

export default VectorEditor