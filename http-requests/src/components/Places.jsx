export default function Places({ title, places, fallbackText, onSelectPlace, isLoading, loadingText }) {
  console.log(places);
  return ( 
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{loadingText}</p>}
      {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} //we getting the image data from the exposed backend code not directly from the database
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}


/**
 * <img src={place.image.src} alt={place.image.alt} />
 * Note that the images will not be fetched with the codes above because of the backend restrictions. same applies to the other data fields 
 * (when sending requests, we can only access resources and endpoints that are exposed by the backend server). 
 * 
 * The image src is different because with {place.image.src}, we are only retrieving the name of the image i.e forest-waterfall.jpg we then need 
 * to add the url to locate where it is on the server just like we would do when accessing the path of an image with src normally. It would then look like this:
 * <img src="http://localhost:3000/forest-waterfall.jpg" />   (check answer on udemy for more clarifications)
 * If we use just place.image.src, then we will just access a part of the url or path
 * 
 * We can only send requests explicitly allowed by the backend code. There is a code in app.js line 8 that exposes the images folder
 * on the backend server. With that, we can then point at the backend then the image file name after the url as above.
 */