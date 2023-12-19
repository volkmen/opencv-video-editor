import React from "react";
import api from "../api";
import Pane from './Pane';
import { CiCirclePlus } from "react-icons/ci";
import PaneModal from "./PaneModal";

export default function VideoLayouts() {
    const [slots, setSlots] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [addModalIsOpened, setAddModalIsOpened] = React.useState(false);

    const fetchSlots = React.useCallback(() => {
        api.get('slots').then(setSlots)
    }, [])

    const updatePane = ({filter, id, url}) => {
        api.patch(`slots/${id}`, {
            ...(filter ? {filter} : {}),
            ...(url ? {url} : {})
        })
          .then(fetchSlots)
    }

    const onAddPane = ({url}) => {
        api.post(`slots`, {url})
          .then(() => {
              fetchSlots()
              setAddModalIsOpened(false)
          })
    }

    const onDeletePane = (id) => {
        api.delete(`slots/${id}`).then(fetchSlots)
    }

    React.useEffect(() => {
        fetchSlots()
        api.get('filters').then(setFilters)
    }, [])

    const paneHeightClassName = slots.length >= 2 ? 'h-100' : 'h-50';

    return (
      <div className="layout">
          {slots.map(slot => (
            <div key={slot.id + slot.filter + slot.url} className={`${paneHeightClassName} position-relative`} >
                <div className="position-absolute w-100 h-100 bg-light d-flex justify-content-center" style={{left: 0, top:0}}>
                    <Pane
                      className={`${paneHeightClassName} position-relative`}
                      slot={slot} filters={filters}
                      updatePane={updatePane}
                      onDelete={onDeletePane}
                    />
                </div>
            </div>
          ))}
          {slots.length < 4 && (
            <div className={`${paneHeightClassName} position-relative d-flex justify-content-center align-items-center`} >
                <CiCirclePlus
                  size={50}
                  color="green"
                  className="cursor-pointer"
                  onClick={() => setAddModalIsOpened(true)}
                />
            </div>
          )}
          {addModalIsOpened && (
            <PaneModal onSubmit={onAddPane} onCancel={() => setAddModalIsOpened(false)} />
          )}
      </div>
    )
}
