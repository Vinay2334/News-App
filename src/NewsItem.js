import React from "react";

const NewsItem=(props)=> {
    let { title, description, imageurl,newsurl,author,date,source } =props;
    return (
      <div>
        <div className="card">
        <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }> 
                    <span className="badge rounded-pill bg-danger"> {source} </span>
                    </div>
          <img src={imageurl} className="card-img-top" alt="..." ></img>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsurl} className="btn btn-primary btn-sm">
              Read More
            </a>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on: {new Date(date).toGMTString()} {new Date(date).getFullYear()}</small></p>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
