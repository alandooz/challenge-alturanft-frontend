import './index.css';

const Modal = props => {
  return (
    <div
      className='modal'
    >
      <div className='modal-header'>
        <div className='modal-header-space'></div>
        <p className='modal-name'>{props.asset.name}</p>
        <button
          className='modal-close'
          onClick={() => props.onClose()}
        >❌</button>
      </div>
      {props.asset.image_thumbnail_url &&
        <img
          className='modal-image'
          src={props.asset.image_thumbnail_url}
          alt={props.asset.description}
        ></img>
      }
      {props.asset.description &&
        <p className='modal-description'>{props.asset.description}</p>
      }
      <a
        className='modal-contract'
        href={"https://etherscan.io/address/"+props.asset.asset_contract.address}
        target="_blank"
        rel="noreferrer"
      >
        {`${props.asset.asset_contract.address} ↗`}
      </a>
      <a
        className='modal-buy'
        href={props.asset.permalink}
        target="_blank"
        rel="noreferrer"
      >
        Buy
      </a>
    </div>
  );
}

export default Modal;
