import React from 'react';
import {useParams} from "react-router-dom";
import {formatDate} from "../helper/helper";
import {useGetResponse} from "../api/api";
import ErrorBoundary from "../components/ErrorBoundary.jsx";
import {Alert, AlertTitle, Card, CardContent, CircularProgress, Typography} from "@mui/material";

const LocationDetail = () => {
  const {id}  = useParams();
  const url = 'https://rickandmortyapi.com/api/location';

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
      <Card>
        <CardContent>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Название: <strong>{response.name}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Тип: <strong>{response.type}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Изменения: <strong>{response.dimension}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Дата создания: <strong><ErrorBoundary>{formatDate(response.created)}</ErrorBoundary></strong></Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationDetail;