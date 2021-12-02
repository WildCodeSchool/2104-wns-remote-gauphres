import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { fonts, colors } from '../../style/theme';

const CustomHomePageButton = styled(Button)`
    font-size: 0.25em;
    background-color: ${colors.yellow}!important;
    font-family: ${fonts.text}!important;
    width: 30%;
    height: 4rem;
`;

export default CustomHomePageButton;
