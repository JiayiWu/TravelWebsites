import * as React from 'react'
import classnames from 'classnames'
import styles from './DynamicScrollPane.module.scss'

interface ScrollPaneProps {
  hasMore: boolean,
  loadMore: Function,
  isLoading: boolean,
  wrapClassName?: string,
}

class DynamicScrollPane extends React.Component<ScrollPaneProps, any> {
  private wrapper: React.RefObject<HTMLInputElement>

  constructor(props) {
    super(props)
    this.wrapper = React.createRef()
  }
  
  handleLoadMore = () => {
    this.props.loadMore()
  }

  handleScroll = () => {
    let scrollTop = 0, scrollHeight = 0, refHeight = 0
    if (this.wrapper && this.wrapper.current) {
      scrollTop = this.wrapper.current.scrollTop
      scrollHeight = this.wrapper.current.scrollHeight
      refHeight = this.wrapper.current.clientHeight
    }
    const isBottom = scrollHeight !== 0 ? refHeight + scrollTop === scrollHeight : false
    console.log(this.wrapper, scrollTop, scrollHeight, refHeight)
    if (isBottom) {
      this.props.loadMore()
    }
    // scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;

  }

  public render() {
    const { hasMore, isLoading, loadMore } = this.props
    // console.log(React.Children)
    return (
      <div 
        ref={this.wrapper} 
        className={classnames(this.props.wrapClassName, 'dynamic-scroll-pane')} 
        onScroll={this.handleScroll}
      >
        {this.props.children}
        <div className={styles.footer} onClick={hasMore && !isLoading ? () => this.handleLoadMore() : () => {}}>
          {isLoading ? '正在加载...' : (
            hasMore ? '加载更多' : '没有更多了...'
          )}
        </div>
      </div>
    )
  }
}

export default DynamicScrollPane