import React, {useCallback, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import Selected from "../components/Select/Selected.jsx";
import {useGetResponse} from "../api/api";
import {sortASC} from "../helper/helper";
import {
  Alert, AlertTitle,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress, ImageList,
  ImageListItem,
  Typography
} from "@mui/material";

const Characters = () => {
  const [page, setPage] = useState(1);
  const url = 'https://rickandmortyapi.com/api/character'

  const {
    loading,
    error,
    response,
    hasMore
  } = useGetResponse(url, page, null);

  const [searchParams, setSearchParams] = useSearchParams({sort: 'asc'});
  const charactersSort = sortASC(response, searchParams.get('sort'));

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
      <Typography variant="h1">Герои</Typography>
      <Selected sort={changeSort} val={searchParams.get('sort')}/>
      <ImageList sx={{
        gridTemplateColumns: {xs: '1fr !important', sm: 'repeat(2, 1fr) !important', lg: 'repeat(3, 1fr) !important', xl: 'repeat(4, 1fr) !important'}
      }}>
        {charactersSort.map((item, i) => {
          const isLastElem = charactersSort.length - 8 === i + 1;
            return (
              <ImageListItem key={item.id} ref={isLastElem ? lastNodeRef : null}>
                <Button href={`/characters/${item.id}`}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="240"
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <span>Вид:</span> {item.species}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Button>
              </ImageListItem>
            )
        })}
        {loading && <CircularProgress />}
        {error &&
          <Alert severity="error">
            <AlertTitle>Ошибка</AlertTitle>
            <strong>Что-то пошло не так...</strong>
          </Alert>
        }
      </ImageList>
    </>
  );
};

export default Characters;