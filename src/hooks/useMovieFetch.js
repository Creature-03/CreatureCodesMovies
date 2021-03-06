import { useState, useEffect } from 'react';
// api
import API from '../utils/api'

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);

                // get directors
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors: directors
                });

                setLoading(false);

            } catch {
                setError(true);
            }
        }
        fetchMovie();
    }, [movieId]);

    return { state, loading, error, }
}