import React from 'react';
import Modal from "./Modal";

const PaneModal = ({onSubmit, onCancel, title = 'Add pane', initUrl = ''}) => {
  const [url, setUrl] = React.useState(initUrl)

  return (
    <Modal>
      <h2 className="text-white text-center mb-3 text-uppercase">{title}</h2>
      <div className="custom-control">
        <label className="text-white mr-2 text-uppercase" htmlFor="name">
          Input url
        </label>
        <input name="url w-100" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)}/>

      </div>

      <div className="mt-4 pt-5 d-flex justify-content-end">
        <button className="btn btn-secondary mr-1 text-uppercase" type="submit" onClick={onCancel}>
          cancel
        </button>
        <button className="btn btn-primary text-uppercase" type="submit" onClick={() => onSubmit({url})} disabled={!url}>
          submit
        </button>
      </div>
    </Modal>
  );
};

export default PaneModal;
