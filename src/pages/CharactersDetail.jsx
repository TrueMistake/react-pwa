import React from 'react';
import {useParams} from "react-router-dom";
import {useGetResponse} from "../api/api";
import {formatDate} from "../helper/helper";
import {
  Alert,
  AlertTitle, Box, Card,
  CardContent, CardHeader,
  CardMedia,
  CircularProgress,
  Collapse,
  IconButton,
  Typography
} from "@mui/material";

const CharactersDetail = () => {
  const {id}  = useParams();
  const url = 'https://rickandmortyapi.com/api/character';

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
        </Alert>
      }
      <br/>
      <Card>
        <Box
          sx={{
            width: '50%',
            height: '50%',
            margin: '0 auto',
            backgroundColor: 'primary.dark',
          }}
        >
          <CardMedia
            component="img"
            image={response.image}
            alt={response.name}
          />
        </Box>
        <CardContent>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Статус: <strong>{response.status}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Вид: <strong>{response.species}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Имя: <strong>{response.name}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Тип: <strong>{response.type ? response.type : '-'}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Пол: <strong>{response?.gender}</strong></Typography>
          <Typography variant="subtitle1" align={'center'} color="text.secondary">Локация: <strong>{response?.location?.name}</strong></Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CharactersDetail;