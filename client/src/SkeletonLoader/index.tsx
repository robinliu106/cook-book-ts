import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
    return (
        <div className="container-sm">
            <div className="row">
                <div className="col">
                    <div className="skeleton-card container-sm">
                        <div className="skeleton-card__title loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                    </div>
                </div>
                <div className="col">
                    <div className="skeleton-card container-sm">
                        <div className="skeleton-card__title loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                        <div className="skeleton-card__description loading"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
