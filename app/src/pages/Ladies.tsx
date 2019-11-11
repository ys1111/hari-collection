import * as React from "react";
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as ItemState,
  loadFilterItem,
  loadIndivisualItem
} from '../redux/modules/items'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ladiesCategoryId = 1;

interface StateProps {
  items: ItemState
}

interface DispatchProps {
  loadFilterItem: (category_id: number) => void
  loadIndivisualItem: (id: number) => void
}

class Ladies extends React.Component<StateProps, DispatchProps> {
  componentDidMount() {
    const { loadFilterItem } = this.props
    loadFilterItem(ladiesCategoryId)
  }

  private addItem = (id) => {
    const { loadIndivisualItem } = this.props
    loadIndivisualItem(id)
  }

  render() {

    const { items, status } = this.props.items
    
    if(status === 'INITIAL') {
      // @TODO progressive icon & delay
        return  <div>LOADING...</div> 
      } else if (items == null || items.length <= 0) {
        return  <div>Item is Nothing</div>
      } {
        return (
          <div className="l-card">
            {items.map(({
              id,
              name,
              like_count,
              price,
              is_sold_out,
              image
            }, index: number) => {
              return (
                <div key={index} data-content_id={id} className="p-card" onClick={() =>this.addItem(id)}>
                  <Link to={`/items/${id}`}>
                  {is_sold_out 
                  ? <div>
                      <img src={image} alt={name}/>
                      <div className="p-card__sold-out-badge">
                        <div>SOLD</div>
                      </div>
                    </div>
                  : <img src={image} alt={name}/>
                  }
                  </Link>
                  <div className="p-card__box-title">
                    <Link to={`/items/${id}`} onClick={() =>this.addItem(id)}><h1 className="p-card__title">{name}</h1></Link>
                    <p className="p-card__price">￥&nbsp;{price.toLocaleString()}</p> 
                    <p className="p-card__like-count"><FaHeart />&nbsp;{like_count}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
    }
  }
}

export default connect(
  (state: AppState) => ({
    items: state.reducer.items
  }),
  { loadFilterItem, loadIndivisualItem }
)(Ladies)

