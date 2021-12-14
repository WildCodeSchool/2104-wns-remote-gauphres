import React, { ReactNode } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { fonts, colors } from '../../style/theme';

interface Props {
    title: string;
    children: ReactNode;
    subtitle?: string | null;
}

const ApiCard = ({ title, subtitle, children }: Props) => (
    <Card
        sx={{
            minWidth: 310,
            maxWidth: 350,
            m: 2,
            p: 1,
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
                }}
            >
                {title}
            </Typography>

            {subtitle && (
                <Typography
                    sx={{
                        fontSize: 14,
                        fontFamily: fonts.text,
                        color: colors.darkPurple,
                        fontWeight: 'bold',
                    }}
                    color="text.secondary"
                    gutterBottom
                >
                    {subtitle}
                </Typography>
            )}

            <Typography
                variant="body2"
                sx={{
                    fontSize: 14,
                    fontFamily: fonts.text,
                    color: colors.darkPurple,
                    fontWeight: 'bold',
                }}
            >
                {children}
            </Typography>
        </CardContent>
    </Card>
);

ApiCard.defaultProps = {
    subtitle: null,
};

export default ApiCard;
