import styled from 'styled-components';
import { fonts } from '../../style/theme';

// eslint-disable-next-line import/prefer-default-export
export const MemberPage = styled.div`
    margin: 0;
    padding-top: 0.5em;
    text-align: center;
    width: 80%;
`;

export const MemberTitle = styled.div`
    font-family: ${fonts.title};
    font-size: 2.5em;
`;

export const MembersContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
`;
