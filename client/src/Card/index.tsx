import "./Card.css";

const RecipeCard = ({ id, name, imageUrl }) => {
    return (
        <div className="card border-dark bg-light col">
            <div className="card-body">
                <div className="row">
                    <img src={imageUrl} className="card-img-top" alt="alt" />
                </div>
                <div className="row">
                    <a href={`/recipe/${id}`} className="btn btn-outline-dark mt-3">
                        <h6 className="card-title">{name}</h6>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
