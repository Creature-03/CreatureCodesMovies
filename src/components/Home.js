import React from 'react';
// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../utils/config';
// components
import HeroImage from './heroImage/HeroImage';
import Grid from './grid/Grid';
import Thumbnail from './thumbnail/Thumbnail';
import Spinner from './spinner/Spinner';
import SearchBar from './searchbar/SearchBar';
import LoadMore from './loadMore/LoadMore';
// hooks
import { useHomeFetch } from '../hooks/useHomeFetch'
// image
import NoImage from '../images/no_image.jpg';



const Home = () => {
    const { state, 
            loading, 
            error, 
            searchTerm, 
            setSearchTerm, 
            setIsLoadingMore 
        } = useHomeFetch();

    if (error) return <div>Something went wrong...</div>;

    return (
        <>
            {!searchTerm && state.results[0] ? 
            <HeroImage 
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title={state.results[0].original_title}
                text={state.results[0].overview}
            />
            : null}
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>
                {state.results.map(movie => (
                    <Thumbnail
                        key={movie.id}
                        clickable={true}
                        image={
                            movie.poster_path
                                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                : NoImage
                        }
                        movieId={movie.id}
                    />
                ))}
            </Grid>
            {loading && <Spinner />}
            {state.page < state.total_pages && !loading && (
                <LoadMore text='Load More' callback={() => setIsLoadingMore(true)} />
            )}
        </>
    )
}

export default Home;