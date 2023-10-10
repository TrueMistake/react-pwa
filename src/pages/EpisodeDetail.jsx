import React from 'react';
import {useParams} from "react-router-dom";
import {useGetResponse} from "../api/api";
import {Alert, AlertTitle, Box, Card, CardContent, CardMedia, CircularProgress, Typography} from "@mui/material";

const EpisodeDetail = () => {
  const {id}  = useParams();
  const url = 'https://rickandmortyapi.com/api/episode';

  const {
    loading,
    error,
    response
  } = useGetResponse(url, 1, id);

  return (
    <div className="block">
      {loading && <CircularProgress />}
      {error &&
        <Alert severity="error">
          <AlertTitle>Ошибка</AlertTitle>
          <strong>Что-то пошло не так...</strong>
        </Alert>}
      <br/>
      <Card>
        <CardContent>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Название: <strong>{response.name}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Дата выхода: <strong>{response.air_date}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Номер эпизода: <strong>{response.episode}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Дата создания: <strong>{response.air_date}</strong></Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default EpisodeDetail;