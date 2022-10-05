import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=> {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const capitalizeFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const updateNews=async()=>{
    props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7e188b2fb72e42569b29630c89910f90&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parseddata = await data.json();
    props.setProgress(70);
    console.log(parseddata);
    setarticles(parseddata.articles)
    settotalResults(parseddata.totalResults)
    setloading(false)
   props.setProgress(100);
  }
  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`
    updateNews()
  }, [])
  const fetchMoreData=async()=>{
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7e188b2fb72e42569b29630c89910f90&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    setarticles(articles.concat(parseddata.articles))
    settotalResults(parseddata.totalResults)
    setloading(false)
  }
  // handleNextClick=async ()=>{
  //   this.setState({page:this.state.page+1})
  //   this.updateNews()
  // }
  // handlePreviousClick=async ()=>{
  //   this.setState({page:this.state.page-1})
  //   this.updateNews()
  // }
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop:'90px'}}>NewsApp -Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length!==totalResults}
    loader={<Spinner/>}
  >
        {loading&&<Spinner/>}
        <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4 mt-5" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between mt-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-secondary"onClick={this.handlePreviousClick}>&larr;Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-outline-secondary"onClick={this.handleNextClick}>Next&rarr;</button>
        </div> */}
      </div>
    );
      }
News.defaultProps={
  country:'in',
  pageSize:9,
  category:'general'
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}
export default News;
