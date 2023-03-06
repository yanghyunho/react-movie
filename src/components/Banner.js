import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const request = await axios.get(requests.fetchNowPlaying);
        //console.log(request.data.results);
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: "videos"},
        });
        //console.log(movieDetail);
        setMovie(movieDetail);
    }
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
    const getMovieViodes = (isChecked) => {
      if (movie.videos.results.length > 0) {
        setIsClicked(isChecked);
      } else {
        console.log(movie.videos.results)
        setIsClicked(false);
      }
    }    
    //console.log(movie);
    if (!isClicked) {
        return (
          <header
            className="banner"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
            }}
          >
            <div className="banner__contents">
              {/**Title */}
              <h1 className="banner_title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <div className="banner__buttons">
                <button
                  className="banner__button play"
                  onClick={() => getMovieViodes(true)}
                >
                  Play
                </button>
                <button className="banner__button info">
                  <div className="space"></div>More Information
                </button>
              </div>
              {/**DIV > 2 BUTTONS */}
              <h1 className="banner__description">
                {truncate(movie?.overview, 100)}
              </h1>
              {/*Description*/}
            </div>
            <div className="banner__fadeBottom" />
          </header>
        );
    } else {
        return (
            <Container>
                <HomeContainer>                    
                    <Iframe
                      width="640"
                      height="360"
                      src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                      title="YouTube video player"
                      frameborder="0"
                      allow="autoplay; fullscreen"
                      allowfullscreen
                    ></Iframe>
                </HomeContainer>
            </Container>
        )
    }    
}

    /*const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%
        height: 100vh;
    `;

    const HomeContainer = styled.div`
        width: 100%;
        height: 100%;
    `;
    */

    const Container = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100vh;
    `;

    const HomeContainer = styled.div`
      width: 100%;
      height: 100%;
    `;

    const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
  
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `;

export default Banner