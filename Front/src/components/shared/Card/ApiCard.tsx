import React, { ReactNode, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
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
    <Card sx={{ minWidth: 100 }}>
        <CardContent>
            {subtitle && (
                <Typography
                    sx={{ fontSize: 14, fontFamily: fonts.text }}
                    color="text.secondary"
                    gutterBottom
                >
                    {subtitle}
                </Typography>
            )}

            <Typography variant="h5" component="div">
                {title}
            </Typography>

            <Typography variant="body2">{children}</Typography>
        </CardContent>
    </Card>
);

ApiCard.defaultProps = {
    subtitle: null,
};

export default ApiCard;
