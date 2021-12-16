import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardMedia, Skeleton } from '@mui/material';
import { fonts, colors } from '../../style/theme';

interface Props {
    title: string;
    url: string | undefined;
}

const ApiImageCard = ({ title, url }: Props): JSX.Element => (
    <Card
        sx={{
            minWidth: 380,
            maxWidth: 650,
            m: 2,
            boxShadow: 3,
            borderRadius: 8,
        }}
    >
        <CardContent>
            <Typography
                variant="h2"
                component="div"
                sx={{
                    fontFamily: fonts.title,
                    color: colors.darkPurple,
                    fontWeight: 'bold',
                    paddingBottom: '0.5',
                }}
            >
                {title}
            </Typography>
            {!url && (
                <Box
                    sx={{
                        display: 'flex',
                        my: 2,
                    }}
                >
                    <Skeleton variant="rectangular" width={400} height={300} />
                </Box>
            )}
            {url && (
                <CardMedia
                    component="img"
                    image={url}
                    width="auto"
                    height="300"
                    alt="Random Kitty of the day"
                    sx={{ py: 1 }}
                />
            )}
        </CardContent>
    </Card>
);

export default ApiImageCard;
