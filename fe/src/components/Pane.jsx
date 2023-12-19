import React from 'react';
import api from "../api";
import Filters from './Filters';
import { CiTrash, CiEdit } from "react-icons/ci";
import PaneModal from "./PaneModal";
import { VscErrorSmall } from "react-icons/vsc";


const Pane = ({slot, filters, updatePane, onDelete}) => {
  const [editPaneIsOpened, setEditPaneIsOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [streamId, setStreamId] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const onSelectFilter = (filter) => {
    updatePane({ id: slot.id, filter })
  }

  const onUpdateUrl = ({url}) => {
    updatePane({ id: slot.id, url })
    setEditPaneIsOpened(false)
  }

  const onLoad =() => {
    setIsLoading(false)
  }

  React.useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    let streamIdResponse = null
    api.get(`streams/open-stream/${slot.id}`).then((response) => {
      setStreamId(response);
      streamIdResponse = response
    }).catch(() => {
      setIsError(true)
    })

    return () => {
      if (streamIdResponse) {
        api.get(`streams/drop-stream/${streamIdResponse}`).then(setStreamId)
      }
    }
  }, [])

  const onClickDelete = () => {
    onDelete(slot.id)
  }

  return (
      <div key={slot.id} className="position-relative w-100 h-100 text-center bg-dark">
        {isLoading && !isError && <div className="absolute-centered"><div className="loader" /></div>}
        {isError && <VscErrorSmall size={80} color="red" className="absolute-centered" />}
        {streamId && (

          <img
            onLoad={onLoad}
            onError={() => setIsError(true)}
            style={{maxHeight: '100%', maxWidth: '100%', width: 'auto', objectFit: 'content'}}
            src={`${api.baseUrl}/streams/${streamId}`}
          />
        )}
        <div className="position-absolute text-danger top-0 mt-1 text-center w-100">{slot.filter} / {slot.url}</div>
        <div className="position-absolute d-flex" style={{bottom: '20px', right: '20px', gap: '5px'}}>
          <Filters filters={filters} onSelect={onSelectFilter} selectedValue={slot.filter} />
          <div className="btn-icon-background rounded d-flex align-items-center p-1 cursor-pointer">
            <CiEdit color="orange" size={30} onClick={() => setEditPaneIsOpened(true)}/>
          </div>
          <div className="btn-icon-background rounded d-flex align-items-center p-1 cursor-pointer">
            <CiTrash color="red" size={30} onClick={onClickDelete}/>
          </div>
        </div>
        {editPaneIsOpened && (
          <PaneModal
            onSubmit={onUpdateUrl}
            onCancel={() => setEditPaneIsOpened(false)}
            initUrl={slot.url}
            title="Edit pane"
          />
        )}
      </div>
  );
};

export default Pane;
