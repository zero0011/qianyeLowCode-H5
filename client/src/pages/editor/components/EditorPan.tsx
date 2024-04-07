import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import editorProjectConfig from '../DataModel';
import EditShape from "@/components/EditShape";
import QkText from "@/plugins/text";
import { setActiveElementUUIDAsync } from "@/redux/editor/asyncActions";
import { setElementCommonStyle } from "@/redux/editor/actions";

interface EditorPanType {
  scale: number
}

const menuOptions = [{
  title: '复制',
  icon: 'iconfont iconfuzhi',
  value: 'copy'
}, {
  title: '删除',
  icon: 'iconfont iconshanchu',
  value: 'delete'
}, {
  title: '字体放大',
  icon: 'iconfont iconzitifangda',
  value: 'fontA+'
}, {
  title: '字体缩小',
  icon: 'iconfont iconzitisuoxiao',
  value: 'fontA-'
}, {
  title: '字体加粗',
  icon: 'iconfont iconzitijiacu',
  value: 'fontB'
}, {
  title: '图层上移',
  icon: 'iconfont iconziyuan1',
  value: 'layerUp'
}, {
  title: '图层下移',
  icon: 'iconfont iconxiayiyiceng',
  value: 'layerDown'
}, {
  title: '图层置顶',
  icon: 'iconfont iconcontrol-top',
  value: 'layerTop'
}, {
  title: '图层置底',
  icon: 'iconfont iconcontrol-bottom',
  value: 'layerBottom'
}]

const EditorPan: FC<EditorPanType> = ({ scale }) => {
  const dispatch =  useDispatch();
  const projectData = useSelector((state: any) => state.editor.projectData);
  const activePageUUID = useSelector((state: any) => state.editor.activePageUUID);
  const activeElementUUID = useSelector((state: any) => state.editor.activeElementUUID);
  const activePage = useSelector((state: any) => {
    if (!state.editor.projectData.pages || !state.editor.activePageUUID) {
      return { commonStyle: {}, config: {}, elements: [] };
    }
    return state.editor.projectData.pages?.find((v: any) => { return v.uuid === state.editor.activePageUUID })
  })
  const currentPageIndex = useSelector((state: any) => {
    // 如果不存在页面返回-1
		if(!state.editor.projectData.pages){
			return -1;
		}
    return state.editor.projectData.pages.findIndex((v: any) => {return v.uuid === state.editor.activePageUUID})
  })

  const activeElementIndex = useSelector((state: any) => {
    // 如果不存在页面返回-1
		if(!state.editor.projectData.pages){
			return -1;
		}
    let currentPageIndex = state.editor.projectData.pages.findIndex((v: any) => {return v.uuid === state.editor.activePageUUID})
		if(currentPageIndex === -1){
			return -1;
		}
    return state.editor.projectData.pages[currentPageIndex].elements.findIndex((v: any) => {return v.uuid === state.editor.activeElementUUID})
  })

  const handleElementClick = (uuid: string) => {
    dispatch(setActiveElementUUIDAsync(uuid));
  }

  const handleClickCanvas = (e: any) => {
    if (!e.target.classList.contains('element-on-edit-pane') && !e.target.classList.contains('menu-item-on-edit-panel')) {
      dispatch(setActiveElementUUIDAsync(''));
    }
  }

  const handleElementResize = (pos: any) => {
    if (!pos) {
      // this.$store.dispatch('addHistoryCache')
      return;
    }
    dispatch(setElementCommonStyle(pos, currentPageIndex, activeElementIndex));
  }

  const editorMainStyle = {
    transform: `scale(${scale})`,
    width: `${projectData.width}px`,
    height: `${projectData.height}px`
  }

  const pagePreviewWrapperStyle = editorProjectConfig.getCommonStyle(activePage.commonStyle);

  return (
    <div className="editor-pane" onClick={(e) => handleClickCanvas(e)}>
      <div className="editor-pane-inner">
        <div className="editor-main-inner" style={editorMainStyle}>
          <div className="page-preview-wrapper" id="canvas-panel" style={pagePreviewWrapperStyle}>

            {/* 组件展示列表 */}

            {
              activePage.elements.map((item: any) => {
                const editStyle = editorProjectConfig.getCommonStyle({ width: item.commonStyle.width, height: item.commonStyle.height, left: item.commonStyle.left, top: item.commonStyle.top, position: item.commonStyle.position })
                const componentStyle = editorProjectConfig.getCommonStyle({ ...item.commonStyle, top: 0, left: 0 })
                return (
                  <EditShape
                    key={item.uuid}
                    active={item.uuid === activeElementUUID}
                    defaultStyle={item.commonStyle}
                    uuid={item.uuid}
                    editStyle={editStyle}
                    handleElementClick={() => handleElementClick(item.uuid)}
                    handleResize={handleElementResize}
                  >
                    <QkText text={item.propsValue.text} style={componentStyle} className="element-on-edit-pane" />
                  </EditShape>
                )
              })
            }

          </div>

          <div className="page-wrapper-mask"></div>
        </div>

        <div className="page-wrapper-menu-operation menu-item-on-edit-panel">

        </div>
      </div>
    </div>
  )
}

export default EditorPan;