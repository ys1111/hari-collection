import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as ItemState,
  ITEM_STATUS,
  loadIndivisualItem
} from '../redux/modules/items'
import { FaHeart } from 'react-icons/fa'
import { MdChat, MdFlag } from 'react-icons/md'
import { Link } from 'react-router-dom'

interface StateProps {
  items: ItemState
}

interface DispatchProps {
  loadIndivisualItem: (id: number) => void
}

type Props = StateProps & DispatchProps

class ShowItem extends React.Component<Props> {
  render() {
    const { item, status } = this.props.items
    const {
      name,
      is_sold_out,
      image,
      like_count,
      description,
      price,
      shipping_fee
    } = item

    if (status === ITEM_STATUS.LOADING) {
      return (
        <div className="l-card-show">
          <div className="p-card-show">
            <div className="p-card-show__header">
              <button className="c-button__back">
                <Link to="/">戻る</Link>
              </button>
              <div className="p-card-show__name">{name}</div>
            </div>
            {is_sold_out ? (
              <div className="p-card-show__image">
                <img src={image} alt={name} />
                <div className="p-card__sold-out-badge">
                  <div>SOLD</div>
                </div>
              </div>
            ) : (
              <div className="p-card-show__image">
                <img src={image} alt={name} />
              </div>
            )}
            <div className="p-card-show__box-title">
              <h1 className="p-card-show__name">{name}</h1>
              <div className="p-card-show__action-bar">
                <p className="p-card-show__like">
                  <FaHeart />
                  &nbsp;{like_count}
                </p>
                <p className="p-card-show__comment">
                  <MdChat />
                  &nbsp;コメント
                </p>
                <p className="p-card-show__flag">
                  <MdFlag />
                </p>
              </div>
            </div>
            <div className="p-card-show__box-description">
              <div className="p-card-show__description-title">
                <p>商品の説明</p>
              </div>
              <p className="p-card-show__text">{description}</p>
            </div>
            <div className="p-card-show__purchase">
              <div className="p-card-show__box-price">
                <p className="p-card-show__price">
                  ￥&nbsp;{Number(price).toLocaleString()}
                </p>
                <p className="p-card-show__caption">&nbsp;{shipping_fee}</p>
              </div>
              <button className="c-button__purchase">購入手続きへ</button>
            </div>
          </div>
        </div>
      )
    }
    {
      return <div>Sorry Can not get Item.</div>
    }
  }
}

export default connect(
  (state: AppState) => ({
    items: state.reducer.items
  }),
  { loadIndivisualItem }
)(ShowItem)
