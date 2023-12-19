import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-menu/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css'
import { IoMenuOutline } from "react-icons/io5";


const Filters = ({filters, onSelect, selectedValue}) => {

  const overlay = (
    <ul className="rounded menu" style={{maxWidth: '300px'}}>
      {filters.map(filter => (
        <li
          key={filter}
          onClick={() => onSelect(filter)}
          className={`p-2 cursor-pointer menu-item text-white ${filter === selectedValue && 'text-primary'}`}
        >{filter}</li>
      ))}
    </ul>
  )

  return (
    <Tooltip overlay={overlay} destroyTooltipOnHide showArrow={false} placement="leftBottom"  mouseLeaveDelay={0.5}>
      <div className="btn-icon-background rounded d-flex align-items-center p-1 cursor-pointer">
        <IoMenuOutline size={30} color="orange" />
      </div>
    </Tooltip>
  );
};

export default Filters;
