
interface PageCommonStyleType {
  backgroundColor: string
  backgroundImage: string
  backgroundSize: string
}

export interface ElementCommonStyleType {
  position: string,
  width: number,
  height: number,
  top: number,
  left: number,
  rotate: number,
  paddingTop: number,
  paddingLeft: number,
  paddingRight: number,
  paddingBottom: number,
  marginTop: number,
  marginLeft: number,
  marginRight: number,
  marginBottom: number,
  borderWidth: number,
  borderColor: string,
  borderStyle: string,
  borderRadius: number,
  boxShadow: string,
  fontSize: number,
  fontWeight: number,
  lineHeight: number,
  letterSpacing: number,
  textAlign: string,
  color: string,
  backgroundColor: string,
  backgroundImage: string,
  backgroundSize: string,
  opacity: number,
  zIndex: number
}

export interface ProjectConfigType {
  name: string
  title: string
  description: string
  coverImage: string
  auther: string
  script: string
  width: number
  height: number
  pages: Array<PageConfigType>
}

export interface PageConfigType {
  name: string
  elements: Array<any>
  commonStyle: PageCommonStyleType
  config: Object
}

export interface ElementConfigType {
  elName: string
  animations: Array<any>
  commonStyle: ElementCommonStyleType
  events: Array<any>
  propsValue: Object
  value: string,
	valueType: string
}