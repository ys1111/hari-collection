import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <ul className="p-navi">
      <li className="p-navi__item">
        <NavLink activeStyle={{ color: '#ff0211' }} to="/all-items">
          すべて
        </NavLink>
      </li>
      <li className="p-navi__item">
        <NavLink activeStyle={{ color: '#ff0211' }} to="/ladies">
          レディース
        </NavLink>
      </li>
      <li className="p-navi__item">
        <NavLink activeStyle={{ color: '#ff0211' }} to="/baby-kids">
          ベビー・キッズ
        </NavLink>
      </li>
      <li className="p-navi__item">
        <NavLink activeStyle={{ color: '#ff0211' }} to="/entame">
          エンタメ
        </NavLink>
      </li>
      <li className="p-navi__item">
        <NavLink activeStyle={{ color: '#ff0211' }} to="/mens">
          メンズ
        </NavLink>
      </li>
    </ul>
  )
}

export default Navigation
