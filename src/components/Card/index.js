import './index.css';

const Card = props => {
  return (
    <button
      className='card'
      onClick={props.onClick}
    >
      {props.asset.name &&
        <p className='card-name'>{props.asset.name}</p>
      }
      <div className='card-cover'>
        <img
          className='card-image'
          src={props.asset.image_thumbnail_url || "./images/placeholder.png"}
          alt={props.asset.description}
        ></img>
      </div>
    </button>
  );
}

export default Card;
