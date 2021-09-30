import React, {Component} from 'react'
import 'open-vector-editor/umd/main.css'
import 'open-vector-editor/umd/open-vector-editor.js'
// import {Editor} from "open-vector-editor"

function Dom () {
  return (
    <div className="vectorEditorTag" id="vectorEditorTag">xixixihahahah</div>
  )
}

class VectorEditor extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    editorProps: {
      editorName: "DemoEditor",
      isFullscreen: true,
      showMenuBar: true
    }
  }
  /**
   * 组件每次被rerender的时候，包括在组件构建之后(虚拟dom之后，实际dom挂载之前)，每次获取新的props或state之后；
   * 每次接收新的props之后都会返回一个对象作为新的state，返回null则说明不需要更新state
   * */ 
  static getDerivedStateFromProps(props, state) { 
    console.log('props :>> ', props);
    console.log('state :>> ', state);
    console.log('Dom :>> ', Dom);
    var vectorEdit = window.createVectorEditor(Dom, {
      ...state.editorProps,
    })

    vectorEdit.updateEditor({
      sequenceData: {
        circular: true,
        sequence:
          "gtagagagagagtgagcccgacccccgtagagagagagtgagcccgacccccgtagagagagagtgagcccgacccccgtagagagagagtgagcccgaccccc",
        features: [
          {
            id: "2oi452",
            name: "I'm a feature :)",
            start: 10,
            end: 20
          }
        ]
      }
    })
    
    return state
  }
  // 获取到javascript错误
  componentDidCatch(error, info) {}

  render() {
    return (
      <div className="box">
        <Dom></Dom>
      </div>
    )
  }
  // 挂载后
  componentDidMount() {}   
  // 组件Props或者state改变时触发，true：更新，false：不更新
  shouldComponentUpdate(nextProps, nextState) {
      return true
  }
  // 组件更新前触发
  getSnapshotBeforeUpdate(prevProps, prevState) {}
  // 组件更新后触发
  componentDidUpdate() {}
  // 组件卸载时触发
  componentWillUnmount() {}
}

export default VectorEditor