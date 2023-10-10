import React, {useCallback, useRef, useState} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import Selected from "../components/Select/Selected.jsx";
import {useGetResponse} from "../api/api";
import {sortASC} from "../helper/helper";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Typography
} from "@mui/material";

const Episode = () => {
  const [page, setPage] = useState(1);
  const url = 'https://rickandmortyapi.com/api/episode'

  const {
    loading,
    error,
    response,
    hasMore
  } = useGetResponse(url, page, null);

  const [searchParams, setSearchParams] = useSearchParams({sort: 'asc'});
  const episodeSort = sortASC(response, searchParams.get('sort'));

  const changeSort = (val) => {
    setSearchParams({sort: val})
  }

  const observer = useRef();
  const lastNodeRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevState => prevState + 1);
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading, hasMore])

  return (
    <>
      <Typography variant="h1">Эпизоды</Typography>
      <Selected sort={changeSort} val={searchParams.get('sort')}/>
      {episodeSort.map((item, i) => {
        const isLastElem = episodeSort.length - 5 === i + 1;
          return (
            <Box key={item.id} ref={isLastElem ? lastNodeRef : null}>
              <Button href={`/episode/${item.id}`} variant="text" fullWidth>
                <Card sx={{
                  width: '100%',
                  maxWidth: '100%'
                }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Название: <strong>{item.name}</strong>
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Эпизод: <strong>{item.episode}</strong>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Button>
            </Box>
          )
      })}
      {loading && <CircularProgress />}
      {error &&
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          <strong>Что-то пошло не так...</strong>
        </Alert>}
    </>
  );
};

export default Episode;