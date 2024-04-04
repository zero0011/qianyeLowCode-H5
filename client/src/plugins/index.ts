/**
 * 组件库入口
 *
*/

import { ComponentType } from 'react';
import Text from './text';
import Image from './image';
// import ImageCarousel from './image-carousel';
// import RectangleBorder from './rectangle-border';
// import Iframe from './iframe';
import Button from './button';
// import bgMusic from './bg-music';

// 所有组件列表
const components: ComponentType<any>[] = [
  Text,
	Image,
	// ImageCarousel,
	// RectangleBorder,
	// Iframe,
	Button,
	// bgMusic
]

type qkRegisterComponentsObjectType = Record<string, ComponentType<any>>;

const qkRegisterComponentsObject: qkRegisterComponentsObjectType = {}
components.forEach(item => {

  // 确保每个组件都有 name 属性
  if (item.name) {
    qkRegisterComponentsObject[item.name] = item;
  } else {
    // 如果没有 name 属性，可以抛出错误或者做其他处理  
    throw new Error('组件必须包含 name 属性');
  }

})

export {
  qkRegisterComponentsObject
}