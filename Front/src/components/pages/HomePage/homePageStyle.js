import styled from 'styled-components';
import { Link as BaseLink } from 'react-router-dom';
import { colors, fonts } from '../../style/theme';
import backgroundImage from '../../../assets/images/chang-duong.jpg';

export const HomePageContainer = styled.div`
    font-family: ${fonts.text};
    font-size: 2em;
    flex-direction: column;
    justify-content: center;
    position: relative;
    background-color: ${colors.white};
    width: 100%;
    height: 100vh;
`;

export const HomePageTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    margin-top: 0px;
    text-align: center;
`;

export const PictureContent = styled.section`
    background-image: url(${backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    z-index: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
`;

export const HomepageButtonsContainer = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-top: 1.5em;
`;

export const Link = styled(BaseLink)`
    margin: 1em;
    font-size: 1.25em;
    font-family: ${fonts.text}!important;
    font-weight: 600 !important;
    text-decoration: none;
    color: #00000;
`;

export const HomePageBlockLineContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    position: relative
    justify-content: space-around;
    align-items: stretch;
    z-index: 1;
    background-color: ${colors.yellow};
    font-size: 1.5em;
    margin: 1em;
    width: 80%;
    height: 50%;
`;

export const HomePageBlock = styled.div`
    display: inline-block;
    margin: 0.75em;
    padding: 0 0.5em 0 0.5em;
    background-color: ${colors.darkPurple};
    color: ${colors.white}
    height: 6.25em;
    margin: auto;
`;
